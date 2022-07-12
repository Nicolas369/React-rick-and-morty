import { useSelector } from "react-redux";
import { useLocation } from "@tanstack/react-location";

export const useCharacterQuery = () => {
    const queries = useSelector(state => state.queries);
    const location = useLocation();

    return {
        query: queries.characterQuery,
        variables: { id: location.current.href.split('/').pop() },
    }
};

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