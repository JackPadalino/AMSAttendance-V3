import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  allUsers:[]
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state, action) => {
      state.user = {};
    },
    setAllUsers:(state,action)=>{
      state.allUsers=action.payload;
    },
    addNewUser: (state, action) => {
      state.allUsers.push(action.payload);
    }
  }
});

export const {
  setUser,
  resetUser,
  setAllUsers,
  addNewUser
} = userSlice.actions;

export default userSlice.reducer;