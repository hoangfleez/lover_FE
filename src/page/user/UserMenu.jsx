import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/useService";
import { useUserProfile } from "../../customHook/useUserProfile";
import { clearLocalStorage } from "../../utils";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RegisterService from "./Dialog/RegisterService";
import { useState } from "react";
import { showProviderByUser } from "../../services/providerService";
import Switch from "@mui/material/Switch";
import CustomizedSwitches from "./Swich";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useUserProfile();

  const profile = useSelector((state) => state.provider.showOneProvider);

  const [openRegister, setOpenRegister] = useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpenRegister(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    handleCloseUserMenu();
  };

  const changeProfile = (event) => {
    event.preventDefault();
    navigate("/customer_info");
    clearLocalStorage();
  };
  const handlePage = () => {
    // clearLocalStorage()
    navigate("page");
  };
  const goAdminPage = () => {
    navigate("/admin");
  };

  useEffect(() => {
    dispatch(showProviderByUser());
  }, []);

  const handleSwitchClick = (event) => {
    event.stopPropagation();
  };

  return (
      [
        <Menu
            key="user-menu"
            anchorEl={anchorUserMenu}
            open={Boolean(anchorUserMenu)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
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
            <Box sx={{ display: "flex" }} onClick={handlePage}>
              <Avatar src={user?.avatar} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  {user?.lastname}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          <Divider key={2} />
          <MenuItem key={3} onClick={handleClickOpen}>
            <ListItemIcon>
              <HowToRegIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">Register as Service Provider</Typography>
          </MenuItem>
          {profile && profile.isProvider && (
              <MenuItem key={4} onClick={changeProfile}>
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1">Change to Customer</Typography>
              </MenuItem>
          )}
          {user?.role === "admin" && (
              <MenuItem key={5} onClick={goAdminPage}>
                <ListItemIcon>
                  <ManageAccountsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body1">Admin Panel</Typography>
              </MenuItem>
          )}
          <CustomizedSwitches />
          <Divider key={6} />
          <MenuItem key={7} onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Typography variant="body1">Logout</Typography>
          </MenuItem>
        </Menu>,
      ]
  );
};

export default UserMenu;
