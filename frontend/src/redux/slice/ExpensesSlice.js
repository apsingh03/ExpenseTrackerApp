import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = "http://localhost:8000";

export const getExpensesAsync = createAsyncThunk("expenses/get ", async ({currentPage , pageSize}) => {
  try {
    // console.log("----> " ,  fullName , email , password  );
    const token = localStorage.getItem("loggedDataToken");
    const response = await axios.get(`${HOSTNAME}/expense/getExpenses?page=${currentPage}&pageSize=${pageSize}`, {
      headers: { Authorization: `${token}` },
    });

    return response.data;
  } catch (error) {
    console.log("Error  ", error);
  }
});

export const createExpensesAsync = createAsyncThunk(
  "expenses/createExpense",
  async ({ money, description, cat_id }) => {
    try {
      const token = localStorage.getItem("loggedDataToken");
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(
        `${HOSTNAME}/expense/createExpense/`,

        {
          money: money,
          description: description,
          cat_id: cat_id,
        },

        { headers: { Authorization: `${token}` } }
      );

      return response.data;
    } catch (error) {
      console.log("Error  ", error);
    }
  }
);

export const deleteExpensesAsync = createAsyncThunk(
  "expenses/delete",
  async ({ id }) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const token = localStorage.getItem("loggedDataToken");
      const response = await axios.delete(`${HOSTNAME}/expense/delete/${id}`, {
        headers: { Authorization: `${token}` },
      });
      // console.log( response )
      return response.data;
    } catch (error) {
      console.log("Error  ", error);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
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
          action.payload.msg === "Category Budget is over" &&
          action.payload.success === true
        ) {
          alert(action.payload.msg);
        }

        if (
          action.payload.msg === "Expenses Added" &&
          action.payload.success === true
        ) {
          alert(action.payload.msg);
          state.data.unshift(action.payload.expenses);
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
        const { id } = action.meta.arg;

        // console.log("slice delete - " , id );

        if (
          action.payload.msg === "Expense Deleted" &&
          action.payload.success === true
        ) {
          alert(action.payload.msg);
        }

        const findIndex = state.data.expenses.findIndex((data) => {
          return data.id === id;
        });

        state.data.expenses.splice(findIndex, 1);
      })

      .addCase(deleteExpensesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default expensesSlice.reducer;
