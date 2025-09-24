import axios from 'axios';

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL;

export const getGameId = async (gameName: string): Promise<string> => {
    const { data } = await axios.get(`${BACKEND_CORE_URL}/store/single-games/name/${gameName}`);
    return data.id;
};
