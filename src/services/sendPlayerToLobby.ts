import axios from "axios";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL;

export async function sendPlayerToLobby(playerId: string | undefined, gameId: string) {
    const SEND_PLAYER_TO_LOBBY_URL = `${BACKEND_CORE_URL}/join-lobby-queue`;

    const payload = {
        playerId,
        gameId,
    };

    const { data } = await axios.post<boolean>(SEND_PLAYER_TO_LOBBY_URL, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}


