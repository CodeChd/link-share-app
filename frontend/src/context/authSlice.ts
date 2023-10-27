import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  userInfo: {
    id: number;
    name: string;
    email: string;
  } | null;
}

const initialState: User = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: User,
      action: PayloadAction<{
        id: number;
        name: string;
        email: string;
      }>
    ) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
    removeCredentials: (state: User) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, removeCredentials } = userSlice.actions;

export default userSlice.reducer;
