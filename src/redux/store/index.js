import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';
import commentReducer from '../reducers/commentReducer';
import productviewedReducer from "../reducers/productviewedReducer";
import favoriteReducer from "../reducers/favoriteReducer";

export default configureStore({
    reducer: {
        listProduct: productReducer,
        cartItems: cartReducer,
        commentItem: commentReducer,
        productViewed: productviewedReducer,
        favoriteItem: favoriteReducer
    }
});
