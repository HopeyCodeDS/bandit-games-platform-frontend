import axios from "axios";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL;

export async function declineFriendInvitation(roomId: string, playerId: string) {
    const DECLINE_FRIEND_INVITATION_URL = `${BACKEND_CORE_URL}/decline-invite`;

    const payload = {
        roomId,
        playerId,
    };

    return await axios.post(DECLINE_FRIEND_INVITATION_URL, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
