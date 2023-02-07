import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { access } from 'fs';
import { RootState, AppThunk } from '../../app/store';
import { login } from './loginAPI';

export interface LoginState {
  logged : boolean,
  access : string
  
}

const initialState: LoginState = {
  logged: false,
  access: ''
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (cred :  any) => {
    const response = await login(cred);
    // console.log(response)
    return response.data;
  }
);



// export const getAllStudentsAsync = createAsyncThunk(
//   'login/getAllStudents',
//   async (access:string) => {
//     const response = await getAllStudents(access);
//     console.log(response)
//     return response.data;
//   }
// );

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
     state.logged = false
     state.access = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        // console.log(action.payload.access)   
         state.logged = true
         state.access = action.payload.access
        
      });
  },
});

export const { logout  } = loginSlice.actions;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectAccsess = (state: RootState) => state.login.access;


export default loginSlice.reducer;
