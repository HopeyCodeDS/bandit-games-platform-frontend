import axios from "axios";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL;

export async function inviteFriendToPlay(
    inviterId: string | undefined,
    inviteeId: string | undefined,
    gameId: string | undefined
): Promise<string> {
    const INVITE_FRIEND_TO_PLAY_URL = `${BACKEND_CORE_URL}/invite`;

    const payload = {
        inviterId,
        inviteeId,
        gameId,
    };


    const response = await axios.post(INVITE_FRIEND_TO_PLAY_URL, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}
