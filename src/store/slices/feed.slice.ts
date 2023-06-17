import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedSliceState {
  selectedTag: string;
  currentUser: string;
}

const initialState: FeedSliceState = {
  selectedTag: "Global Feed",
  currentUser: "",
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    selectTag(state, action: PayloadAction<string>) {
      state.selectedTag = action.payload;
    },
    selectUser(state, action: PayloadAction<string>) {
      state.currentUser = action.payload;
    },
  },
});

export const { selectTag, selectUser } = feedSlice.actions;

export default feedSlice.reducer;
