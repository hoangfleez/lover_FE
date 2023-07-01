import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    IconButton,
    Collapse,
    Box,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Swal from "sweetalert2";
import {
    findAllUser,
    lockAccount,
    openAccount,
} from "../../services/adminService";
import { allProviderBooking } from "../../services/bookingService.js";

const styles = {
    tableCell: {
        padding: "8px",
        borderBottom: "none",
    },
};

function Row({ row, onUpdate, dataUpdated, setDataUpdated }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpenProvider = (id) => {
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

    const handleBlockProvider = (id) => {
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

    const allProvider = useSelector((state) => {
        return state.booking.booking;
    });

    const fetchProviderBooking = async (id) => {
        await dispatch(allProviderBooking(id));
    };

    const handleCollapseOpen = async (id) => {
        if (!open && id) {
            await fetchProviderBooking(id);
        }

        if (allProvider && allProvider.length > 0) {
            setOpen(!open);
        } else {
            setOpen(false);
        }
    };


    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleCollapseOpen(row.id)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={styles.tableCell}>
                    {row.username}
                </TableCell>
                <TableCell align="left" style={styles.tableCell}>
                    {row.email}
                </TableCell>
                <TableCell align="left" style={styles.tableCell}>
                    {row.firstname}
                </TableCell>
                <TableCell align="left" style={styles.tableCell}>
                    {row.numberCard}
                </TableCell>
                <TableCell align="left" style={styles.tableCell}>
                    {row.phoneNumber}
                </TableCell>
                <TableCell
                    style={{
                        ...styles.tableCell,
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                    }}
                >
                    {row.isLocked === 0 ? (
                        <Button
                            variant="contained"
                            onClick={() => handleBlockProvider(row.id)}
                            sx={{
                                backgroundColor: "red",
                                "&:hover": { backgroundColor: "red", color: "white" },
                            }}
                        >
                            Khóa
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={() => handleOpenProvider(row.id)}>
                            Mở
                        </Button>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {open && (
                                <>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Lịch sử thuê
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Thời gian</TableCell>
                                                <TableCell>Địa điểm</TableCell>
                                                <TableCell align="left">Tên người thuê</TableCell>
                                                <TableCell align="left">Số giờ thuê thuê</TableCell>
                                                <TableCell align="left">Tổng tiền (Đ)</TableCell>
                                                <TableCell align="left">Trạng Thái</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allProvider &&
                                                allProvider.map((item) => (
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
                                </>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function ShowAccountProvider() {
    const dispatch = useDispatch();
    const [providers, setProviders] = useState([]);
    const [dataUpdated, setDataUpdated] = useState(false);

    useEffect(() => {
        dispatch(findAllUser());
    }, [dispatch]);

    const allUser = useSelector((state) => state.admin.listUser);

    useEffect(() => {
        if (Array.isArray(allUser)) {
            setProviders(allUser.filter((item) => item.role.name === "provider"));
        }
    }, [allUser]);

    const handleUpdateList = (updatedRow) => {
        const updatedProviders = providers.map((provider) =>
            provider.id === updatedRow.id ? { ...updatedRow } : provider
        );
        setProviders(updatedProviders);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
                Danh sách người cung cấp dịch vụ
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Tên đăng nhập</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Số địa chỉ thẻ</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {providers.map((row) => (
                            <Row
                                key={row.id}
                                row={row}
                                onUpdate={handleUpdateList}
                                dataUpdated={dataUpdated}
                                setDataUpdated={setDataUpdated}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    );
}
