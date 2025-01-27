"use client";

import { Product, ProductType, useGetProductsQuery } from "@/state/api";
import { CircularProgress } from "@mui/material";
import { Barcode } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import AddProductButton from "./AddProductButton";

function Products() {
  const { data, isError, isLoading } = useGetProductsQuery();
  const [filterSearch, setFilterSearch] = useState<string>("");
  const debouncedSearch = useDebounce(filterSearch, 200);
  const [products, setProducts] = useState<Product[]>([]);

  const filterProducts = useCallback(
    (search: string) => {
      setProducts(
        data?.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        ) ?? []
      );
    },
    [data]
  );

  const getSource = (type: ProductType) => {
    switch (type) {
      case "VINYL":
        return "https://recordstore-backoffice.s3.eu-west-3.amazonaws.com/vinyl_placeholder.jpeg";
      case "CD":
        return "https://recordstore-backoffice.s3.eu-west-3.amazonaws.com/CD_placeholder.jpeg";
      case "CASSETTE":
        return "https://recordstore-backoffice.s3.eu-west-3.amazonaws.com/cassette_placeholder.jpeg";
      case "EQUIPMENT":
        return "https://recordstore-backoffice.s3.eu-west-3.amazonaws.com/equipment_placeholder.jpeg";
      case "OTHER":
        return "https://recordstore-backoffice.s3.eu-west-3.amazonaws.com/music_placeholder.jpeg";
    }
  };

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (debouncedSearch !== "") {
      filterProducts(debouncedSearch);
    } else {
      setProducts(data ?? []);
    }
  }, [debouncedSearch, data]);

  return isLoading ? (
    <CircularProgress color="inherit" />
  ) : isError ? (
    <p>Error loading products</p>
  ) : (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold ">Products</h2>

        <AddProductButton />
      </div>
      <div className="h-full flex justify-between items-center gap-4">
        <input
          placeholder="Search for a product..."
          className="my-5 w-full h-12 bg-white rounded-lg pl-4 border"
          type="text"
          onChange={(e) => setFilterSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:overflow-auto gap-4">
        {products.length === 0 ? (
          <div className="text-xl font-semibold p-2">
            No products matched the search
          </div>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="flex flex-col bg-white items-center justify-between border rounded-xl shadow-md aspect-square py-5 px-5"
            >
              <img
                src={getSource(p.productType)}
                className="h-2/5 w-2/5 bg-red-300 mt-4"
                alt="product image"
              />
              <div className="flex flex-col justify-center items-center gap-1 w-full">
                <p className="text-base font-semibold text-center w-full max-w-[90%] overflow-hidden text-ellipsis">
                  {p.name}
                </p>
                <p className="font-semibold">{p.price}€</p>
                <p className="font-bold text-slate-500">{p.productType}</p>
                <p className="font-semibold">
                  <span className="font-normal">{p.stock} Available </span>
                </p>
              </div>
              <span className="flex items-center gap-2 ">
                <Barcode /> {p.barcode ?? "0000000000000"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
