import axios from "axios";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL;

export async function playerLeaveLobby(playerId: string) {

    const SEND_PLAYER_TO_LOBBY_URL = `${BACKEND_CORE_URL}/leave-lobby-queue?playerId=${playerId}`;

    return await axios.post<boolean>(SEND_PLAYER_TO_LOBBY_URL, null, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


