import { useQuery } from '@tanstack/react-query';
import {getStatisticsByGameName} from "../services/getStatisticsByGameName.ts";

export const useStatisticsByGameName = (filterValue:string, filterByGameName: boolean) => {
    return useQuery({
        queryKey: ['statistics-game-name'],
        queryFn: () => getStatisticsByGameName(filterValue),
        enabled: filterByGameName,
    });
};
