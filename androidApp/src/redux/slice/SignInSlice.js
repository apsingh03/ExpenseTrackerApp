import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert} from 'react-native';
// import { jwtDecode } from "jwt-decode";

import {useNavigation} from '@react-navigation/native';

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

const redirectToAnotherScreen = routeName => {
  const navigation = useNavigation();
  navigation.navigate('HomeScreen');
};

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedData: {
    // isUserLogged:
    //   localStorage.getItem("loggedDataToken") !== null
    //     ? jwtDecode(localStorage.getItem("loggedDataToken")).isUserLogged
    //     : null,
    // id:
    //   localStorage.getItem("loggedDataToken") !== null
    //     ? jwtDecode(localStorage.getItem("loggedDataToken")).id
    //     : null,
    // isPremiumuser:
    //   localStorage.getItem("loggedDataToken") !== null
    //     ? jwtDecode(localStorage.getItem("loggedDataToken")).isPremiumuser
    //     : null,
    // fullName:
    //   localStorage.getItem("loggedDataToken") !== null
    //     ? jwtDecode(localStorage.getItem("loggedDataToken")).fullName
    //     : null,
    // email:
    //   localStorage.getItem("loggedDataToken") !== null
    //     ? jwtDecode(localStorage.getItem("loggedDataToken")).email
    //     : null,
  },
};

export const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {},

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

export default signinSlice.reducer;
