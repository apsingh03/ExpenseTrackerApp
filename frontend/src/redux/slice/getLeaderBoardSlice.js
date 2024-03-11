import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = "http://localhost:8000";

export const getLeaderBoardAsync = createAsyncThunk(
  "leaderboard/get ",
  async () => {
    try {
      // console.log("----> " ,  fullName , email , password  );
      const token = localStorage.getItem("loggedDataToken");
      const response = await axios.get(
        `${HOSTNAME}/premium/getUserLeaderboard/`,
        {
          headers: { Authorization: `${token}` },
        }
      );

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

export const leaderBoardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getLeaderBoardAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getLeaderBoardAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getLeaderBoardAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default leaderBoardSlice.reducer;
