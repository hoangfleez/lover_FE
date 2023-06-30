import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export default function AdminSidebar() {
const navigate = useNavigate()

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ListItem disablePadding onClick={()=>{navigate("/admin")}}>
        <ListItemButton>
          <ListItemIcon><Diversity2Icon/></ListItemIcon>
          <ListItemText primary="Tất cả tài khoản"/>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={()=>{navigate("/admin/user-account")}}>
        <ListItemButton>
          <ListItemIcon><SupervisedUserCircleIcon/></ListItemIcon>
          <ListItemText primary="Tài khoản người dùng"/>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding onClick={()=>{navigate("/admin/user-provider")}}>
        <ListItemButton>
          <ListItemIcon><ManageAccountsIcon/></ListItemIcon>
          <ListItemText primary="Tài khoản cung cấp dịch vụ"/>
        </ListItemButton>
      </ListItem>
    </Box>
  );
}
