import { configureStore } from "@reduxjs/toolkit";
import queriesReducer from "./queriesSlice"; 
import variablesReducer from './variablesSlice';

export const store = configureStore({
    reducer: {
        queries: queriesReducer,
        variables: variablesReducer,
    }
})