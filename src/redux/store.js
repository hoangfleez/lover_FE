import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import providerReducer from './provider/providerSlice';
import typeReducer from './type/typeSlice';
import serviceReducer from './service/serviceSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    provider: providerReducer,
    type: typeReducer,
    service: serviceReducer,
  },
});

export default store;
