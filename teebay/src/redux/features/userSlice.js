import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSeller: false,
  },
  reducers: {
    toggleIsSeller: (state) => {
      state.isSeller = !state.isSeller;
    },
  },
});

export const { toggleIsSeller } = userSlice.actions;

export default userSlice.reducer;
