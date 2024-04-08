import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCart } from '../reducers/cartReducer'

const api_url = 'http://10.0.2.2:3000/carts';


export const fetchCart = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            data.forEach(row => {

                dispatch(addCart(row));
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
};

// Action creator để thêm sản phẩm vào giỏ hàng
export const addToCartAPI = createAsyncThunk(
    'cart/addToCartAPI',
    async (product, thunkAPI) => {
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Action creator để cập nhật số lượng của sản phẩm trong giỏ hàng
export const updateCartItemAPI = createAsyncThunk(
    'cart/updateCartItemAPI',
    async ({ id, quantity }, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Action creator để xóa sản phẩm khỏi giỏ hàng
export const removeCartItemAPI = createAsyncThunk(
    'cart/removeCartItemAPI',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
