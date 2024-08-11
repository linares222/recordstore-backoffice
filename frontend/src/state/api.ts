import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DashboardData {
  popularProducts: Product[];
  orderSummary: OrderOrPurchaseSummary[];
  purchaseSummary: OrderOrPurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByProductTypeSummary: ExpenseByProductType[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  productType: "VINYL" | "CD" | "CASSETTE" | "EQUIPMENT" | "OTHER";
  barcode?: string;
}

export interface OrderOrPurchaseSummary {
  id: string;
  changePercentage: number;
  totalValue: number;
  date: Date;
}

export interface OrderOrPurchaseSummary {
  id: string;
  changePercentage: number;
  totalValue: number;
  date: Date;
}

export interface ExpenseSummary {
  id: string;
  totalValue: number;
  date: Date;
}

export interface ExpenseByProductType {
  id: string;
  totalValue: number;
  expenseSummaryId: string;
  date: Date;
  productType: "VINYL" | "CD" | "CASSETTE" | "EQUIPMENT" | "OTHER";
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardData"],
  endpoints: (build) => ({
    getDashboardData: build.query<DashboardData, void>({
      query: () => ({ url: "/dashboard" }),
      providesTags:["DashboardData"]
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
} = api;
