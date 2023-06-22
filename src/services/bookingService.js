import { createAsyncThunk } from "@reduxjs/toolkit";
import customAPI from "./customAPI.js";

export const addBooking = createAsyncThunk(
    "booking/addBooking",
    async ({ providerId, bookingData }) => {
        try {
            const res = await customAPI().post(`bookings/provider/${providerId}`, {
                address: bookingData.address,
                hour: bookingData.selectedOption,
            });
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);








