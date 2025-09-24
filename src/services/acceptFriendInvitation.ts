import axios from "axios";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL;

export async function acceptFriendInvitation(roomId: string, playerId: string) {
    const ACCEPT_FRIEND_INVITATION_URL = `${BACKEND_CORE_URL}/accept-invite`;

    const payload = {
        roomId,
        playerId,
    };

    return await axios.post(ACCEPT_FRIEND_INVITATION_URL, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
