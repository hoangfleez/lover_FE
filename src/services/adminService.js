import { createAsyncThunk } from "@reduxjs/toolkit";
import customAPI from "./customAPI.js";

export const findAllUser = createAsyncThunk(
  "admin/findAllUser",
  async () => {
      try {
          const res = await customAPI().get("/admin/find-all");
          return res.data.data.docs;
      } catch (err) {
          return err.response?.data?.payload;
      }
  }
);

export const changeRole = createAsyncThunk(
  "admin/changeRole",
  async (users) => {
    return users;
  }
);

// export const findAllProvider = createAsyncThunk(
//     "admin/findAllProvider",
//     async () => {
//         try {
//             const res = await customAPI().get("/admin/find-all", {
//                 params: {
//                     role: "provider"
//                 }
//             });
//             return res.data.data.docs;
//         } catch (err) {
//             return err.response?.data?.payload;
//         }
//     }
// );
export const updateRole = createAsyncThunk(
  "admin/updateRole",
  async ({ id, newRoleId }) => {
    try {
      const res = await customAPI().put(`admin/${id}`, { role: newRoleId });
      return res.data;
    } catch (err) {
      return err.response?.data?.payload;
    }
  }
);

export const lockAccount = createAsyncThunk("admin/lockAccount", async (id) => {
  try {
    const res = await customAPI().put(`/admin/lock-user/${id}`);
  } catch (err) {
    return err.response?.data?.payload;
  }
});

export const openAccount = createAsyncThunk("admin/openAccount", async (id) => {
  try {
    const res = await customAPI().put(`/admin/open-user/${id}`);
  } catch (err) {
    return err.response?.data?.payload;
  }
});