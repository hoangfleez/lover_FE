import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";


export default function AdminContent() {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "64px",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "20%",
          bgcolor: "customColorSchemes.backgroundColor",
          height: "100%",
          padding: "15px",
        }}
      >
        <AdminSidebar />
      </Box>
      <Box
        sx={{
          width: "80%",
          bgcolor: "customColorSchemes.bgColor",
          padding: "10px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}