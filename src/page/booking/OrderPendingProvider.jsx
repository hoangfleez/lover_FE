import {Dialog, DialogContent, Toolbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    acceptBooking,
    detailBookingProvider,
    pendingListBookingProvider,
    rejectBooking
} from "../../services/bookingService.js";

const OrderPendingProvider = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pendingList = useSelector((state) => {
        return state.booking.booking;
    });

    const detailProvider = useSelector((state) => {
        return state.booking.detail
    });



    const handleDetailProvider = async (id) => {
        await dispatch(detailBookingProvider(id));
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAccept = async (id) => {
        await dispatch(acceptBooking(id))
    }
    const handleReject = async (id) => {
        await dispatch(rejectBooking(id))
    }

    useEffect(() => {
        dispatch(pendingListBookingProvider());
    }, [dispatch]);

    const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${formattedDate} ${formattedTime}`;
    };

    const calculateEndTime = (startTime, hour) => {
        const startDateTime = new Date(startTime);
        const endDateTime = new Date(startDateTime.getTime() + hour * 60 * 60 * 1000);
        return formatDateTime(endDateTime);
    };

    return (
        <>
            <Toolbar />
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Tên người thuê</th>
                        <th>Địa chỉ</th>
                        <th>Số giờ</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                    {pendingList &&
                        pendingList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.user.username}</td>
                                <td>{item.address}</td>
                                <td>{item.hour}</td>
                                <td>{formatDateTime(item.startTime)}</td>
                                <td>{calculateEndTime(item.startTime, item.hour)}</td>
                                <td>{item.cost} VND</td>
                                <td>{item.status}</td>
                                <button onClick={() => handleDetailProvider(item.id)}
                                >
                                    Chi tiet don thue
                                </button>

                                <button onClick={() => handleAccept(item.id)}
                                >
                                    Chấp nhận
                                </button>

                                <button onClick={() => handleReject(item.id)}
                                >
                                    Từ chối
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogContent>
                    <h1> Chi tiết đơn thuê</h1>
                    {detailProvider && (
                        <>
                            <div>Tên (người thuê): {detailProvider.user?.username}</div>
                            <div>Địa chỉ: {detailProvider.address}</div>
                            <div>Thời bắt đầu {formatDateTime(detailProvider.startTime)}</div>
                            <div>Thời kết thúc {calculateEndTime(detailProvider.startTime, detailProvider.hour)}</div>
                            <div>Thời gian thuê (bao nhiêu tiếng): {detailProvider.hour} giờ</div>
                            <div>Trạng thái: {detailProvider.status}</div>
                            <div>Tổng đơn: {detailProvider.cost} VND</div>
                            <button>Phản hồi về người thuê</button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default OrderPendingProvider;
