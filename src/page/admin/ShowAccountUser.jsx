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
import { useEffect, useState } from "react";
import {findAllUser, findAllUsers, lockAccount, openAccount} from "../../services/adminService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import {allUserBooking} from "../../services/bookingService.js";
import ReactPaginate from "react-paginate";

const styles = {
    tableCell: {
        padding: "8px",
        borderBottom: "none",
    },
};

function Row(props) {
    const dispatch = useDispatch();
    const { row, onUpdate, dataUpdated, setDataUpdated} = props;
    const [open, setOpen] = useState(false);

    const handleOpenUsers = (id) => {
        Swal.fire({
            title: "Bạn có muốn mở tài khoản?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Mở",
            cancelButtonText: "Hủy",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(openAccount(id))
                    .then(() => {
                        toast.success("Mở thành công");
                        const updatedRow = { ...row, isLocked: 0 };
                        onUpdate(updatedRow);
                        setDataUpdated(!dataUpdated);
                    })
                    .catch(() => {
                        toast.error("Mở không thành công");
                    });
            }
        });
    };

    const handleBlockUsers = (id) => {
        Swal.fire({
            title: "Bạn có muốn khóa tài khoản?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Khóa",
            cancelButtonText: "Hủy",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(lockAccount(id))
                    .then(() => {
                        toast.success("Khóa thành công");
                        const updatedRow = { ...row, isLocked: 1 };
                        onUpdate(updatedRow);
                        setDataUpdated(!dataUpdated);
                    })
                    .catch(() => {
                        toast.error("Khóa không thành công");
                    });
            }
        });
    };

    const allUser = useSelector((state) => {
        return state.booking.booking;
    });

    const fetchUserBooking = async (id) => {
        await dispatch(allUserBooking(id));
    };


    const handleCollapseOpen = async (id) => {
        if (!open && id) {
            await fetchUserBooking(id);
        }

        if (allUser && allUser.length > 0) {
            setOpen(!open);
        } else {
            setOpen(false);
        }
    };

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleCollapseOpen(row.id)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell style={styles.tableCell}>{row.username}</TableCell>
                <TableCell style={styles.tableCell} align="left">
                    {row.email}
                </TableCell>
                <TableCell style={styles.tableCell} align="left">
                    {row.firstname}
                </TableCell>
                <TableCell style={styles.tableCell} align="left">
                    {row.numberCard}
                </TableCell>
                <TableCell style={styles.tableCell} align="left">
                    {row.phoneNumber}
                </TableCell>
                <TableCell style={styles.tableCell} align="center">
                    {row.isLocked === 0 ? (
                        <Button
                            variant="contained"
                            onClick={() => handleBlockUsers(row.id)}
                            sx={{
                                backgroundColor: "red",
                                "&:hover": { backgroundColor: "red", color: "white" },
                            }}
                        >
                            Khóa
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={() => handleOpenUsers(row.id)}>
                            Mở
                        </Button>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Lịch sử đã thuê
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Thời gian</TableCell>
                                        <TableCell>Địa điểm</TableCell>
                                        <TableCell align="left">Tên người cho thuê</TableCell>
                                        <TableCell align="left">Số giờ thuê</TableCell>
                                        <TableCell align="left">Tổng tiền (Đ)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allUser &&
                                        allUser.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.startTime}</TableCell>
                                                <TableCell>{item.address}</TableCell>
                                                <TableCell align="left">{item.user.username}</TableCell>
                                                <TableCell align="left">{item.hour}</TableCell>
                                                <TableCell align="left">{item.cost}</TableCell>
                                                <TableCell align="left">{item.status}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function ShowAccountUser() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    const allUser = useSelector((state) => {
       const Users = state.admin.listUser.docs;
        if (!Users) return [];
        if (Users && totalPage === 0) {
            setTotalPage(state.admin.listUser.meta.totalPage);
            setTotalUsers(state.admin.listUser.meta.total);
        }
        return Users;
    });


    const handleUpdateList = (updatedRow) => {
        const updatedUsers = users.map((provider) =>
            provider.id === updatedRow.id ? { ...updatedRow } : provider
        );
        setUsers(updatedUsers);
    };

    useEffect(() => {
        dispatch(findAllUsers());
    }, [dispatch]);

    const handlePageClick = (event) => {
        dispatch(findAllUsers(+event.selected + 1));
    };

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
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Tên</TableCell>
                            <TableCell align="left">Số CCCD/CMTND</TableCell>
                            <TableCell align="left">Số điện thoại</TableCell>
                            <TableCell align="center">Khoá / Mở </TableCell>
                        </TableRow>
                    </TableHead>

                        <TableBody>
                            {allUser && allUser.map((provider) => (
                                <Row
                                    key={provider.id}
                                    row={provider}
                                    onUpdate={handleUpdateList}
                                    dataUpdated={dataUpdated}
                                    setDataUpdated={setDataUpdated}
                                />
                            ))}
                        </TableBody>

                </Table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPage}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination-container"
                    activeClassName="active-page"
                />
                <style>
                    {`
          .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            list-style: none;
            padding: 0;
          }

          .pagination-container li {
            display: inline-block;
            margin: 0 5px;
          }

          .pagination-container li a {
            display: block;
            padding: 5px 10px;
            color: #000;
            text-decoration: none;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .active-page a {
            background-color: #2e6c30;
            color: #fff;
          }
        `}
                </style>
            </TableContainer>
            <ToastContainer />
        </>
    );
}
