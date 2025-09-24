import { useMutation } from "@tanstack/react-query";
import {declineFriendInvitation} from "../services/declineFriendInvitation.ts";

export const useDeclineFriendInvitation = (roomId: string, playerId: string) => {
    return useMutation({
        mutationFn: () => declineFriendInvitation(roomId, playerId),
        onSuccess: (data) => {
            console.log("Invitation declined successfully!", data);
        },
        onError: (error: Error) => {
            console.error("Failed to decline invitation:", error);
        },
    });
};
