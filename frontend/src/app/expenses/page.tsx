"use client";
import {
  ExpenseByProductType,
  ProductType,
  useGetDashboardDataQuery,
} from "@/state/api";
import { CircularProgress, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Cell, Pie, ResponsiveContainer, PieChart } from "recharts";

type ExpenseSums = {
  [productType: string]: number;
};

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const Expenses = () => {
  const [category, setCategory] = useState<ProductType>();
  const { data, isError, isLoading } = useGetDashboardDataQuery();
  const expenses = data?.expenseByProductType ?? [];

  const expenseSums = expenses.reduce(
    (acc: ExpenseSums, cur: ExpenseByProductType) => {
      const productType: ProductType = cur.productType;
      const totalValue = cur.totalValue;
      if (!acc[productType]) acc[productType] = 0;
      acc[productType]! += totalValue;
      return acc;
    },
    {} as ExpenseSums
  );

  const expenseProductTypes = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const totalExpenses = expenseProductTypes.reduce(
    (acc, { value }) => acc + value,
    0
  );

  return isLoading ? (
    <CircularProgress color="inherit" />
  ) : isError ? (
    <p>Error loading products</p>
  ) : (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold ">Expenses</h2>
      </div>
      <div className="flex jus h-full">
        <section className="w-1/2 bg-white shadow-md rounded-2xl">a</section>
        <section className="w-1/2 bg-white shadow-md rounded-2xl">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={expenseProductTypes}
                outerRadius={65}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
              >
                {expenseProductTypes?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
};

export default Expenses;
