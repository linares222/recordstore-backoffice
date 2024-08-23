"use client";
import { useGetDashboardDataQuery } from "@/state/api";
import React from "react";
import PopularProducts from "./PopularProducts";
import PurchaseSummary from "./PurchaseSummary";
import OrderSummary from "./OrderSummary";
import ExpenseSummary from "./ExpenseSummary";
import Stat from "./Stat";
import {
  CalendarDays,
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <PopularProducts />
      <OrderSummary />
      <PurchaseSummary />
      <ExpenseSummary />
      <Stat
        title="Customer & Expenses"
        mainIcon={<User className="text-blue-600 w-8 h-8" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Customer Growth",
            value: "175.00",
            changePercentage: 131,
            Icon: TrendingUp,
          },
          {
            title: "Expenses",
            value: "10.00",
            changePercentage: -56,
            Icon: TrendingDown,
          },
        ]}
      />
      <Stat
        title="Sales & Discount"
        mainIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Sales",
            value: "1000.00",
            changePercentage: 20,
            Icon: TrendingUp,
          },
          {
            title: "Discount",
            value: "200.00",
            changePercentage: -10,
            Icon: TrendingDown,
          },
        ]}
      />
      <Stat
        title="Dues & Pending Orders"
        mainIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Dues",
            value: "250.00",
            changePercentage: 131,
            Icon: TrendingUp,
          },
          {
            title: "Pending Orders",
            value: "147",
            changePercentage: -56,
            Icon: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;
