import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = "http://localhost:8000";

export const getAllUsersAsync = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/users/getUsers/`);
    return response.data;
  } catch (error) {
    console.log("Error  ", error);
  }
});

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async ({ fullName, email, password }) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(`${HOSTNAME}/users/createUser/`, {
        fullName: fullName,
        email: email,
        password: password,
      });

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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
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

      .addCase(createUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
        if (
          action.payload.success === false &&
          action.payload.msg === "User Already Exist"
        ) {
          alert(action.payload.msg);
        }

        if (
          action.payload.success === true &&
          action.payload.msg === "Sign Up Successful"
        ) {
          alert(action.payload.msg);
        }

        state.data = action.payload;
        // console.log("payload - ", action.payload )
      })

      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default usersSlice.reducer;
