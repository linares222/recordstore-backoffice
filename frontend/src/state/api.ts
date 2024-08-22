import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ProductType = "VINYL" | "CD" | "CASSETTE" | "EQUIPMENT" | "OTHER";
export interface DashboardData {
  popularProducts: Product[];
  orderSummary: OrderOrPurchaseSummary[];
  purchaseSummary: OrderOrPurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByProductType: ExpenseByProductType[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  productType: "VINYL" | "CD" | "CASSETTE" | "EQUIPMENT" | "OTHER";
  barcode?: string;
}

export interface NewProduct {
  name: string;
  price: number;
  stock: number;
  productType: ProductType;
  barcode?: string;
}

export interface NewProduct {
  name: string;
  price: number;
  stock: number;
  productType: ProductType;
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

export interface UsersData {
  id: string;
  name: string;
  email: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardData", "Products", "UsersData"],
  endpoints: (build) => ({
    getDashboardData: build.query<DashboardData, void>({
      query: () => ({ url: "/dashboard" }),
      providesTags: ["DashboardData"],
    }),
    //string or void because search query in request can be empty or not
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    addProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<UsersData, void>({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["UsersData"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useGetUsersQuery
} = api;
