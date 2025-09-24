import axios from 'axios';
import { TopPlayersPerGame } from '../model/TopPlayersPerGame.ts';

const STATS_URL: string = import.meta.env.VITE_STATS_URL;

export const getTopPlayersPerGame = async (): Promise<TopPlayersPerGame[]> => {
    const response = await axios.get(`${STATS_URL}/top-players`);
    return response.data.games;
};
