import axios from "axios";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL;

export async function friendsToPlayWith(userId: string, gameId: string){
    const FRIENDS_TO_PLAY_WITH_URL = `${BACKEND_CORE_URL}/user/friends-with-same-games`;

    const payload = {
        userId,
        gameId,
    };

    const { data } = await axios.post(FRIENDS_TO_PLAY_WITH_URL, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return data;
}
