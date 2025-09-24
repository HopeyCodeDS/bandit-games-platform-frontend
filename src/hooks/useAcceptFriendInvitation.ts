import { useMutation } from "@tanstack/react-query";
import { acceptFriendInvitation } from "../services/acceptFriendInvitation.ts";

export const useAcceptFriendInvitation = (roomId: string, playerId: string) => {
    return useMutation({
        mutationFn: () => acceptFriendInvitation(roomId, playerId),
        onSuccess: (data) => {
            console.log("Invitation accepted successfully!", data);
        },
        onError: (error: Error) => {
            console.error("Failed to accept invitation:", error);
        },
    });
};
