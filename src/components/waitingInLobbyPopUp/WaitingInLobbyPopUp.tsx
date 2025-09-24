import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button,
    Box,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

interface WaitingInLobbyPopUpProps {
    open: boolean;
    onClose: () => void;
}

const WaitingInLobbyPopUp: React.FC<WaitingInLobbyPopUpProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="waiting-lobby-title" maxWidth="xs" fullWidth>
            <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                <HourglassEmptyIcon sx={{ fontSize: 60, color: "primary.main", mb: 1 }} />
                <DialogTitle id="waiting-lobby-title" align="center" sx={{ fontWeight: "bold" }}>
                    Waiting in the Lobby
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" align="center" color="textSecondary">
                        Looking for another player
                    </Typography>
                </DialogContent>
            </Box>
            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button
                    onClick={onClose}
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
                    Leave Lobby
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WaitingInLobbyPopUp;
