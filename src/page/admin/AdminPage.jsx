import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, findAllUser } from "../../services/adminService";

import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { editUser } from "../../services/useService";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.listUser);

  

  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
  });
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [selectedUserRole, setSelectedUserRole] = React.useState(null);
  const [userUpdate, setUserUpdate] = React.useState(false);

  useEffect(() => {
    dispatch(findAllUser());
  }, [dispatch, userUpdate]);
  

  const handleRoleChange = (userId, userRoleId) => {
    setSelectedUserId(userId);
    setSelectedUserRole(userRoleId);
    openConfirmationDialog();
  };

  const handleRoleChangeConfirmed = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUserId) {
        const newRoleId = selectedUserRole === 1 ? 3 : 1;
        return {
          ...user,
          role: {
            id: newRoleId,
            name: newRoleId === 3 ? "provider" : "user",
          },
        };
      }
      return user;
    });

    const selectedUser = updatedUsers.find(
      (user) => user.id === selectedUserId
    );
    const newProfile = {
      id: selectedUser.id,
      update:"OK",
    };
    dispatch(changeRole({ users: updatedUsers, user: selectedUser }));
    dispatch(editUser(newProfile))
    setUserUpdate(true)
    showNotification("");
    closeConfirmationDialog();
  };

  const showNotification = (message) => {
    setNotification({
      open: true,
      message,
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      open: false,
      message: "",
    });
    setUserUpdate(false)
  };

  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };


  return (
    <Box
      sx={{
        display: "block",
        height: "100%",
        flexGrow: 1,
        backgroundColor: "customColorSchemes.bgColorPage",
        padding: "0 10px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Danh sách tất cả tài khoản
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên tài khoản</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>CCCD/CMT</TableCell>
              <TableCell>Nâng cấp</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Khác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((item) => {
              const switchStyle =
                item.role.id === 3 ? { cursor: "no-drop" } : {};
              return (
                <TableRow key={`${item.id}-${item.update}`}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNumber || "N/A"}</TableCell>
                  <TableCell>{item.numberCard || "N/A"}</TableCell>
                  <TableCell sx={{color: item.update === "pending" ? "red" : "green", cursor:"pointer"}}>{item.update }</TableCell>
                  <TableCell>
                    {item.role.id === 2 ? (
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
                                disabled={item.role.id === 3}
                                checked={item.role.id === 3}
                                onChange={() =>
                                  handleRoleChange(item.id, item.role.id)
                                }
                                sx={switchStyle}
                              />
                            }
                            label=""
                          />
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={notification.open}
        onClose={handleCloseNotification}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ marginTop: "40px", marginRight: "16px" }}
      >
        <Alert sx={{ width: "100%" }}>Thay đổi thành công!</Alert>
      </Snackbar>
      <Dialog
        open={confirmationDialogOpen}
        onClose={closeConfirmationDialog}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">
          Xác nhận nâng cấp
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có muốn nâng cấp cho tài khoản này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoleChangeConfirmed}>Đồng ý</Button>
          <Button onClick={closeConfirmationDialog}>Không</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeAdmin;
