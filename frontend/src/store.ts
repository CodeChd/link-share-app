import { configureStore } from "@reduxjs/toolkit";
import dragSliceReducer from "./context/drag&Drop";

const store = configureStore({
  reducer: {
    drag: dragSliceReducer,
  },
  devTools: true,
});

export default store;
