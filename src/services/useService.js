import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import customAPI from "./customAPI.js";

export const login = createAsyncThunk("users/login", async (user) => {
  try {
    let data = "";
    const res = await axios
      .post("http://127.0.0.1:8181/users/login", user)
      .then((res) => {data = res.data.data})
      .catch((err) => {
        data = err.response.data.data;
        return err.response.data.data;
      });
      if(data.length > 30) {
        return {data}
      }else{
      return {err:data}
      }
    
  } catch (err) {
    return err.response.data.payload;
  }
});

export const register = createAsyncThunk("users/register", async (user) => {
  try {
    const res = await axios.post("http://127.0.0.1:8181/users/register", user);
    return res.data;
  } catch (err) {
    return err.response.data.payload;
  }
});

export const showUser = createAsyncThunk("users/showUser", async (id) => {
  try {
    const res = await customAPI().get(`/users/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data.payload;
  }
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async (arg, thunkAPI) => {
    try {
      const res = await customAPI().put(`/users/${arg.id}`, arg);
      return res.data;
    } catch (err) {
      return err.response.data.payload;
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  localStorage.clear();
  return undefined;
});
