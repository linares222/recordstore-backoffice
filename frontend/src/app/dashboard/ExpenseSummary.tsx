import {
  ExpenseByProductType,
  ProductType,
  useGetDashboardDataQuery,
} from "@/state/api";
import { CircularProgress } from "@mui/material";
import React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

type ExpenseSums = {
  [productType: string]: number;
};

const colors = ["#00C49F", "#0088FE", "#FFBB28"]; // Define colors for the chart

const ExpenseSummary = () => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();
  const expenseByProductTypeSummaryData =
    dashboardData?.expenseByProductType || [];

  // Aggregate expenses by product type
  const expenseSums = expenseByProductTypeSummaryData.reduce(
    (acc: ExpenseSums, cur: ExpenseByProductType) => {
      const productType: ProductType = cur.productType;
      const totalValue = cur.totalValue;
      if (!acc[productType]) acc[productType] = 0;
      acc[productType]! += totalValue;
      return acc;
    },
    {} as ExpenseSums
  );

  // Convert aggregated data to an array for the chart
  const expenseProductTypes = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Calculate total expenses
  const totalExpenses = expenseProductTypes.reduce(
    (acc, { value }) => acc + value,
    0
  );
  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between p-4">
      {isLoading ? (
        <div className="m-5">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>
          <div className="xl:flex flex justify-center pr-7 gap-4">
            <div className="relative basis-3/5 h-64 ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseProductTypes}
                    innerRadius={50}
                    outerRadius={65}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseProductTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="font-bold text-xl">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>
            <ul className="flex flex-col justify-around xl:items-start py-5 gap-3">
              {expenseProductTypes.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs "
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseSummary;
