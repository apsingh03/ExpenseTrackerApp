import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const HOSTNAME = "http://localhost:8000";

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const response = await axios.post(`${HOSTNAME}/users/loginUser/`, {
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
  loggedData: {
    isUserLogged:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).isUserLogged
        : null,
    id:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).id
        : null,
    fullName:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).fullName
        : null,
    email:
      localStorage.getItem("loggedDataToken") !== null
        ? jwtDecode(localStorage.getItem("loggedDataToken")).email
        : null,
  },
};

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;

        if (
          action.payload.msg === "Logged In Successfully" &&
          action.payload.success === true
        ) {
          alert(action.payload.msg);

          localStorage.setItem("loggedDataToken", action.payload.token);
          window.location.replace("/");
        }

        if (
          action.payload.msg === "Password Wrong" &&
          action.payload.success === false
        ) {
          alert(action.payload.msg);
        }

        if (
          action.payload.msg === "User Does Not Exist" &&
          action.payload.success === false
        ) {
          alert(action.payload.msg);
        }

        state.data = action.payload;
      })

      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default signinSlice.reducer;
