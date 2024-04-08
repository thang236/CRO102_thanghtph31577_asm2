import { createAsyncThunk } from '@reduxjs/toolkit';
import { addComment } from '../reducers/commentReducer';

const api_url = "http://10.0.2.2:3000/comment"

export const fetchComment = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();


            data.forEach(row => {
                dispatch(addComment(row));
            });

        } catch (error) {
            console.log(error);
        }
    }
};

export const addCommentAPI = createAsyncThunk(
    'comment/addCommentAPI',
    async (objComment, thunkAPI) => {
        console.log(objComment);
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'

                },
                body: JSON.stringify(objComment)
            })
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const errData = await response.json();
                return thunkAPI.rejectWithValue(errData);
            }

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)