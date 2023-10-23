import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = localStorage.getItem("dragLinks")
  ? JSON.parse(localStorage.getItem("dragLinks") as string)
  : [];

const drag = createSlice({
  name: "drag",
  initialState,
  reducers: {
    addLink: (state, action) => {},
    removeLink: (state, action) => {},
  },
});

export const { addLink, removeLink } = drag.actions;

export default drag.reducer;
