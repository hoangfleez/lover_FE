import {Toolbar} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { doneListProviderBooking} from "../../services/bookingService";
import "./booking.css";


const DoneProvider = () => {
    const dispatch = useDispatch();

    const doneListProvider = useSelector((state) => {
        return state.booking.booking;
    });

    useEffect(() => {
        dispatch(doneListProviderBooking())
    }, [dispatch])
    return (
        <>
            <Toolbar/>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Địa chỉ</th>
                        <th>Số giờ</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                    </tr>
                    {doneListProvider &&
                        doneListProvider.map((item) => (
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

export default DoneProvider;
