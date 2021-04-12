import { configureStore } from '@reduxjs/toolkit';

import loginReducer from '../features/Login/LoginSlice';
import cartReducer from '../features/Cart/CartSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer
  },
});
