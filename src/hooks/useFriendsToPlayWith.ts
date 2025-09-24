import { useMutation } from "@tanstack/react-query";
import {friendsToPlayWith} from "../services/friendsToPlayWith.ts";

export const useFriendsToPlayWith = (userId: string, gameId: string) => {
    return useMutation({
        mutationFn: () => friendsToPlayWith(userId, gameId),
        onSuccess: (data) => {
            console.log("friends successfully retrieved", data);
        },
        onError: (error: Error) => {
            console.error("Error when looking for friends:", error);
        },
    });
};
