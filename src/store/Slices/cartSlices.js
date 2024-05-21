import { createSlice } from "@reduxjs/toolkit";
import fetchAllCart, { deleteCartItem } from "../reducers/cartCreate";


const initialState = {
  cart: [],
  cartError: "",
  cartLoading: false,
};
const cartSlices = createSlice({
  initialState,
  name: "Cart",
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCart.pending, (state, action) => {
      state.cart = [];
      state.cartError = ""; 
      state.cartLoading = true;
    });
    builder.addCase(fetchAllCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartLoading = false;
    });
    builder.addCase(fetchAllCart.rejected, (state, action) => {
      state.cartError = action.payload;
      state.cartLoading = false;
    });
    builder.addCase(deleteCartItem.fulfilled,(state, action)=>{
      state.cart = state.cart.filter(cart => cart.id !== action.payload)
    });
    builder.addCase(deleteCartItem.rejected,(state, action)=>{
      state.cart.push(action.payload)
    })
  },
});
const cartReducer = cartSlices.reducer;
export const { setCart } = cartSlices.actions;
export default cartReducer;
