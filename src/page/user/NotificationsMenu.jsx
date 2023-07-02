import React, { useEffect } from "react";
import { Menu, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { findAllUser } from "../../services/adminService";
import { showProviderByUser } from "../../services/providerService";

const NotificationsMenu = ({
  anchorNotificationsMenu,
  setAnchorNotificationsMenu,
  mess,
  setMess,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseNotificationsMenu = () => {
    setAnchorNotificationsMenu(null);
  };

  const role = useSelector((state) => {
    return state.user?.profile?.data?.role.name;
  });
  const listUser = useSelector((state) => {
    return state.admin?.listUser;
  });


  useEffect(() => {
    dispatch(findAllUser());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(showProviderByUser());
  }, []);

  useEffect(() => {
    setMess(
      listUser
        ?.filter((user) => user.update === "pending")
        .map((user) => user.username)
    );
  }, [listUser]);
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
        <div>
          {role === "admin" ? (
            mess && mess.length > 0 ? (
              mess.map((item, index) => (
                <Typography variant="subtitle1" gutterBottom p={2} onClick={()=>{navigate("/admin")}} sx={{cursor:"pointer"}}>
                  Tài khoản{" "}
                  {item && <span style={{ color: "red" }}>{item}</span>} muốn
                  trở thành người cung cấp dịch vụ
                </Typography>
              ))
            ) : (
              <Typography variant="subtitle1" color={"gray"} gutterBottom p={2}>
                Không có thông báo nào.
              </Typography>
            )
          ) : (
            <Typography variant="subtitle1" color={"gray"} gutterBottom p={2}>
              Không có thông báo nào.
            </Typography>
          )}
        </div>
      </Menu>
    </>
  );
};

export default NotificationsMenu;
