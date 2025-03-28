import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice.jsx"
const store = configureStore({
    reducer : {
         User : UserSlice
    }  
});

export default store;