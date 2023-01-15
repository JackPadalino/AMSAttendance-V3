import { configureStore } from "@reduxjs/toolkit";
import absenceReducer from './absenceSlice';
import classReducer from "./classSlice";
import scheduleReducer from './scheduleSlice';
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    absence:absenceReducer,
    class:classReducer,
    schedule: scheduleReducer,
    user: userReducer
  },
});

export default store;