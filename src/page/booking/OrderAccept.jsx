import {Toolbar} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {acceptListBooking} from "../../services/bookingService.js";

const OrderAccept = () => {
    const dispatch = useDispatch();
    const accept = useSelector((state) =>{
        return state.booking.booking
    });

    useEffect(() => {
        dispatch(acceptListBooking());
    }, [dispatch]);
    return(
        <>
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

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default OrderAccept;
