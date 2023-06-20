import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, findAllUser } from "../../services/adminService";
import "bootstrap/dist/css/bootstrap.min.css";
import { TableControl } from "react-bootstrap-table-control";
import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  Button,
} from "@mui/material";

const HomeAdmin = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => {
    return state.admin.listUser;
  });

  useEffect(() => {
    dispatch(findAllUser());
  }, [dispatch]);

  const [checked, setChecked] = React.useState({});
  const handleSwitchChange = (event, userId) => {
    const newUsers = users;
    let newList = [];
    let index = users.findIndex((user) => user.id == userId);
    if (users[index].role.id == 1) {
      let user = { ...newUsers[index], role: { id: 2, name: "provider" } };
      newUsers.map((item, i) => {
        if (i == index) {
          newList.push(user);
        } else {
          newList.push(item);
        }
      });
    } else {
      let user = { ...newUsers[index], role: { id: 1, name: "user" } };
      newUsers.map((item, i) => {
        if (i == index) {
          newList.push(user);
        } else {
          newList.push(item);
        }
      });
    }
    dispatch(changeRole(newList));
  };

  const handleButtonClick = (userId) => {
    // handle button click here
    console.log(`Button clicked for user ${userId}`);
  };

  const tableHeader = [
    { key: "id", name: "#" },
    { key: "username", name: "Tên tài khoản" },
    { key: "email", name: "Email" },
    { key: "phone", name: "Số điện thoại" },
    { key: "mynumber", name: "CCCD/CMT" },
    { key: "role", name: "Vai trò" },
    { key: "other", name: "Khác" },
  ];

  const tableItems =
    users &&
    users.map((item) => ({
      id: item.id,
      username: item.username,
      email: item.email,
      phone: item.phoneNumber ? item.phoneNumber : "N/A",
      mynumber: item.numberCard ? item.numberCard : "N/A",
      role:
        item.role.id === 3 ? (
          item.role.name
        ) : (
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>{item.role.name}</Grid>
            <Grid item sx={{ marginLeft: "auto" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={item.role.id === 2}
                    onChange={(event) => handleSwitchChange(event, item.id)}
                  />
                }
                label=""
              />
            </Grid>
          </Grid>
        ),
        other: (
        <Button
          variant="outlined"
          onClick={() => handleButtonClick(item.id)}
        >
          Action
        </Button>
      ), // add button to new column
    }));

  return (
    <Box
      sx={{
        display: "block",
        height: "100vh",
        marginTop: "65px",
        flexGrow: 1,
        backgroundColor: "customColorSchemes.bgColorPage",
        padding: "50px 10px",
      }}
    >
      <Box sx={{ padding: "0 15px" }}>
        <TableControl header={tableHeader} itens={tableItems} />
      </Box>
    </Box>
  );
};

export default HomeAdmin;
