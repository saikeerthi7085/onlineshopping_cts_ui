import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../services/ProductService";

const initialState = {
    isLoading:false,
    data:null
  };

  export const getAllProducts = createAsyncThunk(
    "users/getproducts",
    async () => {
      const res = await ProductService.GetAllProducts();
      return res.data;
    }
  );
  export const SearchProducts = createAsyncThunk(
    "users/searchproducts",
    async ({ProductName},data) => {
      const res = await ProductService.SearchProductsService(ProductName);
      return res.data;
    }
  );
  
  export const AddNewProduct = createAsyncThunk(
    "users/addNewProduct",
    async ({Product},data) => {
      const res = await ProductService.AddNewProductService(Product);
      return res.data;
    }
  );
  
  export const UpdateProductStatusSlice = createAsyncThunk(
    "users/updateproductStatus",
    async ({productStatus,id},data) => {
      const res = await ProductService.UpdateProductStatusService(productStatus,id);
      return res.data;
    }
  );
  export const DeleteProductSlice = createAsyncThunk(
    "users/deleteProduct",
    async ({id},data) => {
      const res = await ProductService.DeleteProductService(id);
      return res.data;
    }
  );
  
  export const ProductSliceReducer = createSlice({
    name: "Products",
    initialState,
    callback: {
      [getAllProducts.fulfilled]: (state=initialState, action) => {
       
        return [state.data = action.payload,
        state.isLoading=false]
      },
      [getAllProducts.rejected]: (state=initialState, action) => {
        return [state.data = "",
          state.isLoading=false]
      },
      [getAllProducts.pending]: (state=initialState, action) => {
        return [state.data = " ",
          state.isLoading=true]
    },
    [SearchProducts.fulfilled]: (state=initialState, action) => {
       
        return [state.data = action.payload,
        state.isLoading=false]
      },
      [SearchProducts.rejected]: (state=initialState, action) => {
        return [state.data = "",
          state.isLoading=false]
      },
      [SearchProducts.pending]: (state=initialState, action) => {
        return [state.data = " ",
          state.isLoading=true]
    },
    [AddNewProduct.fulfilled]: (state=initialState, action) => {
       
      return [state.data = action.payload,
      state.isLoading=false]
    },
    [AddNewProduct.rejected]: (state=initialState, action) => {
      return [state.data = "",
        state.isLoading=false]
    },
    [AddNewProduct.pending]: (state=initialState, action) => {
      return [state.data = " ",
        state.isLoading=true]
  },
},
});