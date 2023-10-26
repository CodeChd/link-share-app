import { configureStore } from "@reduxjs/toolkit";
import linkSliceReducer from "./context/linkSlice";
import authSliceReducer from "./context/authSlice";

const store = configureStore({
  reducer: {
    link: linkSliceReducer,
    auth: authSliceReducer,
  },
  devTools: true,
});

export default store;
