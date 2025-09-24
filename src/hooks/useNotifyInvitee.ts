import { useEffect, useState } from "react";
import { IMessage } from "@stomp/stompjs";
import { InviteData } from "../model/inviteData.ts";

const useNotifyInvitee = (
    client: any,
    isConnected: boolean,
    topic: string
): [boolean, InviteData, () => void] => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [inviteData, setInviteData] = useState<InviteData>({
        roomId: "",
        inviterUsername: "",
        gameName: ""
    });

    const closePopup = () => {
        setIsPopupOpen(false);
        setInviteData({
            roomId: "",
            inviterUsername: "",
            gameName: ""
        });
    };

    useEffect(() => {
        if (!client || !isConnected) return;

        client.subscribe(topic, (message: IMessage) => {
            const invitationInfo = JSON.parse(message.body);

            setInviteData({
                roomId: invitationInfo.roomId,
                inviterUsername: invitationInfo.inviterUsername,
                gameName: invitationInfo.gameName,
            });
            setIsPopupOpen(true);
        });

    }, [client, isConnected, topic]);

    return [isPopupOpen, inviteData, closePopup];
};

export default useNotifyInvitee;
