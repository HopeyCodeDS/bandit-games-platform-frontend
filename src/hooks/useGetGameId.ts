import { getGameId } from "../services/getGameId.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetGameId = (userId: string | undefined, gameName: string) => {
    return useQuery({
        queryKey: ["gameId", "Battleship"],
        queryFn: () => getGameId(gameName),
        enabled: !!userId,
    });
};
