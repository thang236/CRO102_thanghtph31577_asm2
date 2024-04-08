import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addToCartAPI, updateCartItemAPI, removeCartItemAPI } from '../actions/cartActions';

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart(state, action) {
            state.cartItems.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(addToCartAPI.fulfilled, (state, action) => {
                state.cartItems.push(action.payload);
            });


        builder.addCase(updateCartItemAPI.fulfilled, (state, action) => {
            const { id, nameProduct, price, description, image, category, size, quantity } = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].nameProduct = nameProduct;
                state.cartItems[itemIndex].quantity = quantity;
                state.cartItems[itemIndex].price = price;
                state.cartItems[itemIndex].description = description;
                state.cartItems[itemIndex].image = image;
                state.cartItems[itemIndex].category = category;
                state.cartItems[itemIndex].size = size;

            }
        });
        builder.addCase(removeCartItemAPI.fulfilled, (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        });
    }
});


export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
