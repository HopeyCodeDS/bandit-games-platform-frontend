import axios from "axios";
// import {addAccessTokenToAuthHeader, getToken} from "./auth.ts";
import Game from "../../model/Game.ts";
import {addAccessTokenToAuthHeader, getToken} from "../auth.ts";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL
const token = getToken() || undefined;  // Convert null to undefined if no token exists
addAccessTokenToAuthHeader(token); // Add the token to the default axios headers if it exists

const formatGameResponse = (game: any): Game => ({
    id: game.id,
    name: game.name,
    description: game.description,
    genre: game.genre,
    price: `$${Number(game.price).toFixed(2)}`,
    releaseDate: game.releaseDate,
    rating: game.rating,
    ageLimit: game.ageLimit,
});

// Fetch a single game by ID
export const fetchGameById = async (id: string): Promise<Game> => {
    const response = await axios.get(`${BACKEND_CORE_URL}/store/single-games/id/${id}`);
    const game = response.data;
    return formatGameResponse(game);
};

// Fetch a single game by name
export const fetchGameByName = async (name: string): Promise<Game> => {
    const response = await axios.get(`${BACKEND_CORE_URL}/store/single-games/name/${name}`);
    const game = response.data;
    return formatGameResponse(game);
};

// Fetch all games from the backend
export const fetchGames = async (): Promise<Game[]> => {
    const response = await axios.get(`${BACKEND_CORE_URL}/store/all-games`);
    return response.data.map(formatGameResponse);
};

// Fetch purchased games for a user
export const fetchPurchasedGames = async (userId: string | undefined): Promise<Game[]> => {
    if (!userId) throw new Error('User not authenticated');

    try {
        const userResponse = await axios.get(`${BACKEND_CORE_URL}/user/id/${userId}`);
        const userData = userResponse.data;

        const purchasedGameNames = Object.keys(userData.gameAchievements || {})
            .map((key) => {
                const match = key.match(/gameName=([\w\s]+)/);
                return match ? match[1].trim() : null;
            })
            .filter((name): name is string => name !== null);

        const allGames = await fetchGames();
        return allGames.filter((game) => purchasedGameNames.includes(game.name));
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) return [];
        throw error;
    }
};

// Upload game metadata to the backend
export const uploadGameMetadata = async (gameData: {
    name: string;
    description: string;
    genre: string;
    price: number;
    releaseDate: string;
    rating: number;
    ageLimit: number;
    url: string;
}): Promise<Game> => {
    try {
        const response = await axios.post(
            `${BACKEND_CORE_URL}/store/uploadGameMetadata`,
            gameData
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading game metadata:", error);
        throw error;
    }
};

// Upload achievements to the backend
export const uploadAchievements = async (achievements: {
    achievements: Array<{
        gameName: string;
        name: string;
        description: string;
        criteria: Array<{
            key: string;
            operator: string;
            value: number;
        }>;
        rewardPoints: number;
    }>;
}): Promise<any> => {
    try {
        const response = await axios.post(
            `${BACKEND_CORE_URL}/achievement/add`,
            achievements
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading achievements:", error);
        throw error;
    }
};