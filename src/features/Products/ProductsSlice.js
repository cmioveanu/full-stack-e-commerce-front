import { createSlice } from '@reduxjs/toolkit';

export const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        individualProductOpen: false
    },
    reducers: {
        toggleOpen: (state) => {
            const open = state.individualProductOpen;
            state.individualProductOpen = open ? false : true;
        },
    }
});

export const { toggleOpen } = ProductsSlice.actions;
export default ProductsSlice.reducer;