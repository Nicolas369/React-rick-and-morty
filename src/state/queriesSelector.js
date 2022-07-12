import { useSelector } from "react-redux";

export const useCharacterQuery = () => useSelector(state => state.queries.characterQuery);

export const useCharactersQuery = () => useSelector( state => {
    return {
        query: state.queries.charactersQuery,
        variables:  state.variables.characters,
    }
});
export const useLocationsQuery = () => useSelector( state => {
    return {
        query: state.queries.locationsQuery,
        variables: state.variables.locations
    }
});
export const useEpisodesQuery = () => useSelector( state => {
    return{
        query: state.queries.episodesQuery,
        variables: state.variables.episodes,
    }
});