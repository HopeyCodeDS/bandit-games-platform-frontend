import { useMutation } from "@tanstack/react-query";
import { playerLeaveLobby } from "../services/playerLeaveLobby.ts";

export const useLeaveLobby = (userId: string) => {
    return useMutation({
        mutationFn: () => playerLeaveLobby(userId),
    });
};
