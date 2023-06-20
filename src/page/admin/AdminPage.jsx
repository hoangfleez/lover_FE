import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeRole,
  findAllUser,
  updateRole,
} from "../../services/adminService";

import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.listUser);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(findAllUser());
  }, []);

  const handleSwitchChange = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const newRoleId = user.role.id === 1 ? 2 : 1;
        return {
          ...user,
          role: {
            id: newRoleId,
            name: newRoleId === 2 ? "provider" : "user",
          },
        };
      }
      return user;
    });

    dispatch(changeRole(updatedUsers));
  };

  const handleButtonClick = (userId, newRoleId) => {
    dispatch(updateRole({ id: userId, newRoleId }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Check if users is an array before using slice
  const displayedUsers = Array.isArray(users)
    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tên tài khoản</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>CCCD/CMT</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Khác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber || "N/A"}</TableCell>
                  <TableCell>{item.numberCard || "N/A"}</TableCell>
                  <TableCell>
                    {item.role.id === 3 ? (
                      item.role.name
                    ) : (
                      <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>{item.role.name}</Grid>
                        <Grid item sx={{ marginLeft: "auto" }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={item.role.id === 2}
                                onChange={() => handleSwitchChange(item.id)}
                              />
                            }
                            label=""
                          />
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleButtonClick(item.id, item.role.id)
                      }
                    >
                      Action
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={7}
            count={Array.isArray(users) ? users.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HomeAdmin;
