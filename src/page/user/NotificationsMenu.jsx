import React from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RegisterService from "./Dialog/RegisterService";
import { useState } from "react";
import CustomizedSwitches from "./Swich";

const NotificationsMenu = ({ anchorNotificationsMenu, setAnchorNotificationsMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseNotificationsMenu = () => {
    setAnchorNotificationsMenu(null);
  };

  const handlePage = () => {
    navigate("/profile"); // Replace "/profile" with the desired route
    handleCloseNotificationsMenu();
  };

;

  return (
    <>
      <Menu
        anchorEl={anchorNotificationsMenu}
        open={Boolean(anchorNotificationsMenu)}
        onClose={handleCloseNotificationsMenu}
        onClick={handleCloseNotificationsMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            bgcolor: "customColorSchemes.backgroundColor",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 50,
              height: 50,
              ml: -0.5,
              mr: 1,
              mt: 2,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "customColorSchemes.backgroundColor",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem key={1}>
          <Box sx={{ display: "flex" }} >
          sađâsd
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsMenu;
