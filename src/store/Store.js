import { configureStore } from '@reduxjs/toolkit'
import {UserSliceReducer} from './slice/UserSlice';
import { ProductSliceReducer } from './slice/ProductSlice';


  
  const store = configureStore({ reducer: {
    userReducer: UserSliceReducer.reducer,
    productReducer:ProductSliceReducer.reducer
  } })

  
  export default store;