import {Box, Button, CircularProgress, Drawer, Fab, Typography} from "@mui/material";
import {GameCard} from "./GameCard.tsx";
import {useGames, useMyGames} from "../hooks/useGames";
import {useState} from "react";
import {Cart} from "./Cart.tsx";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {useNavigate} from "react-router-dom";

const StorePage = () => {
    const {data: games, isLoading, isError, error} = useGames();
    const {data: purchasedGames, isLoading: isLoadingPurchasedGames} = useMyGames(); // Fetch purchased games
    const [isCartOpen, setCartOpen] = useState(false); // State for controlling drawer visibility
    const navigate = useNavigate();

    if (isLoading || isLoadingPurchasedGames) {
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

    // Filter out purchased games
    const filteredGames = games?.filter(
        (game) => !purchasedGames?.some((purchasedGame) => purchasedGame.id === game.id)
    );

    return (
        <Box style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh", // Ensures full height
            minWidth: "100vw", // Ensures full width
            padding: "100px 20px",
            boxSizing: "border-box",
            backgroundColor: "#121212",
        }}>
            {/* View Cart Button */}
            <Fab
                variant="extended"
                onClick={() => setCartOpen(true)}
                sx={{
                    position: "fixed",
                    top: "110px",
                    right: "20px",
                    zIndex: 1000,
                    backgroundColor: '#FFD700',
                    color: '#000000',
                    padding: '0 20px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 10px rgba(255, 215, 0, 0.3)',
                    '&:hover': {
                        backgroundColor: '#E5C100',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 15px rgba(255, 215, 0, 0.4)',
                    },
                    '& .MuiSvgIcon-root': {
                        marginRight: '8px',
                        fontSize: '20px'
                    },
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    fontSize: '1rem'
                }}
            >
                <ShoppingCartIcon/>
                CART
            </Fab>

            {/* Drawer for the Cart */}
            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={() => setCartOpen(false)} // Close the drawer
                PaperProps={{
                    style: {
                        width: "300px", // Set the drawer width
                        padding: "20px",
                        backgroundColor: "#f9f9f9",
                    },
                }}
            >
                <Cart/>
            </Drawer>

            {/* StorePage Grid */}
            <Box style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center", // Centers items vertically in the container
                gap: "24px",
                maxWidth: "1200px",
                width: "100%",
            }}>
                {filteredGames && filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <GameCard game={game} key={game.id} setCartVisible={setCartOpen}/>
                    ))
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 3,
                            textAlign: 'center',
                            padding: 4,
                            color: 'white'
                        }}
                    >
                        {/* Trophy icon for achievement */}
                        <EmojiEventsIcon sx={{
                            fontSize: 80,
                            color: '#FFD700',  // Gold color
                            animation: 'shine 2s infinite',
                            '@keyframes shine': {
                                '0%': {opacity: 0.8},
                                '50%': {opacity: 1},
                                '100%': {opacity: 0.8}
                            }
                        }}/>

                        <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                            🎮 Game Master Achievement Unlocked! 🏆
                        </Typography>

                        <Typography variant="h6" sx={{color: '#CCCCCC'}}>
                            Wow! You've collected all our games!
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                maxWidth: '600px',
                                color: '#999999',
                                marginTop: 1
                            }}
                        >
                            Your game library is complete! Take a moment to bask in your legendary status while we craft
                            new adventures for you. Check back soon for new releases!
                        </Typography>

                        {/* Button to view collection */}
                        <Button
                            variant="contained"
                            onClick={() => navigate('/my-games')}
                            sx={{
                                marginTop: 2,
                                borderRadius: 2,
                                padding: '10px 20px',
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                backgroundColor: '#FFD700',  // Match the trophy color
                                color: '#000000',           // Black text for contrast
                                '&:hover': {
                                    backgroundColor: '#E5C100',  // Slightly darker gold on hover
                                }
                            }}
                        >
                            View My Collection
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default StorePage;
