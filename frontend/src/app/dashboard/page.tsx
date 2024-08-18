"use client";
import { useGetDashboardDataQuery } from "@/state/api";
import React from "react";
import PopularProducts from "./PopularProducts";
import PurchaseSummary from "./PurchaseSummary";
import OrderSummary from "./OrderSummary";

const Dashboard = () => {
  const { data, error, isLoading } = useGetDashboardDataQuery();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <PopularProducts />
      <div className="row-span-3 xl:row-span-6 bg-gray-500"></div>
      <OrderSummary/>
      <PurchaseSummary />
      <div className="row-span-3 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
    </div>
  );
};

export default Dashboard;
