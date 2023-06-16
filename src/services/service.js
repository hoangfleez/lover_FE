import { createAsyncThunk } from "@reduxjs/toolkit";


export const getService = createAsyncThunk("service", async ()=>{
  const array = [
    { id: "1", name: "Tất cả" },
    { id: "2", name: "Ra mắt người nhà" },
    { id: "3", name: "Ra mắt bạn bè" },
    { id: "4", name: "Du lịch chung cùng nhóm bạn" },
    { id: "5", name: "Đi chơi chung" },
    { id: "6", name: "Tham dự sinh nhật" },
    { id: "7", name: "Trò chuyện offline" },
    { id: "8", name: "Trò chuyện online" },
    { id: "9", name: "Đi chơi tết" },
    { id: "10", name: "Đi chơi ngày lễ" },
  ];
  return array;
})