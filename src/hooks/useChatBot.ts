import { useState, useCallback } from "react";

export const useChatBot = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: any,
    isConnected: boolean,
    message: string,
    playerId: string | undefined
) => {
    const [error, setError] = useState("");

    const sendMessage = useCallback(async () => {

        if(client && isConnected) {
            client.publish({
                destination: "/app/chat",
                body: JSON.stringify({message, playerId}),
            });

            console.log("Question sent through websockets")
        }
        else{
            setError("A response could not be generated")
        }

    }, [client, isConnected, message, playerId]);

    return {
        sendMessage,
        error,
    };
};
