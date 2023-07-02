import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptBooking, detailBookingProvider, pendingListBookingProvider, rejectBooking } from "../../services/bookingService.js";
import { Button, Dialog, DialogContent, Toolbar } from "@mui/material";
import "./booking.css";

const OrderPendingProvider = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pendingList = useSelector((state) => state.booking.booking);
    const detailProvider = useSelector((state) => state.booking.detail);

    const handleDetailProvider = async (id) => {
        await dispatch(detailBookingProvider(id));
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAccept = async (id) => {
        await dispatch(acceptBooking(id));
        // Fetch the updated pending list after accepting the booking
        dispatch(pendingListBookingProvider());
    };

    const handleReject = async (id) => {
        await dispatch(rejectBooking(id));
        // Fetch the updated pending list after rejecting the booking
        dispatch(pendingListBookingProvider());
    };

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
                <style>
                    {`
                        .action-button {
                            padding: 4px 8px;
                            font-size: 12px;
                            border-radius: 4px;
                            margin-right: 8px;
                            white-space: nowrap;
                        }

                        .accept-button {
                            background-color: #4caf50;
                            color: white;
                        }

                        .reject-button {
                            background-color: #f44336;
                            color: white;
                        }

                        .feedback-button {
                            padding: 4px 8px;
                            font-size: 12px;
                            border-radius: 4px;
                            margin-top: 8px;
                        }

                        .custom-modal {
                            max-width: 600px;
                            width: 100%;
                            margin: 0 auto;
                        }

                        .modal-heading {
                            font-size: 24px;
                            margin-bottom: 16px;
                        }

                        .modal-content-item {
                            margin-bottom: 8px;
                        }

                        .modal-content-item label {
                            font-weight: bold;
                        }
                    `}
                </style>
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
                                <td>
                                    <Button className="action-button" onClick={() => handleDetailProvider(item.id)}>
                                        Chi tiết đơn thuê
                                    </Button>
                                </td>
                                <td>
                                    <Button className="action-button accept-button" onClick={() => handleAccept(item.id)}>
                                        Chấp nhận
                                    </Button>
                                </td>
                                <td>
                                    <Button className="action-button reject-button" onClick={() => handleReject(item.id)}>
                                        Từ chối
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Dialog open={isModalOpen} onClose={handleCloseModal} className="custom-modal">
                <DialogContent>
                    <h1 className="modal-heading">Chi tiết đơn thuê</h1>
                    {detailProvider && (
                        <div>
                            <div className="modal-content-item">
                                <label>Tên (người thuê):</label> {detailProvider.user?.username}
                            </div>
                            <div className="modal-content-item">
                                <label>Địa chỉ:</label> {detailProvider.address}
                            </div>
                            <div className="modal-content-item">
                                <label>Thời bắt đầu:</label> {formatDateTime(detailProvider.startTime)}
                            </div>
                            <div className="modal-content-item">
                                <label>Thời kết thúc:</label> {calculateEndTime(detailProvider.startTime, detailProvider.hour)}
                            </div>
                            <div className="modal-content-item">
                                <label>Thời gian thuê (bao nhiêu tiếng):</label> {detailProvider.hour} giờ
                            </div>
                            <div className="modal-content-item">
                                <label>Trạng thái:</label> {detailProvider.status}
                            </div>
                            <div className="modal-content-item">
                                <label>Tổng đơn:</label> {detailProvider.cost} VND
                            </div>
                            <Button className="feedback-button">Phản hồi về người thuê</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default OrderPendingProvider;
