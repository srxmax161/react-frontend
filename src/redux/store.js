import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/loginSlice";
import alertReducer from "./alert/alertSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
  },
});

export default store;