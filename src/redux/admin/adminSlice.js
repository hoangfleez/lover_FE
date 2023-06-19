import { createSlice } from "@reduxjs/toolkit";
import {findAllProvider, findAllUser} from "../../services/adminService.js";

const initialState = {
    listUser: [],

};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(findAllUser.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });

        builder.addCase(findAllProvider.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });

    },
});

export default adminSlice.reducer;
