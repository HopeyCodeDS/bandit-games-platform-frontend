import { useQuery } from '@tanstack/react-query';
import {getAllGameNames} from "../services/getGameNames.ts";

export const useGameNames = () => {
    return useQuery({
        queryKey: ['game-names'],
        queryFn: getAllGameNames
    });
};
