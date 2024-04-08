import { createSlice } from '@reduxjs/toolkit'
import { addCommentAPI } from '../actions/commentAction'


const initialState = {
    commentItem: []
}

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComment(state, action) {
            state.commentItem.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(addCommentAPI.fulfilled, (state, action) => {
            console.log("addCommentAPI.fulfilled :" + action.payload.message);
            state.commentItem.push(action.payload);
        })
            .addCase(addCommentAPI.rejected, (state, action) => {
                console.log("addCommentAPI.rejected: ", action.error.message);
            })
    }
})

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;