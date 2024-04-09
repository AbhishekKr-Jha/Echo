import { createSlice } from "@reduxjs/toolkit";

const darkMode = createSlice({
  name: "darkMode",
  initialState: {
    dark_mode: false,
  },
  reducers: {
    toggleDarkMode(state) {
      state.dark_mode ? (state.dark_mode = false) : (state.dark_mode = true);
    },
  },
});

export const { toggleDarkMode } = darkMode.actions;
export default darkMode.reducer;
