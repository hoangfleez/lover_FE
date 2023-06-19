import { createAsyncThunk } from "@reduxjs/toolkit";
import customAPI from "./customAPI.js";



export const findAllUser = createAsyncThunk(
    "admin/findAllUser",
    async (arg, thunkAPI) => {
        try {
            const res = await customAPI().get("/admin/find-all", {
                params: {
                    role: "user"
                }
            });
            return res.data.data.docs;
        } catch (err) {
            return err.response?.data?.payload;
        }
    }
);



export const findAllProvider = createAsyncThunk(
    "admin/findAllProvider",
    async (arg, thunkAPI) => {
        try {
            const res = await customAPI().get("/admin/find-all", {
                params: {
                    role: "provider"
                }
            });
            return res.data.data.docs;
        } catch (err) {
            return err.response?.data?.payload;
        }
    }
);