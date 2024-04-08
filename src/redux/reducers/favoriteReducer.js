import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    favoriteItem: []
}

const favoriteSlice = createSlice({
    name: 'favoritepro',
    initialState,
    reducers: {
        addFavorite(state, action) {
            // console.log("action.payload.id:  " + action.payload.id);
            // if (favoriteItem.length == 0) {
            state.favoriteItem.push(action.payload);
            // } else {
            //     favoriteItem = []
            // }
        }
    },


});

export const { addFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
