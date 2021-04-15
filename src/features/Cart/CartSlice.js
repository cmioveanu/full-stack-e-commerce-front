import { createSlice } from '@reduxjs/toolkit';


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        productsInCart: [],
        numberOfItems: 0,
        totalCost: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            //copy the products list and the product to be added
            const productsList = [...state.productsInCart];
            const product = { ...action.payload };

            //get the index of the product to check if it already exists in cart
            const productIndex = productsList.findIndex(element => element.id === product.id);

            //if it doesn't exist, initialize quantity and add it to cart
            if (productIndex === -1) {
                product.quantity = 1;
                state.productsInCart = [...productsList, product];
            }
            //if it does exist, increment it's quantity property without adding duplicates
            else {
                const existingProduct = productsList[productIndex];
                existingProduct.quantity++;

                state.productsInCart = productsList;
            }

            //increment the number of items and add cost to total cost
            state.numberOfItems++;
            state.totalCost += parseFloat(action.payload.unit_price);
        },


        removeFromCart: (state, action) => {
            //copy the products list and the product to be removed
            const productsList = [...state.productsInCart];
            const product = { ...action.payload };

            //get the index of the product in cart
            const productIndex = productsList.findIndex(element => element.id === product.id);
            const existingProduct = productsList[productIndex];

            //if quantity is 1, remove the product
            if(existingProduct.quantity === 1) {
                const filteredProductsList = productsList.filter(element => element.id !== product.id);
                state.productsInCart = filteredProductsList;
            } 
            //if quantity is higher than 1, decrement quantity
            else {
                existingProduct.quantity--;
                state.productsInCart = productsList;
            }

            //decrement number of items and remove the cost from total cost
            state.numberOfItems--;

            let totalCost = state.totalCost -= parseFloat(action.payload.unit_price);
            if(totalCost < 0) totalCost = 0;
            state.totalCost = totalCost;
        },


        removeAllFromCart: (state, action) => {
            //copy the products list and the product to be removed
            const productsList = [...state.productsInCart];
            const product = { ...action.payload };

            //get the index of the product in cart
            const productIndex = productsList.findIndex(element => element.id === product.id);
            const existingProduct = productsList[productIndex];

            //decrease number of items and remove the cost from total cost
            state.numberOfItems -= existingProduct.quantity;

            let totalCost = state.totalCost - parseFloat(existingProduct.quantity * existingProduct.unit_price);
            if(totalCost < 0) totalCost = 0;
            state.totalCost = totalCost;

            //remove the item from the list
            state.productsInCart = state.productsInCart.filter(product => product.id !== action.payload.id);
        },
    }
});


export const { addToCart, removeFromCart, removeAllFromCart } = CartSlice.actions;
export default CartSlice.reducer;