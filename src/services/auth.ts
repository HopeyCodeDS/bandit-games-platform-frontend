import axios from 'axios';

interface JWTPayload {
    sub?: string;
    userId?: string;
    exp: number;
}

// In-memory token storage
let currentToken: string | null = null;

export function getUserId(token: string | null): string | null {
    try {
        if (!token) {
            console.warn('No token provided.');
            return null;
        }

        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64)) as JWTPayload;
        const userId = payload.sub || payload.userId;

        if (!userId) {
            console.warn('No user ID found in token payload.');
            return null;
        }

        return userId;
    } catch (error) {
        console.error('Failed to extract user ID from token:', error);
        return null;
    }
}

export function storeToken(token: string) {
    try {
        currentToken = token;
        console.log('Token stored in memory.');
    } catch (error) {
        console.error('Failed to store the token:', error);
    }
}

export function getToken(): string | null {
    return currentToken;
}

export function addAccessTokenToAuthHeader(token: string | undefined) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Token attached to axios headers.');
    } else {
        removeAccessTokenFromAuthHeader();
        console.warn('No token provided; headers cleared.');
    }
}

export function removeAccessTokenFromAuthHeader() {
    try {
        delete axios.defaults.headers.common['Authorization'];
        currentToken = null;
        console.log('Token removed from headers and memory.');
    } catch (error) {
        console.error('Failed to remove the token from headers:', error);
    }
}

export function isTokenExpired(token: string): boolean {
    try {
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        const exp = payload.exp * 1000;
        const now = Date.now();
        return now > exp;
    } catch (error) {
        console.error('Failed to parse the token for expiration check:', error);
        return true;
    }
}

export async function refreshToken(refreshTokenUrl: string): Promise<string | null> {
    try {
        const token = currentToken;
        if (!token || isTokenExpired(token)) {
            console.warn('Token is expired or not available; attempting to refresh.');
            const response = await axios.post(refreshTokenUrl, {token});
            const newToken = response.data.token;
            storeToken(newToken);
            addAccessTokenToAuthHeader(newToken);
            return newToken;
        }
        console.log('Token is still valid; no refresh needed.');
        return token;
    } catch (error) {
        console.error('Failed to refresh the token:', error);
        return null;
    }
}