import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import classReducer from "./classSlice";
import absenceReducer from './absenceSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    class:classReducer,
    absence:absenceReducer
  },
});

export default store;