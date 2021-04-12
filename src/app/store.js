import { configureStore } from '@reduxjs/toolkit';

import loginReducer from '../features/Login/LoginSlice';
import productsReducer from '../features/Products/ProductsSlice';
import cartReducer from '../features/Cart/CartSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
    cart: cartReducer
  },
});
