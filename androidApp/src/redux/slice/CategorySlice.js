import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert} from 'react-native';
import {BACKEND_HOSTNAME} from '@env';
import {getTokenFromAsyncStorage} from '../../Utils/HelperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HOSTNAME = BACKEND_HOSTNAME;

export const getCategoryAsync = createAsyncThunk('category/get ', async () => {
  try {
    const userObjectAsyncStorage = await AsyncStorage.getItem(
      'loggedUserObject',
    );
    const token = JSON.parse(userObjectAsyncStorage).token;
    const response = await axios.get(`${HOSTNAME}/category/getCategory/`, {
      headers: {Authorization: `${token}`},
    });
    return response.data;
  } catch (error) {
    console.log('getCategoryAsync Error  ', error);
  }
});

export const createCategoryAsync = createAsyncThunk(
  'category/create',
  async ({catName, budget}) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(
        `${HOSTNAME}/category/createCategory/`,
        {
          catName: catName,
          budget: budget,
        },
      );

      return response.data;
    } catch (error) {
      console.log('createCategoryAsync Error  ', error);
    }
  },
);

export const deleteCategoryAsync = createAsyncThunk(
  'category/delete',
  async ({id}) => {
    try {
      console.log('--delete category --> ', id);
      const response = await axios.delete(`${HOSTNAME}/category/delete/${id}`);
      // console.log( response )
      return response.data;
    } catch (error) {
      console.log('deleteCategoryAsync Error  ', error);
    }
  },
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getCategoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createCategoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        // console.log("payload - " , action.payload )
        if (
          action.payload.msg === 'Category Name Already Exist' &&
          action.payload.success === false
        ) {
          Alert.alert('', action.payload.msg);
        }

        if (
          action.payload.msg === 'Category Added' &&
          action.payload.success === true
        ) {
          Alert.alert('', action.payload.msg);
          // console.log( "payload - " ,  action.payload )
          state.data.unshift(action.payload.category);
        }
      })

      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteCategoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
        const {id} = action.meta.arg;

        if (
          action.payload.success === true &&
          action.payload.msg === 'Category Deleted'
        ) {
          Alert.alert('', action.payload.msg);
        }

        const findIndex = state.data.findIndex(data => {
          return data.id === id;
        });

        state.data.splice(findIndex, 1);
      })

      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categorySlice.reducer;
