"use client";
import {
  ExpenseByProductType,
  ProductType,
  useGetExpensesQuery,
} from "@/state/api";
import { CircularProgress } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import {
  Cell,
  Pie,
  ResponsiveContainer,
  PieChart,
  Legend,
  Tooltip,
} from "recharts";

type FullDataItem = {
  name: string;
  amount: number;
  color?: string;
};

type FullData = {
  [productType: string]: FullDataItem;
};

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#ff6b81",
  "#ff4757",
  "#2ed573",
  "#1e90ff",
  "#a55eea",
  "#ff6348",
];
const Expenses = () => {
  const { data: expensesData, isError, isLoading } = useGetExpensesQuery();
  const [category, setCategory] = useState<string>("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const expenses = useMemo(() => {
    console.log("Expenses memo running");
    const result = Array.isArray(expensesData) ? expensesData : [];
    console.log("Processed expenses:", result);
    return result;
  }, [expensesData]);

  const fullData: FullDataItem[] = useMemo(() => {
    console.log("fullData memo running");
    console.log("Current category:", category);
    console.log("Current expenses:", expenses);
    console.log("Start date:", startDate);
    console.log("End date:", endDate);

    if (expenses.length === 0) {
      console.log("No expenses data, returning empty array");
      return [];
    }

    let filteredData: FullData = {};

    expenses.forEach((data: ExpenseByProductType, index: number) => {
      console.log(`Processing expense ${index}:`, data);

      const matchCategory = category === "All" || data.productType === category;
      console.log("Category match:", matchCategory);

      const parsedDate = new Date(data.date).toISOString().split("T")[0];
      const matchDate =
        !startDate ||
        !endDate ||
        (parsedDate >= startDate && parsedDate <= endDate);
      console.log("Date match:", matchDate);

      if (matchCategory && matchDate) {
        const amount =
          typeof data.totalValue === "string"
            ? parseFloat(data.totalValue)
            : data.totalValue;

        console.log("Amount:", amount);

        if (!filteredData[data.productType]) {
          filteredData[data.productType] = {
            name: data.productType,
            amount: 0,
            color: colors[Object.keys(filteredData).length % colors.length],
          };
          console.log(`Created new entry for ${data.productType}`);
        }

        filteredData[data.productType].amount += amount;
        console.log(
          `Updated amount for ${data.productType}:`,
          filteredData[data.productType].amount
        );
      } else {
        console.log("Expense did not match filters");
      }
    });

    const result = Object.values(filteredData);
    console.log("Processed fullData:", result);
    return result;
  }, [expenses, category, startDate, endDate]);

  console.log("Rendering component");
  console.log("fullData length:", fullData.length);

  if (isLoading) {
    console.log("Rendering loading state");
    return <CircularProgress color="inherit" />;
  }

  if (isError) {
    console.log("Rendering error state");
    return <p>Error loading products</p>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold ">Expenses</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-medium mb-4">Filter categories</h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="category"
                className="block font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                className="block w-full pl-3 border-gray-400 py-2 text-base focus:border-blue-300 "
                onChange={(e) => {
                  console.log("Category changed to:", e.target.value);
                  setCategory(e.target.value as ProductType);
                }}
              >
                <option value="All">All</option>
                <option value="VINYL">Vinyl</option>
                <option value="CD">Cd</option>
                <option value="CASSETTE">Cassette</option>
                <option value="EQUIPMENT">Equipment</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="start-date"
                className="block font-medium text-gray-700"
              >
                Start date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                value={startDate}
                className="block w-full pl-3 border-gray-400 py-2 text-base focus:border-blue-300"
                onChange={(e) => {
                  console.log("Start date changed to:", e.target.value);
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="end-date"
                className="block font-medium text-gray-700"
              >
                End date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                value={endDate}
                className="block w-full pl-3 border-gray-400 py-2 text-base focus:border-blue-300"
                onChange={(e) => {
                  console.log("End date changed to:", e.target.value);
                  setEndDate(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          {fullData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={fullData}
                  cx="50%"
                  cy="50%"
                  label
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="amount"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {fullData.map((entry: FullDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29, 78, 216)" : entry.color
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="p-4 font-medium text-lg">
              No data to display for the selected filters
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
