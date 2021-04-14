import { configureStore } from '@reduxjs/toolkit';

import loginReducer from '../features/Login/LoginSlice';
import cartReducer from '../features/Cart/CartSlice';
import productsReducer from '../features/Products/ProductsSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
    products: productsReducer
  },
});
