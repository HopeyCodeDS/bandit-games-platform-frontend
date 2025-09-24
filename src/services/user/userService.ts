import axios from "axios";
import {addAccessTokenToAuthHeader, getToken} from "../auth.ts";
import {KeycloakTokenParsed} from "keycloak-js";
import UserRegistrationData from "../../model/UserRegistrationData.ts";
import DemographicsData from "../../model/UserDemographicsData.ts";

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL
const token = getToken() || undefined;  // Convert null to undefined if no token exists
addAccessTokenToAuthHeader(token); // Add the token to the default axios headers if it exists


// Function to check if the user already exists in the backend
async function checkIfUserExists(userId: string, accessToken: string): Promise<boolean> {
    try {
        const response = await axios.get(`${BACKEND_CORE_URL}/user/id/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('User exists in backend:', response.data);
        return true; // User exists
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log('User does not exist in backend.');
            return false; // User does not exist
        }

        console.error('Error checking if user exists:', error);
        throw error; // Re-throw for unexpected errors
    }
}

// Registration function to send user data to the backend
export async function registerUserWithBackend(tokenParsed?: KeycloakTokenParsed) {
    if (!tokenParsed) {
        throw new Error('Invalid tokenParsed object. Cannot register user.');
    }
    try {
        const accessToken = getToken();
        if (!accessToken) {
            throw new Error('Access token is missing. User is not authenticated.');
        }

        const userData: UserRegistrationData = {
            userId: tokenParsed.sub || 'unknown-id',
            username: tokenParsed.preferred_username || 'unknown',
            email: tokenParsed.email || 'unknown@example.com',
            firstName: tokenParsed.given_name || 'Unknown',
            lastName: tokenParsed.family_name || 'Unknown',
        };

        // Add a flag or state to track user registration status
        const userExists = await checkIfUserExists(userData.userId, accessToken)
            .catch(error => {
                // Handle network errors or unexpected issues
                console.error('Error checking user existence:', error);
                return false; // Assume user needs registration
            });

        if (!userExists) {
            const response = await axios.post(`${BACKEND_CORE_URL}/user/signup`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // StorePage registration status in local storage or state management
            localStorage.setItem(`user_${userData.userId}_registered`, 'true');

            console.log('User registration successful:', response.data);
            return response.data;
        }

        return null;
    } catch (error) {
        console.error('Failed to register user with backend:', error);
        throw error;
    }
}


// Update user demographics in the backend
export const updateUserDemographics = async (data: DemographicsData) => {
    const token = getToken();
    if (!token) {
        throw new Error('No authorization token found');
    }

    await axios.put(
        `${BACKEND_CORE_URL}/user/update-demographics`,
        data,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    );
    // Add a small delay to ensure backend processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fetch and return the updated profile
    return await fetchUserProfile(data.userId);
};

// Fetch user profile from the backend
export async function fetchUserProfile(userId: string | undefined) {
    try {
        return await fetchWithRetry(`${BACKEND_CORE_URL}/user/id/${userId}`, 3, 1000);
    } catch (error) {
        console.error('Failed to fetch user profile after retries:', error);
        throw error;
    }
}

const fetchWithRetry = async (url: string, retries = 3, delay = 1000): Promise<any> => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed. Retrying...`);
            if (attempt === retries - 1) throw error;
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
};