import { createSlice } from "@reduxjs/toolkit";
import { 
    makeQueryForCharactersById,
    resetCharacterQuery,
    getCharactersSearchQuery
} from "./utils/componse-queries";  


const initialState = {
    characterQuery: `
    query GetCharacter($id: ID = 1) {
        character(id: $id) {
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
    query GetCharacters($page: Int = 1) {
        characters(page: $page) {
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
    query GetLocations($page: Int = 1) {
        locations(page: $page) {
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
    query GetEpisodes($page: Int = 1) {
        episodes(page: $page) {
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
        searchCharacters: (state) => {
            state.charactersQuery = getCharactersSearchQuery();
        },
        getCharactersById: (state) => {
            state.charactersQuery = makeQueryForCharactersById();
        }
    }
});


export const { 
    setCharacterQuery,
    setCharactersQuery, 
    setLocationsQuery, 
    setEpisodesQuery,
    getCharacters,
    searchCharacters,
    cleanSearch,
    getCharactersById,
} = queriesSlice.actions;
export default queriesSlice.reducer;
