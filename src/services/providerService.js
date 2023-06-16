import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import customAPI from "./customAPI.js";

export const getProvider = createAsyncThunk(
  "provider/getProvider",
  async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8181/providers");
      return res.data;
    } catch (err) {
      return err.response.data.payload;
    }
  }
)

export const addProvider = createAsyncThunk(
  "provider/addProvider",
  async (provider) => {
    try {
      const res = await customAPI().post("providers", provider);
      return res.data;
    } catch (err) {
      return err.response.data.payload;
    }
  }
);

export const getProviderDetail = createAsyncThunk(
    "provider/getProviderDetail",
    async (id) => {
        try {
            const res = await customAPI().get(`providers/providerDetail/${id}`);
            return res.data;
        } catch (err) {
            return err.response.data.payload;
        }
    }
);


export const filterProvider = createAsyncThunk(
  "provider/filterProvider",
  async (arrbox) => {
    return arrbox;
  }
);
