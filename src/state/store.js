import { configureStore } from "@reduxjs/toolkit";
import queriesReducer from "./queriesSlice"; 

export const store = configureStore({
    reducer: {
        queries: queriesReducer
    }
})