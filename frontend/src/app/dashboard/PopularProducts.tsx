import { ProductType, useGetDashboardDataQuery } from "@/state/api";
import { CircularProgress } from "@mui/material";
import { ShoppingBag } from "lucide-react";
import React from "react";

const PopularProducts = () => {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery();

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

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-14">
      {isLoading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <h3 className="text-lg text-start font-bold py-3 pl-4">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardData?.popularProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex justify-between items-center px-4 py-6 border-b "
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getSource(product.productType)}
                      alt="product image"
                      className="rounded-lg w-14 h-14"
                    />
                    
                    <div className="flex flex-col justify-between">
                      <p className="font-semibold">{product.name}</p>
                      <div className="flex space-x-1 text-blue-500">
                        <p>{product.price}€</p>
                        <span>|</span>
                        <p>{product.productType}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs flex items-center">
                    <button className="text-blue-500 bg-blue-100 p-2 rounded-full mr-2">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    {(Math.random() * 100).toFixed(0)} sold
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PopularProducts;
