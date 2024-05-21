import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { setCart } from "../Slices/cartSlices";

const fetchAllCart = createAsyncThunk(
  "cart/fetchAll",
  async (payloud, thunkApi) => {
    try {
      const responce = await api.getCart();
      return responce.data;
    } catch (err) {
      return thunkApi.rejectWithValue("Download failed");
    }
  }
);
const createItem = (book, item = {}) => {
  const { total = 0, count = 0 } = item;
  return {
    title: book.title,
    count: count + 1,
    total: total + book.price,
    id:book.id,
  };
};

const addBookToCart = createAsyncThunk(
  "cart/addItem",
  async (payloud, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const { cart } = state.cart;
      const { books } = state.bookList;
      const cartItem = cart.find((el) => el.id === payloud);
      const book = books.find((el) => el.id === payloud); 

 const newItem = createItem(book, cartItem)

if (cartItem) {
    await api.editCartItem(newItem);
    const newCartItems = cart.map((item) =>
      item.id === payloud ? newItem : item
    );
    return thunkApi.dispatch(setCart(newCartItems));
}

const newCartItems = [...cart, newItem]
await api.addToCart(newItem);
return thunkApi.dispatch(setCart(newCartItems));
    } catch (err) {
      return thunkApi.rejectWithValue("Failed to add book");
    }
  }
);
const removeFromCart = createAsyncThunk(
    "cart/removeItem",
    async (payload, thunkApi) => {
      try {
        const state = thunkApi.getState();
        const { cart } = state.cart;
        const { books } = state.bookList;
        const cartItem = cart.find((el) => el.id === payload);
        const book = books.find((el) => el.id === payload);
  
        const newItem = createItem(book, cartItem, -1);
  
        if (cartItem.count > 10) {
          await api.editCartItem(newItem);
          const newCartItems = cart.map((item) =>
            item.id === payload ? newItem : item
          );
          return thunkApi.dispatch(setCart(newCartItems));
        } else {
          const newCartItems = cart.filter((el) => el.id !== payload);
          await api.deleteCartItem(payload);
          return thunkApi.dispatch(setCart(newCartItems));
        }
      } catch (error) {
        return thunkApi.rejectWithValue("Failed to remove book");
      }
    }
  );

  export const deleteCartItem = createAsyncThunk('cart/delete', async(id, thunkApi)=>{
    try{
    await api.deleteCartItem(id)
    return id;
    }catch(err){
return thunkApi.rejectWithValue('error')
    }
  })

export default fetchAllCart;
export { addBookToCart, removeFromCart };
