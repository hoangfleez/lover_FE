import { createAsyncThunk } from "@reduxjs/toolkit";
import customAPI from "./customAPI.js";
import axios from "axios";

export const findAllUser = createAsyncThunk("admin/findAllUser", async (page) => {
  try {
    const res = await customAPI().get(`/admin/find-all?page=${page}`);
    return res.data.data;
  } catch (err) {
    return err.response?.data?.payload;
  }
});

export const findAllUsers = createAsyncThunk("admin/findAllUsers", async (page) => {
  try {
    const res = await customAPI().get(`/admin/allUser-vip?page=${page}`);
    return res.data;
  } catch (err) {
    return err.response?.data?.payload;
  }
});




export const changeRole = createAsyncThunk(
  "admin/changeRole",
  async ({ users, user }) => {
    try {
      await customAPI().put(`admin/role/${user.id}`, { role: user.role.id });
      return users;
    } catch (err) {
      return err.response?.data?.payload;
    }
  }
);

export const lockAccount = createAsyncThunk("admin/lockAccount", async (id) => {
  try {
    let res = await customAPI().put(`/admin/lock-user/${id}`);
    return res.data;
  } catch (err) {
    return err.response?.data?.payload;
  }
});

export const openAccount = createAsyncThunk("admin/openAccount", async (id) => {
  try {
    let res = await customAPI().put(`/admin/open-user/${id}`);
    return res.data;
  } catch (err) {
    return err.response?.data?.payload;
  }
});
