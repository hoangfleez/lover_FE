import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/NavBar";
import { Box } from "@mui/material";
import ChatComponent from "../chat/Chat";
const Index = () => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>

      <Navbar />
      <Outlet />
      <ChatComponent/>
    </Box>
  );
};

export default Index;
