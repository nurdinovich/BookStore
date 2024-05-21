import { createSlice } from "@reduxjs/toolkit";
import fetchCounter from "../reducers/caunterCreator";

const initialState = {
  count: 0,
  message: "",
};

const counterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    setIncrement: (state, action) => {
      state.count = action.payload.count;
      state.message = `user#${action.payload.id}incraesed to ${action.payload.count}`;
    },
  },
  extraReducers: (bulid) => {
    bulid.addCase(fetchCounter.fulfilled, (state, action) => {
      state.count = action.payload.count;
      state.message = `user#${action.payload.id}incraesed to ${action.payload.count}`;
    });
  },
});

const counterReducer = counterSlice.reducer;
export const { setIncrement } = counterSlice.actions;
export default counterReducer;
