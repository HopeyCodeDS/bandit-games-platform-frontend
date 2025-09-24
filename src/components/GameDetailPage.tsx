import {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Divider, Typography,} from "@mui/material";
import {useParams} from "react-router-dom";
import {fetchGameByName} from "../services/game/gameService.ts"; // Import your fetch function
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {getGameImage} from "../utils/gameImageMapping.ts";
import Game from "../model/Game.ts";

const GameDetailPage = () => {
    const {name} = useParams<{ name: string }>(); // Get game name from URL
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const gameImage = game ? getGameImage(game.name) : "";

    console.log('Game Name:', game?.name);
    console.log('Game Image Path:', gameImage);

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (!name) {
                setError("Game name is missing in the URL.");
                setLoading(false);
                return;
            }
            try {
                const data = await fetchGameByName(name);
                setGame(data);
            } catch (err) {
                console.error("Error fetching game details:", err);
                setError("Failed to load game details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [name]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress size={60}/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <ErrorOutlineIcon sx={{fontSize: 80, color: "red"}}/>
                <Typography color="error" variant="h6" mt={2}>
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", // Ensures full height
            minWidth: "100vw", // Ensures full width
            boxSizing: "border-box",
            backgroundColor: "#121212",
        }}>
            <Box sx={{
                padding: "50px", maxWidth: "1200px", margin: "0 auto",
            }}>
                {/* Game Title */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: "20px",
                        fontSize: {xs: "2rem", md: "3.5rem"},
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        background: "linear-gradient(90deg, #FFD700, #1E90FF)", // Gold to Blue gradient
                        WebkitBackgroundClip: "text", // Clip gradient to text
                        color: "transparent", // Make the text transparent to show the gradient
                        textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)", // Add subtle shadow
                    }}
                >
                    {game?.name}
                </Typography>


                {/* Game Content */}
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: {xs: "column", md: "row"},
                        boxShadow: 4,
                        borderRadius: 3,
                        overflow: "hidden",
                        marginBottom: "40px",
                    }}
                >
                    {/* Image Section */}
                    <CardMedia
                        component="img"
                        sx={{
                            width: {xs: "100%", md: "50%"},
                            objectFit: "cover",
                            height: "400px",
                        }}
                        image={gameImage}
                        alt={game?.name}
                        className="game-card-media"
                    />

                    {/* Game Details */}
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: {md: "50%"},
                            padding: "20px",
                        }}
                    >
                        {/* Description */}
                        <Typography variant="body1" sx={{marginBottom: "10px"}}>
                            {game?.description}
                        </Typography>
                        <Divider sx={{marginY: "10px"}}/>

                        {/* Game Meta Details */}
                        <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                <PeopleIcon/>
                                <Typography variant="body1">
                                    Genre: <strong>{game?.genre}</strong>
                                </Typography>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                <CalendarTodayIcon/>
                                <Typography variant="body1">
                                    Released:{" "}
                                    <strong>
                                        {new Date(game?.releaseDate ?? "").toLocaleDateString()}
                                    </strong>
                                </Typography>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                <StarIcon sx={{color: "#FFC107"}}/>
                                <Typography variant="body1">
                                    Rating: <strong>{game?.rating} / 5</strong>
                                </Typography>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                <ChildFriendlyIcon sx={{color: "#FF5722"}}/>
                                <Typography variant="body1">
                                    Age Limit: <strong>{game?.ageLimit}+</strong>
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h4" color="primary" fontWeight="bold">
                                    {game?.price}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Actions */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                marginTop: "20px",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                startIcon={<ShoppingCartIcon/>}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                startIcon={<PeopleIcon/>}
                            >
                                Play with Friends
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default GameDetailPage;
