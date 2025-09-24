import {useEffect, useState} from "react";
import { IMessage } from "@stomp/stompjs";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useReceiveMessageFromChatbot = (client: any, isConnected: boolean, playerId: string | undefined) => {

    const [response, setResponse] = useState("");
    useEffect(() => {

        if(isConnected && client) {
            client.subscribe(`/user/${playerId}/chat`, (message: IMessage) => {

                const data = JSON.parse(message.body);
                setResponse(data.message);

            });
            console.log(`Subscribed to chat topic: ${playerId}` );
        }
    }, [isConnected, client,playerId]);

    return response
};

export default useReceiveMessageFromChatbot;
