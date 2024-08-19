//TODO: IMPLEMENT THE TIMESTAMP FILTERING
import { useGetDashboardDataQuery } from "@/state/api";
import { CircularProgress } from "@mui/material";
import { TrendingUpIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Timeframe = "daily" | "weekly" | "monthly" | "anual";

const OrderSummary = () => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();
  const OrderSummaryData = dashboardData?.orderSummary || [];
  const [timeframe, setTimeframe] = useState<Timeframe>("weekly");

  const totalValueSum =
    dashboardData?.orderSummary.reduce(
      (sum, current) => sum + current.totalValue,
      0
    ) || 0;

  const averageChangePercentage =
    dashboardData?.orderSummary.reduce((sum, current, i, self) => {
      return sum + current.totalValue / self.length;
    }, 0) || 0;

  const highestOrderDate =
    [...(dashboardData?.orderSummary ?? [])].sort((a, b) => {
      return b.totalValue - a.totalValue;
    })[0]?.date;

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Order Summary
            </h2>
            <hr />
          </div>

          <div className="flex flex-col flex-grow">
            <div className="mb-4 mt-7 px-7 flex justify-between">
              <div>
                {" "}
                <p className="text-xs text-gray-400">Sold</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">
                    {(totalValueSum / 1000000).toLocaleString("en", {
                      maximumFractionDigits: 2,
                    })}
                    m€
                  </span>
                  <span className="text-green-500 text-sm ml-2">
                    <TrendingUpIcon className="inline w-4 h-4 mr-1" />
                    {averageChangePercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={timeframe}
                onChange={(e) => {
                  setTimeframe(e.target.value as Timeframe);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="anual">Anual</option>
              </select>
            </div>
            {/* CHART */}
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height={350} className="px-7">
                <BarChart
                  data={OrderSummaryData}
                  margin={{ top: 0, right: 30, left: -30, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="date" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(0)}m`
                    }
                    tickLine={false}
                    tick={{ dx: -1, fontSize: 12 }}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString("en")}`,
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                  />
                  <Bar
                    dataKey="totalValue"
                    fill="darkred"
                    barSize={10}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <hr />
              <div className="flex justify-between items-center mt-6 text-sm px-7 pb-6">
                <p className="font-semibold">{OrderSummaryData.length ?? 0} days</p>
                <p className="text-sm">
                  Highest Orders Date:{" "}
                  <span className="font-bold">{new Date(highestOrderDate).toLocaleDateString("pt") }</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
