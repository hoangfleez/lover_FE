import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findAllUser } from "../../services/adminService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.username}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.firstname}</TableCell>
        <TableCell align="right">{row.numberCard}</TableCell>
        <TableCell align="right">{row.phoneNumber}</TableCell>
        <TableCell
          sx={{ display: "flex", gap: "5px", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={() => handleBlockProvider(item.id)}
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "red", color: "white" },
            }}
          >
            Khoá
          </Button>
          <Button
            variant="contained"
            onClick={() => handleOpenkProvider(item.id)}
          >
            Mở
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Lịc sử thuê
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Thời gian</TableCell>
                    <TableCell>Địa điểm</TableCell>
                    <TableCell align="right">Tên người thuê</TableCell>
                    <TableCell align="right">Số giờ thuê thuê</TableCell>
                    <TableCell align="right">Tổng tiền (Đ)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ShowAccountProvider() {
  const dispatch = useDispatch();

  const allUser = useSelector((state) => {
    return state.admin.listUser;
  });

  const providers = allUser.filter((item) => item.role.name === "provider");
  console.log(providers);

  const handleBlockProvider = (id) => {
    dispatch(lockAccount(id))
      .then(() => {
        toast.success("Block thành công");
        // Nạp lại danh sách user sau khi block thành công
        dispatch(findAllUser());
      })
      .catch(() => {
        toast.error("Block không thành công");
      });
  };

  const handleOpenProvider = (id) => {
    dispatch(openAccount(id))
      .then(() => {
        toast.success("Open thành công");
        // Nạp lại danh sách user sau khi block thành công
        dispatch(findAllUser());
      })
      .catch(() => {
        toast.error("Open không thành công");
      });
  };

  useEffect(() => {
    dispatch(findAllUser());
  }, [dispatch]);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Danh sách tài khoản cung cấp dịch vụ
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Tên tài khoản</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Tên</TableCell>
              <TableCell align="right">Số CCCD/CMTND</TableCell>
              <TableCell align="right">Số điện thoại</TableCell>
              <TableCell align="center">Khoá / Mở </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers?.map((provider) => (
              <Row key={provider.name} row={provider} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </>
  );
}
