import { createSlice } from '@reduxjs/toolkit';


export const ProductsSlice = createSlice({
  name: 'products',
  initialState: {
    productsList: [],
    activeProduct: null
  },
  reducers: {
    getProducts: (state, action) => {
      state.productsList = action.payload
    },
    changeActiveProduct: (state, action) => {
      state.activeExercise = action.payload;
    }
  }
});


export const { getProducts, changeActiveProduct } = ProductsSlice.actions;
export default ProductsSlice.reducer;