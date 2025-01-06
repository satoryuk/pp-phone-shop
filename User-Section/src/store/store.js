import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart.js'
import favoriteReducer from './favorite.js'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer
    }
})

export default store;