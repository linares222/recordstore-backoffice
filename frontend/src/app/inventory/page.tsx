"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { useGetProductsQuery } from "@/state/api";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 270 },
  {
    field: "name",
    headerName: "Product",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    sortable: true,
    width: 100,
    valueGetter: (_, row) => `${row.price}€`,
  },
  {
    field: "stock",
    headerName: "Available Stock",
    width: 130,
  },
  {
    field: "productType",
    headerName: "Category",
    type: "string",
    width: 120,
    
  },
  {
    field: "barcode",
    headerName: "Barcode",
    type: "string",
    width: 120,
    valueGetter: (_, row) => row.barcode ?? "0000000000000",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isError || !products) {
    return (
      <div className="text-center py-4">
        Error fetching inventory
      </div>
    );
  }

  return isLoading ? <CircularProgress color="inherit"/> :(
    <div className="mt-5">
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Inventory;
