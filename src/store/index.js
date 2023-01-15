import { configureStore } from "@reduxjs/toolkit";
import coverageReducer from './coverageSlice';
import classReducer from "./classSlice";
import scheduleReducer from './scheduleSlice';
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    coverage:coverageReducer,
    class:classReducer,
    schedule: scheduleReducer,
    user: userReducer
  },
});

export default store;