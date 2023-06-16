import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SiderBar from "./siderbar/SiderBar";
import BodyLists from "./lists/BodyLists";

export default function Body() {
  const [service,setService] = useState([]);


  console.log(service)
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "64px",
        height: "calc(100vh - 64px)",
      }}
    >
      <SiderBar setService={setService}/>
      <BodyLists service={service} setService={setService}/>
    </Box>
  );
}
