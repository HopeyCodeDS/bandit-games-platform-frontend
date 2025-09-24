import {Box, Button, Typography} from "@mui/material";
import usePlayNow from "../hooks/usePlayNow.ts";
import WaitingInLobbyPopUp from "./waitingInLobbyPopUp/WaitingInLobbyPopUp.tsx";
import {useLeaveLobby} from "../hooks/useLeaveLobby.ts";
import SecurityContext from "../context/SecurityContext.ts";
import {useContext} from "react";
import {useGetGameId} from "../hooks/useGetGameId.ts";

const HomePage = () => {

    const {loggedInUser} = useContext(SecurityContext);
    const { isError, data: gameId } = useGetGameId(loggedInUser?.userId, "Battleship");
    const {handlePlayNow, showPopup, setShowPopup} = usePlayNow(gameId);
    const {mutateAsync} = useLeaveLobby(loggedInUser?.userId || "");

    const handleClose = async () => {
        setShowPopup(false);
        await mutateAsync();
    };

    if(isError){
        console.log("game id of the game could not be found")
    }

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                backgroundImage: `url('/src/assets/battleship-1.png')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                textAlign: "center",
                color: "#fff",
                overflow: "hidden",
                "::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))",
                    zIndex: 1,
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: "20px",
                        color: "#fff",
                    }}
                >
                    Welcome to Bandit Online Games!
                </Typography>

                {/* Subtitle */}
                <Typography
                    variant="h6"
                    sx={{
                        color: "#ddd",
                        marginBottom: "40px",
                    }}
                >
                    Join the largest board game community and challenge your friends online.
                </Typography>

                <Button
                    onClick={handlePlayNow}
                    variant="contained"
                    id={gameId}
                    sx={{
                        backgroundColor: "#ff5722",
                        color: "#fff",
                        padding: "15px 50px",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        boxShadow: "0 5px 15px rgba(255, 87, 34, 0.5)",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                            backgroundColor: "#ff784e",
                            transform: "scale(1.05)",
                            boxShadow: "0 10px 20px rgba(255, 87, 34, 0.7)",
                        },
                    }}
                >
                    Play BattleShip Now!
                </Button>
                <WaitingInLobbyPopUp open={showPopup} onClose={() => handleClose()}/>
            </Box>
        </Box>
    );
};

export default HomePage;
