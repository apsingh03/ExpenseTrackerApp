import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert} from 'react-native';
import {BACKEND_HOSTNAME} from '@env';

const HOSTNAME = BACKEND_HOSTNAME;

export const loginUserAsync = createAsyncThunk(
  'users/loginUser',
  async ({email, password}) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(`${HOSTNAME}/users/loginUser/`, {
        email: email,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.log('Error  ', error);
    }
  },
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedData: null,
};

export const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    setLoggedData(state, action) {
      // console.log('set Logged Data reducer call');
      state.loggedData = action.payload;
    },

    logout(state, action) {
      // console.log('Logout reducer Called ');
      state.loggedData = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loginUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {setLoggedData, logout} = signinSlice.actions;
export default signinSlice.reducer;
