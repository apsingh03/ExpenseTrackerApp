import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = "http://localhost:8000";

export const getReportDownloadAsync = createAsyncThunk(
  "file/download",
  async () => {
    try {
      const token = localStorage.getItem("loggedDataToken");
      const response = await axios.get(`${HOSTNAME}/users/downloadFile/`, {
        headers: { Authorization: `${token}` },
      });
      var a = document.createElement("a");
      a.href = response.data.fileUrl;
      a.download = "myexpense.csv";
      a.click();
      // console.log("slice - ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error  ", error);
    }
  }
);

export const getDownloadHistoryAsync = createAsyncThunk(
  "file/downloadHistory",
  async () => {
    try {
      const token = localStorage.getItem("loggedDataToken");
      const response = await axios.get(`${HOSTNAME}/users/downloadHistory/`, {
        headers: { Authorization: `${token}` },
      });

      // console.log("slice - ", response.data);
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

export const fileDownloadSlice = createSlice({
  name: "fileDownload",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDownloadHistoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getDownloadHistoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getDownloadHistoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getReportDownloadAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getReportDownloadAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        // const { fileUrl } = action.payload;

        state.data.push(action.payload.fileUrl);
      })

      .addCase(getReportDownloadAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default fileDownloadSlice.reducer;
