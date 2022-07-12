import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locations: { page: 1 },
    episodes: { page: 1 },
    characters: { page: 1 },
}

const variableSlice = createSlice({
    name: 'variables',
    initialState,
    reducers: {
        setLocationsPage: (state, { payload }) => {
            state.locations.page = payload.page;
        },
        setCharactersPage: (state, { payload }) => {
            state.characters.page = payload.page ;
        },
        setEpisodesPage: (state, { payload }) => {
            state.episodes.page = payload.page;
        },
        setCharactersIds: (state, { payload }) => {
            state.characters = {
                ids: payload.ids
            }
        },
        setFilterForSearchCharacters: (state, { payload }) => {
            state.characters = {
                page: 1,
                filter: payload.filter,
            }
        },
        resetCharactersVariables: (state) => {
            state.characters = { page: 1 };
        }
    }
});

export const { 
    setLocationsPage,
    setCharactersPage,
    setEpisodesPage,
    setCharactersIds,
    setFilterForSearchCharacters,
    resetCharactersVariables,
} = variableSlice.actions;
export default variableSlice.reducer;