import { configureStore } from "@reduxjs/toolkit";
import linkSliceReducer from "./context/linkSlice";
import authSliceReducer from "./context/authSlice";
import apiSlice from "./context/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    link: linkSliceReducer,
    auth: authSliceReducer,
  },
  devTools: true,
  middleware: (d) => d().concat(apiSlice.middleware),
});

export default store;
