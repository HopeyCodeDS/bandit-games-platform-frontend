import { useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import {getToken} from "../services/auth.ts";

export const useStompClient = (brokerURL: string) => {
    const [client] = useState(() =>
        new StompJs.Client({
            brokerURL,
            connectHeaders: { Authorization: `Bearer ${getToken()}` },
        })
    );

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const activateClient = async () => {
            client.onConnect = () => {
                console.log("STOMP Connection established.");
                setIsConnected(true);
            };


            client.onStompError = (frame) => {
                console.error("STOMP error:", frame.headers["message"]);
                console.error("Details:", frame.body);
            };

            try {
                client.activate();
            } catch (error) {
                console.error("Failed to activate STOMP client:", error);
            }
        };

        activateClient();

        return () => {
            client.deactivate();
        };
    }, [client]);

    console.log(isConnected)
    return { client, isConnected };
};
