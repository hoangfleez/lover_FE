import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import customAPI from "./customAPI.js";

export const createRoom = createAsyncThunk("conversation", async (id) => {
  try {
    const res = await customAPI().post(`/conversation/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
});

export const showAllChat = createAsyncThunk("conversation", async (id) => {
  try {
    const res = await customAPI().get(`/conversation`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
});

export const getChat = createAsyncThunk("messages", async (id) => {
  try {
    const res = await customAPI().get(`/messages/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
});

export const sendMessage = createAsyncThunk("messages", async (data) => {
  try {
    const res = await customAPI().post(`/messages/${data.conversationId}`, {
      content: data.content,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
});
