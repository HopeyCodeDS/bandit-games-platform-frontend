import { createContext, ReactNode, useContext } from 'react';
import { useStompClient } from "../hooks/useStompClient.ts";
import useMatchFound from "../hooks/useMatchFound.ts";
import SecurityContext from "./SecurityContext.ts";
import useNotifyInvitee from "../hooks/useNotifyInvitee.ts";
import {InviteData} from "../model/inviteData.ts";

interface StompContextProps {
    matchUrl: string | undefined;
    isPopupOpen: boolean;
    inviteData: InviteData;
    closePopup: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: any;
    isConnected: boolean;
}

const StompContext = createContext<StompContextProps | undefined>(undefined);

export const StompContextProvider = ({ children }: { children: ReactNode }) => {
    const { loggedInUser } = useContext(SecurityContext);
    const { client, isConnected } = useStompClient(`wss://${import.meta.env.VITE_WEBSOCKET}/api/wss`);

    const matchUrl = useMatchFound(client, isConnected, `/user/${loggedInUser?.userId}/match`);
    const [isPopupOpen, inviteData, closePopup] = useNotifyInvitee(client, isConnected, `/user/${loggedInUser?.userId}/invitation`);

    return (
        <StompContext.Provider
            value={{
                matchUrl,
                isPopupOpen,
                inviteData,
                closePopup,
                client, 
                isConnected,
            }}
        >
            {children}
        </StompContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStompContext = () => {
    const context = useContext(StompContext);
    if (!context) {
        throw new Error('useStompContext must be used within a StompContextProvider');
    }
    return context;
};
