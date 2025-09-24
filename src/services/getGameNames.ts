import axios from 'axios';

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL

export const getAllGameNames = async (): Promise<string[]> => {
    const {data} = await axios.get(`${BACKEND_CORE_URL}/store/all-games`);
    return data.map((game: { name: string }) => game.name);
};
