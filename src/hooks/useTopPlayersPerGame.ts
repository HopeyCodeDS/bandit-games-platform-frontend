import { useQuery } from '@tanstack/react-query';
import {getTopPlayersPerGame} from "../services/getTopPlayersPerGame.ts";

export const useTopPlayersPerGame = () => {
    return useQuery({
        queryKey: ['top-players-per-game'],
        queryFn: getTopPlayersPerGame,
    });
};
