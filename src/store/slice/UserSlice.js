import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";

const initialState = {
  isLoading:false,
  data:null
};

export const checkLogin = createAsyncThunk(
    "users/login",
    async ({loginId, password},data) => {
      const res = await UserService.LoginService( loginId, password );
      return res.data;
    }
  );

  export const RegisterUser = createAsyncThunk(
    "users/Register",
    async ({User},data) => {
      const res = await UserService.RegisterUserService( User );
      return res.data;
    }
  );
  export const ResetPasswordAction = createAsyncThunk(
    "users/ResetPassword",
    async ({loginId, newPassword},data) => {
      const res = await UserService.ResetPasswordService( loginId,newPassword );
      return res.data;
    }
  );

export const UserSliceReducer = createSlice({
    name: "Users",
    initialState,
    callback: {
      [checkLogin.fulfilled]: (state=initialState, action) => {
       
        return [state.data = action.payload,
        state.isLoading=false]
      },
      [checkLogin.rejected]: (state=initialState, action) => {
        return [state.data = "",
          state.isLoading=false]
      },
      [checkLogin.pending]: (state=initialState, action) => {
        return [state.data = " ",
          state.isLoading=true]
    },
      [RegisterUser.fulfilled]: (state=initialState, action) => {
        return [state.data = action.payload,
          state.isLoading=false]
      },
      [RegisterUser.rejected]: (state=initialState, action) => {
        return [state.data = "",
          state.isLoading=false]
      },
      [RegisterUser.pending]: (state=initialState, action) => {
        return [state.data = "",
          state.isLoading=true]

      },
      [ResetPasswordAction.fulfilled]: (state=initialState, action) => {
        return [state.data = action.payload,
          state.isLoading=false]
      },
      [ResetPasswordAction.rejected]: (state=initialState, action) => {
        return [state.data = "",
          state.isLoading=false]
      },
      [ResetPasswordAction.pending]: (state=initialState, action) => {
        return [state.data = "",
          state.isLoading=true]

      },
    },
    });