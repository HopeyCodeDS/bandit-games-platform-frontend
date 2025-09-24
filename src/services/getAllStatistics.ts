import axios from "axios";
import { PlayerGameStatistic } from "../model/PlayerGameStatistic.ts";

const STATS_URL: string = import.meta.env.VITE_STATS_URL;

export const getAllStatistics = async (): Promise<PlayerGameStatistic[]> => {
    const response = await axios.get(`${STATS_URL}/players`);
    return response.data;
};
