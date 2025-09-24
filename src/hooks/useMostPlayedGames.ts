import { useQuery } from '@tanstack/react-query';
import {getMostPlayedGames} from "../services/getMostPlayedGames.ts";

export const useMostPlayedGames = () => {
    return useQuery({
        queryKey: ['most-played-games'],
        queryFn: getMostPlayedGames,
    });
};
