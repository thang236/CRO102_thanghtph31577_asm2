import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    productViewed: []
}

const productViewedSlice = createSlice({
    name: 'productViewed',
    initialState,
    reducers: {
        addProductViewed(state, action) {
            console.log("action.payload.id:  " + action.payload.id);
            state.productViewed.push(action.payload);
        }
    },


});

export const { addProductViewed } = productViewedSlice.actions;
export default productViewedSlice.reducer;
