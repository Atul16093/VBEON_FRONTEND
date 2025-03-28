import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "UserSlice",
  initialState: {
    user: {},
    token: null,
    message: "",
    isLoggedIn: false,
  },
  reducers : {
    setUser : (state , action)=>{
      console.log(action.payload);
        state.user = action.payload.user,
        state.token = action.payload.token,
        state.message = action.payload.message,
        state.isLoggedIn = true
    },
    unSetUser : (state , action)=>{
      state.user = null,
      state.token = null,
      state.isLoggedIn = false
    }
  }
});
export const {setUser , unSetUser} = slice.actions;
export default slice.reducer;
