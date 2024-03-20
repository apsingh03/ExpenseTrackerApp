import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import axios from 'axios';
import {BACKEND_HOSTNAME} from '@env';

const HOSTNAME = BACKEND_HOSTNAME;

export const getAllUsersAsync = createAsyncThunk('users/getUsers', async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/users/getUsers/`);
    return response.data;
  } catch (error) {
    console.log('Error  ', error);
  }
});

export const getUserByUserIdAsync = createAsyncThunk(
  'users/getUsersById',
  async ({userId}) => {
    try {
      const response = await axios.get(`${HOSTNAME}/users/getUsers/${userId}`);
      return response.data;
    } catch (error) {
      console.log('Error  ', error);
    }
  },
);

export const forgotPasswordByEmailAsync = createAsyncThunk(
  'users/forgotPassword',
  async ({email}) => {
    try {
      const response = await axios.post(`${HOSTNAME}/users/forgotPassword`, {
        email: email,
      });
      return response.data;
    } catch (error) {
      console.log('Error  ', error);
    }
  },
);

export const resetPasswordByRequestTokenAsync = createAsyncThunk(
  'users/resetPassword',
  async ({requestToken, newPassword}) => {
    try {
      // console.log("its working" , email );
      const response = await axios.post(
        `${HOSTNAME}/users/forgotPassword/resetPassword`,
        {
          requestToken: requestToken,
          newPassword: newPassword,
        },
      );
      return response.data;
    } catch (error) {
      console.log('Error  ', error);
    }
  },
);

export const createUserAsync = createAsyncThunk(
  'users/createUser',
  async ({fullName, email, password}) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(`${HOSTNAME}/users/createUser/`, {
        fullName: fullName,
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
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getAllUsersAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserByUserIdAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getUserByUserIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getUserByUserIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(forgotPasswordByEmailAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(forgotPasswordByEmailAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(forgotPasswordByEmailAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(resetPasswordByRequestTokenAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(resetPasswordByRequestTokenAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          action.payload.success === false &&
          action.payload.msg === 'Invalid Token'
        ) {
          Alert.alert('', action.payload.msg);
        }

        if (
          action.payload.success === true &&
          action.payload.msg === 'Password Changed'
        ) {
          Alert.alert('', action.payload.msg);
          window.location.replace('/signin');
        }
      })

      .addCase(resetPasswordByRequestTokenAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default usersSlice.reducer;
