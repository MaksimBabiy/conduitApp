import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface FeedSliceState {
  userData: User | null;
}

const initialState: FeedSliceState = {
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<User | null>) {
      if (action?.payload === null) state.userData = null;
      state.userData = action?.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
