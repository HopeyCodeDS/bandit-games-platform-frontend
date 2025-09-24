import axios from "axios";
import {addAccessTokenToAuthHeader, getToken} from "../auth.ts";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL
const token = getToken() || undefined;  // Convert null to undefined if no token exists
addAccessTokenToAuthHeader(token); // Add the token to the default axios headers if it exists


// Search for a user by username
export const searchUserByUsername = async (username: string): Promise<any> => {
    try {
        const response = await axios.get(
            `${BACKEND_CORE_URL}/user/username/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error searching for user:', error);
        throw error;
    }
};

// Add a friend
export const addFriend = async (userId: string, friendId: string): Promise<any> => {
    if (!userId || !friendId) {
        throw new Error('Both userId and friendId are required');
    }
    try {
        const response = await axios.post(
            `${BACKEND_CORE_URL}/user/add-friend`,
            {userId, friendId},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding friend:', error);
        throw error;
    }
};

// Remove a friend
export const removeFriend = async (userId: string, friendId: string): Promise<any> => {
    try {
        const response = await axios.post(
            `${BACKEND_CORE_URL}/user/remove-friend`,
            {userId, friendId},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error removing friend:', error);
        throw error;
    }
};