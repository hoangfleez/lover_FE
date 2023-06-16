import { createSlice } from "@reduxjs/toolkit";
import {addProvider, filterProvider, getProvider, getProviderDetail} from "../../services/providerService";
// import { filterProvider, getProvider } from "../../sevives/providerService";
// import { addProvider, filterProvider, getProvider } from "../../services/providerService"

const initialState = {
  listProvider: [],
  currenProvider: [],
  lease: [],
  showOneProvider: {}

};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProvider.fulfilled, (state, action) => {
      state.listProvider = action.payload;
      state.currenProvider = action.payload;
    });

    builder.addCase(filterProvider.fulfilled, (state, { payload }) => {
      let arr = payload.listProvider.filter((element) => {
        return payload.service.some((item) => {
          return element.other.includes(item);
        });
      });
      // console.log(arr,6666);
      // return arr;
    });

    builder.addCase(addProvider.fulfilled, (state, action) => {
      state.lease = action.payload;
    });

    builder.addCase(getProviderDetail.fulfilled, (state, action) => {
      state.showOneProvider = action.payload;
    });
  },
  
});

export default providerSlice.reducer;
