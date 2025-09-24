import axios from 'axios';
import { MostPlayedGames } from "../model/MostPlayedGames.ts";

const STATS_URL: string = import.meta.env.VITE_STATS_URL;

export const getMostPlayedGames = async (): Promise<MostPlayedGames[]> => {
    const { data } = await axios.get(`${STATS_URL}/most-played-games`);

    return data.slice(0, 5).map(({ game_name, total_matches }: { game_name: string, total_matches: number }) => ({
        gameName: game_name,
        timesPlayed: total_matches,
    }));
};