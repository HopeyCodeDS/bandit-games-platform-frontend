import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import useInviteFriendToPlay from "../../hooks/useInviteFriendToPlay.ts";
import SecurityContext from "../../context/SecurityContext.ts";

interface ListOfFriendsPopUpProps {
    open: boolean;
    onClose: () => void;
    friends: { [key: string]: string } | undefined;
    gameId: string;
}

import useInvitationDeclined from "../../hooks/useInvitationDeclined.ts";
import { useStompContext } from "../../context/StompContext.tsx";
import useNotifyInvitee from "../../hooks/useNotifyInvitee.ts";
import { useDeclineFriendInvitation } from "../../hooks/useDeclineFriendInvitation.ts";

const ListOfFriendsPopUp: React.FC<ListOfFriendsPopUpProps> = ({ open, onClose, friends, gameId }) => {
    const { loggedInUser } = useContext(SecurityContext);
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [waitingMessage, setWaitingMessage] = useState<string | null>(null);
    const { client, isConnected } = useStompContext();

    const { handleFriendChosenToPlay, roomId } = useInviteFriendToPlay(
        loggedInUser?.userId,
        selectedFriend || "",
        gameId
    );

    const { mutate: declineInvite } = useDeclineFriendInvitation(roomId, loggedInUser?.userId || "");

    const handleInvitationDeclined = () => {
        setWaitingMessage(`${selectedUserName} declined invitation.`);
    };

    useNotifyInvitee(client, isConnected, `/user/${loggedInUser?.userId}/invitation`);
    useInvitationDeclined(client, isConnected, `/user/${loggedInUser?.userId}/invitation-declined`, handleInvitationDeclined);

    const handleSelect = () => {
        if (selectedFriend) {
            setWaitingMessage(`Waiting for ${selectedUserName} to accept invitation`);
            handleFriendChosenToPlay();
        }
    };

    const handleFriendClick = (userId: string, userName: string) => {
        setSelectedFriend(userId);
        setSelectedUserName(userName);
        setWaitingMessage(null);
    };

    const handleClose = () => {
        setSelectedFriend(null);
        setWaitingMessage(null);
        declineInvite();
        onClose();
    };

    const friendsMap = friends ? new Map(Object.entries(friends)) : new Map();

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="friends-list-title" maxWidth="xs" fullWidth>
            {!waitingMessage && (
                <DialogTitle id="friends-list-title" align="center" sx={{ fontWeight: "bold" }}>
                    Select a Friend
                </DialogTitle>
            )}
            <DialogContent>
                {!waitingMessage ? (
                    <List>
                        {friendsMap.size > 0 ? (
                            Array.from(friendsMap.entries()).map(([userId, userName]) => (
                                <ListItem key={userId} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleFriendClick(userId, userName)}
                                        selected={userName === selectedFriend}
                                    >
                                        <ListItemText
                                            primary={userName}
                                            primaryTypographyProps={{
                                                fontWeight: userName === selectedFriend ? "bold" : "normal",
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2" color="error" align="center">
                                No friends available to display.
                            </Typography>
                        )}
                    </List>
                ) : (
                    <Typography
                        variant="h6"
                        align="center"
                        color="black"
                        sx={{
                            mt: 2,
                            fontStyle: "italic",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                        }}
                    >
                        {waitingMessage}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", px: 3, pb: 2 }}>
                {!waitingMessage && (
                    <Button
                        onClick={handleSelect}
                        variant="contained"
                        color="primary"
                        disabled={!selectedFriend}
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 3,
                            boxShadow: "none",
                            ":hover": { backgroundColor: "primary.dark" },
                        }}
                    >
                        Select
                    </Button>
                )}
                <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        boxShadow: "none",
                        ":hover": { backgroundColor: "secondary.dark" },
                    }}
                >
                    {waitingMessage ? "Cancel" : "Close"}
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default ListOfFriendsPopUp;
