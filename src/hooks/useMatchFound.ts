import {useEffect, useState} from 'react';
import {IMessage} from "@stomp/stompjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMatchFound = (client: any, isConnected: any,topic: string) => {

    const [matchUrl, setMatchUrl] = useState("");


    useEffect(() => {
        if (matchUrl) {
            const timer = setTimeout(() => {
                window.location.assign(matchUrl);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [matchUrl]);

    useEffect(() => {
        if (!client || !isConnected) return;

       client.subscribe(topic, (message: IMessage) => {
            if (message.body) {
                setMatchUrl(message.body);
            }
        });
    }, [client, isConnected,topic]);

    return matchUrl;
};

export default useMatchFound;
