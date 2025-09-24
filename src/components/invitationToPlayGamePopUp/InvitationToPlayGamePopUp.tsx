import {
    Dialog,
    DialogActions,
    DialogTitle,
    Button,
    Box,
} from "@mui/material";
import { useAcceptFriendInvitation } from "../../hooks/useAcceptFriendInvitation.ts";
import { useDeclineFriendInvitation } from "../../hooks/useDeclineFriendInvitation.ts";
import { useStompContext } from "../../context/StompContext.tsx";
import { useContext, useEffect, useState } from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import useInvitationDeclined from "../../hooks/useInvitationDeclined.ts";

const InvitationToPlayGamePopUp: React.FC = () => {
    const { isPopupOpen, inviteData, closePopup } = useStompContext();
    const { loggedInUser } = useContext(SecurityContext);
    const { client, isConnected } = useStompContext();

    const [roomId, setRoomId] = useState<string>("");
    const [inviterUsername, setInviterUsername] = useState<string>("");
    const [gameName, setGameName] = useState<string>("");
    const [waitingMessage, setWaitingMessage] = useState<string>("");

    const handleInvitationDeclined = () => {
        setWaitingMessage(`${inviterUsername} canceled the invitation.`);
    };

    useInvitationDeclined(
        client,
        isConnected,
        `/user/${loggedInUser?.userId}/invitation-declined`,
        handleInvitationDeclined
    );

    useEffect(() => {
        if (inviteData) {
            const { roomId, inviterUsername, gameName } = inviteData;
            setRoomId(roomId);
            setInviterUsername(inviterUsername);
            setGameName(gameName);
            setWaitingMessage("");
        }
    }, [inviteData]);

    const { mutate: acceptInvite } = useAcceptFriendInvitation(roomId, loggedInUser?.userId || "");
    const { mutate: declineInvite } = useDeclineFriendInvitation(roomId, loggedInUser?.userId || "");

    const handleAccept = () => {
        acceptInvite();
        closePopup();
    };

    const handleDecline = () => {
        declineInvite();
        closePopup();
    };

    const handleClose = () => {
        closePopup();
    };

    return (
        <Dialog
            open={isPopupOpen}
            onClose={closePopup}
            aria-labelledby="waiting-lobby-title"
            maxWidth="xs"
            fullWidth
        >
            <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                <DialogTitle
                    id="waiting-lobby-title"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                >
                    {waitingMessage
                        ? waitingMessage
                        : `${inviterUsername} invited you to play ${gameName}`}
                </DialogTitle>
            </Box>
            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                {!waitingMessage ? (
                    <>
                        <Button
                            onClick={handleAccept}
                            variant="contained"
                            color="secondary"
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                px: 3,
                                boxShadow: "none",
                                ":hover": { backgroundColor: "secondary.dark" },
                            }}
                        >
                            Accept
                        </Button>
                        <Button
                            onClick={handleDecline}
                            variant="contained"
                            color="secondary"
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                px: 3,
                                boxShadow: "none",
                                ":hover": { backgroundColor: "secondary.dark" },
                            }}
                        >
                            Decline
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="secondary"
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 3,
                            boxShadow: "none",
                            ":hover": { backgroundColor: "secondary.dark" },
                        }}
                    >
                        Close
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default InvitationToPlayGamePopUp;
