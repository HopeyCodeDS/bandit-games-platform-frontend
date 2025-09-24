import { useEffect } from "react";
import { IMessage } from "@stomp/stompjs";

const useInvitationDeclined = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: any,
    isConnected: boolean,
    topic: string,
    onInvitationDeclined: () => void
) => {
    useEffect(() => {
        if (!client || !isConnected) return;

        client.subscribe(topic, (message: IMessage) => {
                onInvitationDeclined();
                console.log(message);
        });

    }, [client, isConnected, topic, onInvitationDeclined]);
};

export default useInvitationDeclined;
