import { useMutation } from "@tanstack/react-query";
import { inviteFriendToPlay } from "../services/inviteFriendToPlay.ts";
import {useState} from "react";

const useInviteFriendToPlay = (
    inviterId: string | undefined,
    inviteeId: string | undefined,
    gameId: string | undefined
) => {

    const [roomId, setRoomId] = useState("");
    const { mutateAsync: handleInviteFriend } = useMutation({
        mutationFn: async () => {
            return await inviteFriendToPlay(inviterId, inviteeId, gameId);
        },
        onSuccess: (data) => {
            console.log("Invitation was successfully sent:", data);
        },
        onError: (error) => {
            console.error("There was an error while trying to invite a friend:", error);
        },
    });

    const handleFriendChosenToPlay = async () => {

        const response = await handleInviteFriend();
        setRoomId(response);
        return roomId;
    };

    return { handleFriendChosenToPlay, roomId };
};

export default useInviteFriendToPlay;
