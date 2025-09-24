import axios from 'axios';
import {PlayerGameStatistic} from "../model/PlayerGameStatistic.ts";

const STATS_URL: string = import.meta.env.VITE_STATS_URL;

export const getStatisticsByGameName = async (gameName: string): Promise<PlayerGameStatistic[]> => {

    const response = await axios.get(`${STATS_URL}/game/${gameName}`);
    return response.data;
};
