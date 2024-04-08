import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProduct } from '../reducers/productReducer';
import { addFavorite } from '../reducers/favoriteReducer'
const api_url = 'http://10.0.2.2:3000/products';


export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();


            data.forEach(row => {

                dispatch(addProduct(row));
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };
};

export const fetchProductFavorite = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            const favoriteProducts = data.filter(product => product.isFavorite === true);
            console.log(favoriteProducts);

            favoriteProducts.forEach(row => {
                dispatch(addFavorite(row))
            });


        } catch (error) {
            console.error('Error:', error);
        }
    };
};







export const deleteProductApi = createAsyncThunk(
    'product/deleteProductApi',
    async (id, thunkAPI) => {
        try {
            // Gửi yêu cầu DELETE đến API để xóa todo
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
            });
            // console.log(response);
            // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
            if (response.ok) {
                // console.log(response);
                // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
                return id;
            } else {
                // Nếu có lỗi từ phía server, trả về lỗi
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const addProductAPI = createAsyncThunk(
    'product/addProductAPI',
    async (objTodo, thunkAPI) => {
        console.log(objTodo);
        try {
            // Gửi yêu cầu THêm đến API để xóa todo
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objTodo)
            });
            const data = await response.json();
            // console.log(response);
            // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
            if (response.ok) {
                // console.log(response);
                // Sau khi thêm thành công, trả về dữ liệu server trả về để cập nhật store


                return data;
            } else {
                // Nếu có lỗi từ phía server, trả về lỗi
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const updateProductApi = createAsyncThunk(
    'product/updateProductApi',
    async (objUpdate, thunkAPI) => {
        try {
            console.log(objUpdate);

            const response = await fetch(`${api_url}/${objUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUpdate.data)
            });

            const data = await response.json();
            console.log(response.status);

            if (response.ok) {
                console.log("oke");
                // Sau khi Sửa thành công, trả về data kết quả để cập nhật store


                return data;
            } else {
                // Nếu có lỗi từ phía server, trả về lỗi
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const toggleFAVApi = createAsyncThunk(
    'product/toggleFAVApi',
    async (objUpdate, thunkAPI) => {

        try {


            const response = await fetch(`${api_url}/${objUpdate.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUpdate.data)
            });

            const data = await response.json();

            if (response.ok) {

                return data;
            } else {

                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const toggleCheckApi = createAsyncThunk(
    'product/toggleCheckApi',
    async (objUpdate, thunkAPI) => {

        try {


            const response = await fetch(`${api_url}/${objUpdate.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUpdate.data)
            });

            const data = await response.json();

            if (response.ok) {

                return data;
            } else {

                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
);







