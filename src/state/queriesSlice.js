import { createSlice } from "@reduxjs/toolkit";
import { 
    gotToPage, 
    applyFilter, 
    changeId, 
    cleanQuery, 
    makeQueryForCharactersById,
    resetCharacterQuery
} from "./utils/componse-queries";


const initialState = {
    characterQuery: `
    query {
        character(id: 0) {
            id
            name
            status
            species
            type
            gender
            origin {
                name
                type
                dimension
            
            }
            location {
                name
                dimension
                type
                id
            }
            image
            created
            episode {
                name
                id
            }
        }
    }`,
    charactersQuery: `
    query {
        characters(
            page: 1
        ) {
            info {
                pages
                next
                prev
            }
            results {
                id
                name
                image
                species
            }
        }
    }`,
    locationsQuery:  `
    query {
        locations(
            page: 1
        ) {
            info {
                pages
                next
                prev
            }
            results {
                id
                name
                dimension
                created
                residents {
                    id
                }
            }
        }
    }`, 
    episodesQuery:  `
    query {
        episodes(
            page: 1
        ) {
            info {
                pages
                next
                prev
            }
            results {
                id
                name
                air_date
                episode
                created
                characters {
                    id
                }
            }
        }
    }`,
};

const queriesSlice = createSlice({
    name: 'queries',
    initialState,
    reducers: {
        setCharactersQuery: (state, { payload }) => {
            state.charactersQuery = payload;
        },
        setLocationsQuery: (state, { payload }) => {
            state.locationsQuery = payload;
        },   
        setEpisodesQuery: (state, { payload }) => {
            state.episodesQuery = payload;
        },
        getCharacters: (state) => {
            state.charactersQuery = resetCharacterQuery();
        },   
        setCharacterQuery: (state, { payload }) => {
            state.characterQuery = changeId(state.characterQuery, payload.id);
        },      
        goToCharactersPage: (state, { payload }) => {
            state.charactersQuery = gotToPage(state.charactersQuery, payload.page);
        },
        goToLocationsPage: (state, { payload }) => {
            state.locationsQuery = gotToPage(state.locationsQuery, payload.page);
        },
        goToEpisodesPage: (state, { payload }) => {
            state.episodesQuery = gotToPage(state.episodesQuery, payload.page);
        },
        searchCharacters: (state, { payload }) => {
            state.charactersQuery = applyFilter(state.charactersQuery, payload.filter)
        },
        cleanSearch: (state) => {
            state.charactersQuery = cleanQuery(state.charactersQuery)
        },
        getCharactersById: (state, { payload }) => {
            state.charactersQuery = makeQueryForCharactersById(payload.ids);
        }
    }
});


export const { 
    setCharacterQuery,
    setCharactersQuery, 
    setLocationsQuery, 
    setEpisodesQuery,
    getCharacters,
    goToCharactersPage,
    goToLocationsPage,
    goToEpisodesPage,
    searchCharacters,
    cleanSearch,
    getCharactersById,
} = queriesSlice.actions;
export default queriesSlice.reducer;
