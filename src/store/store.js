import {configureStore} from '@reduxjs/toolkit'
import BookListReducer from './Slices/BookListSlices'
import cartReducer from './Slices/cartSlices'
import counterReducer from './Slices/caunterSlices'

const rootReducer = {
    bookList:BookListReducer,
    counter: counterReducer,
    cart: cartReducer
}

const store = configureStore({
    reducer:rootReducer,
})

export default store 