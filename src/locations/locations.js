import { ReactLocation } from "@tanstack/react-location";
import Character from "../pages/character";
import Characters from "../pages/characters";
import Episodes from "../pages/episodes";
import Home from "../pages/home";
import Locations from "../pages/locations";

export const location = new ReactLocation();

export const routes = [
    {path: '/', element: <Home /> },
    {path: 'characters', element: <Characters /> },
    {path: 'locations', element: <Locations /> },
    {path: 'episodes', element: <Episodes /> },
    {path: 'character/:characterId', element: <Character />},
];  