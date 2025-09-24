import { useState, useContext } from "react";
import { useMutation} from "@tanstack/react-query";
import SecurityContext from "../context/SecurityContext.ts";
import { sendPlayerToLobby } from "../services/sendPlayerToLobby.ts";

const usePlayNow = (gameId: string | undefined) => {
    const { login, loggedInUser } = useContext(SecurityContext);
    const [showPopup, setShowPopup] = useState(false);


    const { mutate: handlePlayNowClick } = useMutation({
        mutationFn: async () => {
            if (!gameId) throw new Error("User ID or Game ID is missing.");
            return sendPlayerToLobby(loggedInUser?.userId, gameId);
        },
        onSuccess: () => setShowPopup(true),
        onError: () => console.log("There was an error while trying to be in the lobby"),
    });

    const handlePlayNow = () => {
        if (loggedInUser?.userId || loggedInUser) {
            handlePlayNowClick();
        } else {
            login();
        }
    };

    return { handlePlayNow: handlePlayNow, showPopup, setShowPopup };
};

export default usePlayNow;
