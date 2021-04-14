import { createSlice } from '@reduxjs/toolkit';


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        productsInCart: [],
        totalCost: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            state.productsInCart = [...state.productsInCart, action.payload];
            state.totalCost += parseFloat(action.payload.unit_price);
        },
        removeFromCart: (state, action) => {
            const index = state.productsInCart.findIndex(product => product.id === action.payload.id);

            state.productsInCart = state.productsInCart.splice(index, 1);
            state.totalCost -= parseFloat(action.payload.unit_price);
        },
        removeAllFromCart: (state, action) => {
            //subtract the price of the products to be removed from the total
            const products = state.productsInCart.filter(product => product.id === action.payload.id);
            state.totalCost -= parseFloat(action.payload.unit_price) * products.length;

            //filter out the products
            state.productsInCart = state.productsInCart.filter(product => product.id !== action.payload.id);
        },
    }
});


export const { addToCart, removeFromCart, removeAllFromCart } = CartSlice.actions;
export default CartSlice.reducer;