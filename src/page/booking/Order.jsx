import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toolbar, Dialog, DialogContent, Button } from "@mui/material";
import { detailBooking, rentalListBooking } from "../../services/bookingService.js";
import "./booking.css";

const Order = () => {
    const dispatch = useDispatch();
    const rental = useSelector((state) => state.booking.booking);
    const detailOrder = useSelector((state) => state.booking.detail.data);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDetailOrder = async (id) => {
        await dispatch(detailBooking(id));
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(rentalListBooking());
    }, [dispatch]);

    return (
        <>
            <Toolbar />
            <div>
                <style>
                    {`
          .order-table {
            width: 100%;
          }

          .order-table th,
          .order-table td {
            padding: 8px;
          }

          .order-table th {
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: left;
          }

          .order-table td button {
            padding: 4px 8px;
            font-size: 14px;
          }

          .order-table td button.detail-button {
            margin-right: 8px;
          }

          .order-dialog {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
          }

          .order-dialog-content {
            margin-top: 16px;
          }

          .order-dialog-content h1 {
            font-size: 24px;
            margin-bottom: 16px;
          }

          .order-dialog-content div {
            margin-bottom: 8px;
          }

          .order-dialog-content div label {
            font-weight: bold;
          }

          .order-dialog-content button {
            padding: 4px 8px;
            font-size: 14px;
            margin-top: 8px;
          }
        `}
                </style>
                <table className="order-table">
                    <tbody>
                    <tr>
                        <th>Địa chỉ</th>
                        <th>Số giờ</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                        <th></th>
                    </tr>
                    {rental?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.address}</td>
                            <td>{item.hour}</td>
                            <td>{item.status}</td>
                            <td>{item.cost} VND</td>
                            <td>
                                <Button
                                    className="detail-button"
                                    onClick={() => handleDetailOrder(item.id)}
                                >
                                    Chi tiết đơn thuê
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={isModalOpen} onClose={handleCloseModal} className="order-dialog">
                <DialogContent className="order-dialog-content">
                    <h1> Chi tiết đơn thuê</h1>
                    {detailOrder && (
                        <>
                            <div>
                                <label>Tên (người yêu được thuê):</label>{" "}
                                {detailOrder.providers.name}
                            </div>
                            <div>
                                <label>Địa chỉ:</label> {detailOrder.address}
                            </div>
                            <div>
                                <label>Thời gian thuê (bao nhiêu tiếng):</label>{" "}
                                {detailOrder.hour} giờ
                            </div>
                            <div>
                                <label>Trạng thái:</label> {detailOrder.status}
                            </div>
                            <div>
                                <label>Tổng đơn:</label> {detailOrder.cost} VND
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Order;
