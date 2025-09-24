import { useQuery } from '@tanstack/react-query';
import {getAllStatistics} from "../services/getAllStatistics.ts";

export const useStatistics = (filter:string) => {
    return useQuery({
        queryKey: ['statistics'],
        queryFn: () => getAllStatistics(),
        enabled: filter === ""
    });
};
