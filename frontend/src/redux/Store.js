import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slice/UsersSlice";
import signinSlice from "./slice/SignInSlice";
import categorySlice from "./slice/CategorySlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    signIn: signinSlice,
    category: categorySlice,
  },
});
