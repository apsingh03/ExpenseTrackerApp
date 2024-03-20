import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert} from 'react-native';
import {BACKEND_HOSTNAME} from '@env';
import {getTokenFromAsyncStorage} from '../../Utils/HelperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HOSTNAME = BACKEND_HOSTNAME;

export const getExpensesAsync = createAsyncThunk(
  'expenses/get ',
  async ({currentPage, pageSize}) => {
    try {
      const userObjectAsyncStorage = await AsyncStorage.getItem(
        'loggedUserObject',
      );
      const token = JSON.parse(userObjectAsyncStorage).token;

      const response = await axios.get(
        `${HOSTNAME}/expense/getExpenses?page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {Authorization: `${token}`},
        },
      );

      return response.data;
    } catch (error) {
      console.log('getExpensesAsync Error  ', error);
    }
  },
);

export const getExpensesByDatesAsync = createAsyncThunk(
  'expenses/getbyDate ',
  async ({startDate, endDate, currentPage, pageSize, user_id}) => {
    try {
      const userObjectAsyncStorage = await AsyncStorage.getItem(
        'loggedUserObject',
      );
      const token = JSON.parse(userObjectAsyncStorage).token;

      const response = await axios.get(
        `${HOSTNAME}/expense/getExpensesByDates?user_id=${user_id}&startDate=${startDate}&endDate=${endDate}&page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {Authorization: `${token}`},
        },
      );
      return response.data;
    } catch (error) {
      console.log('getExpensesByDatesAsync Error  ', error);
    }
  },
);

export const createExpensesAsync = createAsyncThunk(
  'expenses/createExpense',
  async ({money, description, cat_id}) => {
    try {
      const userObjectAsyncStorage = await AsyncStorage.getItem(
        'loggedUserObject',
      );
      const token = JSON.parse(userObjectAsyncStorage).token;

      const response = await axios.post(
        `${HOSTNAME}/expense/createExpense/`,

        {
          money: money,
          description: description,
          cat_id: cat_id,
        },

        {headers: {Authorization: `${token}`}},
      );

      return response.data;
    } catch (error) {
      console.log('createExpensesAsync Error  ', error);
    }
  },
);

export const deleteExpensesAsync = createAsyncThunk(
  'expenses/delete',
  async ({id}) => {
    try {
      console.log('Delete expense ');
      const userObjectAsyncStorage = await AsyncStorage.getItem(
        'loggedUserObject',
      );
      const token = JSON.parse(userObjectAsyncStorage).token;

      const response = await axios.delete(`${HOSTNAME}/expense/delete/${id}`, {
        headers: {Authorization: `${token}`},
      });
      // console.log( response )
      return response.data;
    } catch (error) {
      console.log('deleteExpensesAsync Error  ', error);
    }
  },
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getExpensesAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getExpensesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getExpensesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createExpensesAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createExpensesAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        // console.log("payload - ", action.payload);

        if (
          action.payload.msg === 'Category Budget is over' &&
          action.payload.success === true
        ) {
          Alert.alert('', action.payload.msg);
        }

        if (
          action.payload.msg === 'Expenses Added' &&
          action.payload.success === true
        ) {
          Alert.alert('', action.payload.msg);
          state.data.expenses.unshift(action.payload.expenses);
        }
      })

      .addCase(createExpensesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteExpensesAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteExpensesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
        const {id} = action.meta.arg;

        // console.log("slice delete - " , id );

        if (
          action.payload.msg === 'Expense Deleted' &&
          action.payload.success === true
        ) {
          Alert.alert('', action.payload.msg);
        }

        const findIndex = state.data.expenses.findIndex(data => {
          return data.id === id;
        });

        state.data.expenses.splice(findIndex, 1);
      })

      .addCase(deleteExpensesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getExpensesByDatesAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getExpensesByDatesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getExpensesByDatesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default expensesSlice.reducer;
