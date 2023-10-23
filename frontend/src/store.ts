import { configureStore } from "@reduxjs/toolkit";
import linkSliceReducer from "./context/linkSlice";

const store = configureStore({
  reducer: {
    link: linkSliceReducer,
  },
  devTools: true,
});

export default store;
