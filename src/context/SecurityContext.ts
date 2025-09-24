import {createContext} from 'react';
import Keycloak from "keycloak-js";

export interface ISecurityContext {
    isAuthenticated: () => boolean;
    loggedInUser: {
        name: string;
        userId: string;
        roles: string[];
    } | undefined;
    login: () => Promise<void>;
    logout: (callback?: () => void) => void;
    register: () => Promise<void>;
    getUserId: () => string | undefined;
    keycloak?: Keycloak;
    isProfileComplete: boolean;
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    login: async () => {
    },
    logout: () => {
    },
    register: async () => {
    },
    getUserId: () => undefined,
    isProfileComplete: false,
});
