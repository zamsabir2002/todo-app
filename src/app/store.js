import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";

// Pass in all reducer (for now only 1 is needed)
export const store = configureStore({
    reducer: {
        //todo Reducer
        todo: todoReducer
    }
})
