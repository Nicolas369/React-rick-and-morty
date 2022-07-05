import { useSelector } from "react-redux";

export const useCharacterQuery = () => useSelector( state => state.queries.characterQuery );
export const useCharactersQuery = () => useSelector( state => state.queries.charactersQuery );
export const useLocationsQuery = () => useSelector( state => state.queries.locationsQuery );
export const useEpisodesQuery = () => useSelector( state => state.queries.episodesQuery );