import { useQuery } from '@tanstack/react-query';
import {getStatisticsByPlayerName} from "../services/getStatisticsByPlayerName.ts";

export const useStatisticsByPlayerName = (filterValue:string, filterByPlayerName: boolean) => {
    return useQuery({
        queryKey: ['statistics-player-name'],
        queryFn: () => getStatisticsByPlayerName(filterValue),
        enabled: filterByPlayerName,
    });
};
