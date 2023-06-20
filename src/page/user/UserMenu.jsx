import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentIcon from '@mui/icons-material/Payment';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import GroupsIcon from '@mui/icons-material/Groups';
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/useService";
import { useUserProfile } from "../../customHook/useUserProfile";
import { clearLocalStorage } from "../../utils";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useUserProfile();


  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
    handleCloseUserMenu();
  };

    const changeProfile = (event) => {
      event.preventDefault();
      navigate("/customer_info");
      clearLocalStorage()
      window.location.reload();
    };
  const handlePage = () => {
    // clearLocalStorage()
    navigate("page");
  };

  return (
    <Menu
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
      <MenuItem>
        <Box sx={{ display: "flex" }} onClick={handlePage}>
          <Avatar src={user?.avatar} />
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {user?.lastname}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              color="red"
            >
              ID:{user?.email}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              color="gray"
            >
              Xem trang cá nhân của bạn
            </Typography>
          </Box>
        </Box>
      </MenuItem>
      <Divider />

      <MenuItem  >
        <ListItemIcon>
          <SavingsIcon fontSize="small" />
        </ListItemIcon>
        Rút tiền
      </MenuItem>

      <MenuItem  >
        <ListItemIcon>
          <PaymentIcon fontSize="small" />
        </ListItemIcon>
        Mua thẻ
      </MenuItem>

      <MenuItem >
        <ListItemIcon>
          <LockPersonIcon fontSize="small" />
        </ListItemIcon>
        Tạo khóa bảo vệ
      </MenuItem>

      <MenuItem  >
        <ListItemIcon>
          <WatchLaterIcon fontSize="small" />
        </ListItemIcon>
        Lịch sử giao dịch
      </MenuItem>
      <MenuItem  >
        <ListItemIcon>
          <GroupsIcon fontSize="small" />
        </ListItemIcon>
        Danh sách theo dõi
      </MenuItem>
      <MenuItem onClick={ changeProfile} >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Cài đặt tài khoản
      </MenuItem>

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
