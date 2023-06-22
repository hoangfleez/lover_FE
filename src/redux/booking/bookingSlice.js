import { createSlice } from "@reduxjs/toolkit";
import {addBooking} from "../../services/bookingService.js";

const initialState = {
    booking: [],
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addBooking.fulfilled, (state, action) => {
            state.booking = action.payload;
        });
    }
});

export default bookingSlice.reducer;