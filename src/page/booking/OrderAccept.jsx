import { Button, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptListBooking, doneBooking } from "../../services/bookingService.js";
import Swal from 'sweetalert2';

const OrderAccept = () => {
    const dispatch = useDispatch();
    const accept = useSelector((state) => {
        return state.booking.booking;
    });

    const handleDone = async (id) => {
        await dispatch(doneBooking(id));
        dispatch(acceptListBooking()); // Fetch updated booking list after marking a booking as done
        Swal.fire({
            icon: 'success',
            title: 'Cảm ơn bạn đã sử dụng dịch vụ!',
            text: 'Nếu trong quá trình sử dụng dịch vụ có điều gì sai sót, mong quý khách thông cảm và bỏ qua.Hẹn gặp lại ở những lần thuê sau!! ',
        });
    };

    useEffect(() => {
        dispatch(acceptListBooking());
    }, [dispatch]);

    const bookingStyles = `
    .button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 8px 16px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
    }

    .button:hover {
      background-color: #45a049;
    }

    .button:active {
      background-color: #3e8e41;
    }
  `;

    return (
        <>
            <style>{bookingStyles}</style>
            <Toolbar />
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Địa chỉ</th>
                        <th>Số giờ</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                    </tr>
                    {accept &&
                        accept.map((item) => (
                            <tr key={item.id}>
                                <td>{item.address}</td>
                                <td>{item.hour}</td>
                                <td>{item.status}</td>
                                <td>{item.cost} VND</td>
                                <td>
                                    <Button className="button" onClick={() => handleDone(item.id)}>
                                        Hoàn thành
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default OrderAccept;
