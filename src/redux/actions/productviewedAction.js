import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProductViewed } from '../reducers/productviewedReducer';
const api_url = 'http://10.0.2.2:3000/products';


export const fetchProductVieweds = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url + `/?viewed=1`);
            const data = await response.json();

            data.forEach(row => {
                dispatch(addProductViewed(row));
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
};














