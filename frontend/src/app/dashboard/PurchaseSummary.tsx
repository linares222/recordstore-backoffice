import { useGetDashboardDataQuery } from "@/state/api";
import { CircularProgress } from "@mui/material";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const SaleSummary = (props: Props) => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();
  const PurchaseSummaryData = dashboardData?.purchaseSummary || [];
  const lastDataPoint =
    PurchaseSummaryData[PurchaseSummaryData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between h-full row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
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
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Sold</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? `${numeral(lastDataPoint.totalValue).format(
                        "0,0.00[0]"
                      )}€`
                    : "0"}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.changePercentage! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUpIcon className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDownIcon className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={PurchaseSummaryData}
                  margin={{ top: 0, right: 30, left: -30, bottom: 0 }}
                >
                  <XAxis dataKey="date" tick={false} axisLine={false} />
                  <YAxis tickLine={false} tick={false} axisLine={false} />
                  <Tooltip
                    formatter={(value: number) => [
                      `€${value.toLocaleString("en")}`,
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
                  <Area
                    type="linear"
                    dataKey="totalValue"
                    stroke="#8884d8"
                    fill="#8884d8"
                    dot={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SaleSummary;
