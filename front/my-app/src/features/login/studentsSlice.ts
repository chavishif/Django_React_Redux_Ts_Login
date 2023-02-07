import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { access } from 'fs';
import { RootState, AppThunk } from '../../app/store';
import {  getAllStudents} from './studentAPI';
import {Student} from '../../models/student'

export interface LoginState {
  my_students : Student[]

  
}

const initialState: LoginState = {
  my_students : []

};





export const getAllStudentsAsync = createAsyncThunk(
  'login/getAllStudents',
  async (access:string) => {
    const response = await getAllStudents(access);
    // console.log(response.data)
    return response.data;
  }
);

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudentsAsync.fulfilled, (state, action) => {
        state.my_students = action.payload
        // console.log(action.payload)   

  
      });
  },
});


export const {   } = studentSlice.actions;
export const selectstudents = (state: RootState) => state.student.my_students;
// export const selectAccsess = (state: RootState) => state.login.access;


export default studentSlice.reducer;
