"use client";
import React from "react";
import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 270 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  return isLoading ? (
    <CircularProgress color="inherit" />
  ) : isError ? (
    <p>Error loading products</p>
  ) : (
    <div className="mt-5">
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={users}
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

export default Users;
