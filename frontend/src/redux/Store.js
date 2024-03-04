import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slice/UsersSlice";
import signinSlice from "./slice/SignInSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    signIn: signinSlice,
  },
});
