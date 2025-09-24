import {Box, CircularProgress, Typography} from "@mui/material";
import {GameCard} from "./GameCard.tsx";
import {useMyGames} from "../hooks/useGames";

const MyGamesPage = () => {
    const {data: games, isLoading, isError, error} = useMyGames();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#1f1f1f",
                }}
            >
                <CircularProgress size={50}/>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#1f1f1f",
                }}
            >
                <Typography variant="h6" color="error">
                    {error instanceof Error ? error.message : "An unknown error occurred"}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                padding: "100px 20px",
                gap: "24px",
                backgroundColor: "#121212",
                minHeight: "100vh", // Ensures full height
                minWidth: "100vw", // Ensures full width
                boxSizing: "border-box",
            }}
        >
            {games?.map((game) => (
                <GameCard game={game} key={game.id} context="library"/>
            ))}
        </Box>
    );
};

export default MyGamesPage;
