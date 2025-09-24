import {ReactNode, useEffect, useState} from 'react';
import SecurityContext from './SecurityContext';
import Keycloak from 'keycloak-js';
import axios from "axios";
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader, storeToken} from "../services/auth.ts";
import {useNavigate} from 'react-router-dom';
import {Box, CircularProgress} from '@mui/material';
import {useUserProfile} from "../hooks/useUserProfile.ts";
import {registerUserWithBackend} from "../services/user/userService.ts";


interface IWithChildren {
    children: ReactNode; // this represent a react component or an html element.
}

// in the following lines I have added the keycloak configuration for connecting to the authentication server and later extracting the user information from the token and use this information to persisit a new user to the database in the backend application
// please dont change the following setting developers!
const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
};

// initialization of the KC
const keycloak: Keycloak = new Keycloak(keycloakConfig);

// Create axios interceptor to add token
axios.interceptors.request.use(async (config) => {
    if (keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
});


export default function SecurityContextProvider({children}: IWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<{ name: string; userId: string; roles: string[] } | undefined>(
        undefined
    );
    const [isInitialized, setIsInitialized] = useState(false);
    const navigate = useNavigate();
    const {data: userProfile} = useUserProfile(loggedInUser?.userId);
    const isProfileComplete: boolean = !!userProfile?.birthDate && !!userProfile?.country && !!userProfile?.gender;


    useEffect(() => {
        const initializeKeycloak = async () => {
            try {


                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    checkLoginIframe: false, // Disable iframe checking
                    pkceMethod: 'S256', // Enable PKCE
                });

                if (authenticated) {
                    const token = keycloak.token!;
                    storeToken(token);
                    addAccessTokenToAuthHeader(token);


                    const tokenParsed = keycloak.tokenParsed;
                    const name = tokenParsed?.given_name as string;
                    const userId = tokenParsed?.sub as string;
                    const roles = tokenParsed?.realm_access?.roles || [];

                    setLoggedInUser({name, userId, roles});

                    if (!isProfileComplete &&
                        !location.pathname.includes('/profile') &&
                        (location.pathname === '/' || location.pathname === '/profile')) {
                        navigate('/profile');
                    }

                    // Set up token refresh handling
                    keycloak.onTokenExpired = () => {
                        console.log('Token expired, attempting to refresh...');
                        keycloak.updateToken(-1)
                            .then((refreshed) => {
                                if (refreshed) {
                                    const newToken = keycloak.token!;
                                    console.log('Token refreshed successfully');
                                    storeToken(newToken);
                                    addAccessTokenToAuthHeader(newToken);
                                }
                            })
                            .catch((error) => {
                                console.error('Failed to refresh token:', error);
                                setLoggedInUser(undefined);
                                navigate('/');
                            });
                    };

                    console.log('Registering user if necessary...');
                    await registerUserWithBackend(tokenParsed);
                } else {
                    // Check if we have stored authentication state
                    const storedAuth = sessionStorage.getItem('isAuthenticated');
                    const storedUserData = sessionStorage.getItem('userData');

                    if (storedAuth === 'true' && storedUserData) {
                        setLoggedInUser(JSON.parse(storedUserData));
                    }
                }
                setIsInitialized(true);

            } catch (error) {
                console.error('Keycloak initialization failed:', error);
                setIsInitialized(true);
            }
        };

        initializeKeycloak();

        const refreshInterval = setInterval(() => {
            if (keycloak.authenticated) {
                keycloak.updateToken(60) // Refresh when less than 30 seconds remaining
                    .then((refreshed) => {
                        if (refreshed) {
                            const newToken = keycloak.token!;
                            console.log('Token refreshed during interval check');
                            storeToken(newToken);
                            addAccessTokenToAuthHeader(newToken);
                        }
                    })
                    .catch((error) => {
                        console.error('Token refresh failed during interval:', error);
                        setLoggedInUser(undefined);
                        navigate('/');
                    });
            }
        }, 60000); // Check every 30 seconds

        return () => clearInterval(refreshInterval);
    }, [isProfileComplete]);


    const logout = async (callback?: () => void) => {
        try {
            // Clear stored auth state
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('userData');

            const redirectUri = import.meta.env.VITE_LOGOUT;
            await keycloak.logout({redirectUri});
            setLoggedInUser(undefined);
            removeAccessTokenFromAuthHeader();
            if (callback) callback();

        } catch (error) {
            console.error("Keycloak logout failed", error);
        }

    };

    const login = async () => {
        try {
            await keycloak.login();
        } catch (error) {
            console.error("Keycloak login failed", error);
        }
    };


    const register = async () => {
        try {
            await keycloak.register();
        } catch (error) {
            console.error("Keycloak registration failed", error);
        }
    };

    const getUserId = () => loggedInUser?.userId;

    if (!isInitialized) {
        return (
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1A1A1A', // Matching your navbar gradient
                zIndex: 9999
            }}>
                <CircularProgress sx={{
                    color: '#FFD700' // Matching your gold color theme
                }}/>
            </Box>
        );
    }


    return (
        <SecurityContext.Provider value={{
            isAuthenticated: () => !!loggedInUser,
            loggedInUser,
            login,
            logout,
            register,
            getUserId,
            keycloak,
            isProfileComplete,
        }}>
            {children}
        </SecurityContext.Provider>
    );
}
