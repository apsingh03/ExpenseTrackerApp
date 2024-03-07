import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slice/UsersSlice";
import signinSlice from "./slice/SignInSlice";
import categorySlice from "./slice/CategorySlice";
import expensesSlice from "./slice/ExpensesSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    signIn: signinSlice,
    category: categorySlice,
    expenses: expensesSlice,
  },
});
