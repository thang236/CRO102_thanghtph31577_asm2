import { createSlice } from "@reduxjs/toolkit";
import { addProductAPI, deleteProductApi, toggleCheckApi, toggleFAVApi, updateProductApi } from '../actions/productAction';

const initialState = {
    listProduct: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct(state, action) {
            state.listProduct.push(action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(deleteProductApi.fulfilled, (state, action) => {
                state.listProduct = state.listProduct.filter(row => row.id != action.payload);
            })
            .addCase(deleteProductApi.rejected, (state, action) => {
                console.log('Delete product rejected:', action.error.message);
            });
        builder
            .addCase(addProductAPI.fulfilled, (state, action) => {
                state.listProduct.push(action.payload);
            })
            .addCase(addProductAPI.rejected, (state, action) => {
                console.log("Add product rejected: ", action.error.message);
            });
        builder
            .addCase(updateProductApi.fulfilled, (state, action) => {
                const { id, price, nameProduct, description, image, isFavorite, category } = action.payload;

                const product = state.listProduct.find(row => row.id == id);
                if (product) {
                    product.price = price;
                    product.nameProduct = nameProduct;
                    product.description = description;
                    product.image = image;
                    product.isFavorite = isFavorite;
                    product.category = category;
                }
            });

        builder.addCase(toggleFAVApi.fulfilled, (state, action) => {
            const { id, isFavorite } = action.payload;
            const product = state.listProduct.find(row => row.id == id);
            console.log(1111111);
            if (product) {
                product.isFavorite = isFavorite;
            }
        });

        builder.addCase(toggleCheckApi.fulfilled, (state, action) => {
            const { id, viewed } = action.payload;
            const product = state.listProduct.find(row => row.id == id);
            if (product) {
                product.viewed = viewed;
            }
        })
    }
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
