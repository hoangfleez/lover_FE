import { createSlice } from "@reduxjs/toolkit";
import {addBooking} from "../../services/bookingService.js";
import {apiGetDistrict, apiGetProvinces} from "../../services/googleMapService.js";

const initialState = {
    booking: [],
    apiG: {},
    apiGoogle:{},
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addBooking.fulfilled, (state, action) => {
            state.booking = action.payload;
        });

        builder.addCase(apiGetProvinces.fulfilled, (state, action) => {
            state.apiG = action.payload;
        });

        builder.addCase(apiGetDistrict.fulfilled, (state, action) => {
            state.apiGoogle = action.payload;
        });
    }
});

export default bookingSlice.reducer;