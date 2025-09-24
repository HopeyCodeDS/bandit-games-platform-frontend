import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
// import {useNavigate} from "react-router-dom";
import Game from "../model/Game.ts";
import {useGame} from "../hooks/useGames";
import {getGameImage} from "../utils/gameImageMapping.ts";
import {useCart} from "../hooks/useCart.ts";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import usePlayNow from "../hooks/usePlayNow.ts";
import WaitingInLobbyPopUp from "./waitingInLobbyPopUp/WaitingInLobbyPopUp.tsx";
import {useLeaveLobby} from "../hooks/useLeaveLobby.ts";
import SecurityContext from "../context/SecurityContext.ts";
import ListOfFriendsPopUp from "./listOfFriendsPopUp/ListOfFriendsPopUp.tsx";
import {useFriendsToPlayWith} from "../hooks/useFriendsToPlayWith.ts";

interface GameCardProps {
    game: Game;
    context?: "store" | "library"; // Prop for differentiating between store and library
    setCartVisible?: React.Dispatch<React.SetStateAction<boolean>>; // Prop for toggling cart visibility
}

export const GameCard = ({game, context = 'store', setCartVisible}: GameCardProps) => {

    const {loggedInUser} = useContext(SecurityContext);
    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    const [openCartDialog, setOpenCartDialog] = useState(false);
    const {data: gameDetails, isLoading} = useGame(game.id);
    const {cart, addToCart} = useCart(); // Use the cart context
    const gameImage = getGameImage(game.name);
    const isInCart = cart.some((item) => item.id === game.id);
    const {handlePlayNow, showPopup, setShowPopup} = usePlayNow(game.id);
    const [showPlayWithFriendsPopUp, setShowPlayWithFriendsPopUp] = useState(false);
    const {mutateAsync} = useLeaveLobby(loggedInUser?.userId || "");
    const {mutate, data: friends} = useFriendsToPlayWith(loggedInUser?.userId || "", game.id);

    useEffect(() => {
        if (loggedInUser?.userId && game.id) {
            mutate();
        }
    }, [loggedInUser?.userId, game.id, mutate]);

    const handlePlayWithFriends = () => {
        setShowPlayWithFriendsPopUp(true);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!cart.find((item) => item.id === game.id)) {
            addToCart(game);
            setOpenCartDialog(true);
        }
    };

    const handleClose = async () => {
        setShowPopup(false);
        await mutateAsync();
    }

    const handlePlayWithFriendsPopUpClose = async () => {
        setShowPlayWithFriendsPopUp(false);
    }

    const handleViewCart = () => {
        setOpenCartDialog(false);
        setCartVisible?.(true);
    };

    const handleInfoClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenInfoDialog(true);
    };

    const handleCloseCart = () => {
        setOpenCartDialog(false);
    };

    const handleCloseInfo = () => {
        setOpenInfoDialog(false);
    };

    return (
        <>
            {/* Card */}
            <Card
                // onClick={context === 'store' ? handleCardClick : undefined}
                sx={{
                    flex: "0 0 300px",
                    maxWidth: "300px",
                    minWidth: "300px",
                    margin: "20px",
                    padding: "20px",
                    boxShadow: "0 4px 15px rgba(255, 215, 0, 0.1)",
                    borderRadius: "20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: "#2A2A2A",  // Lighter dark shade
                    border: "1px solid rgba(255, 215, 0, 0.15)", // Subtle gold border
                    transition: "all 0.3s ease",
                    '&:hover': {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(255, 215, 0, 0.2)", // Enhanced gold glow on hover
                        backgroundColor: "#2A2A2A"  // Slightly lighter on hover
                    }
                }}
            >
                <CardMedia
                    component="img"
                    alt={game.name}
                    image={gameImage}
                    sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 0",
                }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: '#FFD700'}}>
                        {game.name}
                    </Typography>
                    {context === 'store' && (
                        <Typography variant="h6" sx={{color: '#E5C100'}}>
                            {game.price}
                        </Typography>
                    )}
                </CardContent>
                <CardActions sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                }}>
                    {context === 'store' ? (
                        <>
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<ShoppingCartIcon/>}
                                onClick={handleAddToCartClick}
                                disabled={isInCart} // Disable button if already in cart
                                sx={{
                                    width: "80%",
                                    maxWidth: "250px",
                                    height: "45px",
                                    backgroundColor: '#FFD700',
                                    color: '#000000',
                                    '&:hover': {
                                        backgroundColor: '#E5C100',
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: '#4A4A4A',
                                        color: '#888888'
                                    }
                                }}
                            >
                                {isInCart ? "In Cart" : "Add to Cart"}
                            </Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                color="secondary"
                                onClick={handleInfoClick}
                                startIcon={<InfoIcon/>}
                                sx={{
                                    width: "80%",
                                    maxWidth: "250px",
                                    height: "45px",
                                    borderColor: '#FFD700',
                                    color: '#FFD700',
                                    '&:hover': {
                                        borderColor: '#E5C100',
                                        color: '#E5C100',
                                        backgroundColor: 'rgba(255, 215, 0, 0.1)'
                                    }
                                }}
                            >
                                Info
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="medium"
                                variant="contained"
                                onClick={handlePlayNow}
                                sx={{
                                    width: "80%",
                                    maxWidth: "250px",
                                    height: "45px",
                                    backgroundColor: '#FFD700',  // Royal Blue
                                    color: '#000000',
                                    '&:hover': {
                                        backgroundColor: '#E5C100',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 8px rgba(65, 105, 225, 0.3)'
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Play Now
                            </Button>
                            <WaitingInLobbyPopUp open={showPopup} onClose={() => handleClose()}/>
                            <Button
                                size="medium"
                                variant="contained"
                                onClick={handlePlayWithFriends}
                                sx={{
                                    width: "80%",
                                    maxWidth: "250px",
                                    height: "45px",
                                    backgroundColor: '#B8860B',  // Blueviolet
                                    color: '#000000',
                                    '&:hover': {
                                        backgroundColor: '#956B00',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 8px rgba(138, 43, 226, 0.3)'
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Play with Friends
                            </Button>

                            <ListOfFriendsPopUp open={showPlayWithFriendsPopUp}
                                                onClose={() => handlePlayWithFriendsPopUpClose()} friends={friends}
                                                gameId={game.id}></ListOfFriendsPopUp>
                            <Button
                                size="medium"
                                variant="outlined"
                                startIcon={<InfoIcon/>}
                                onClick={handleInfoClick}
                                sx={{
                                    width: "80%",
                                    maxWidth: "250px",
                                    height: "45px",
                                    borderColor: '#FFD700',  // Cornflower Blue
                                    color: '#FFD700',
                                    '&:hover': {
                                        borderColor: '#E5C100',
                                        backgroundColor: 'rgba(100, 149, 237, 0.1)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Info
                            </Button>
                        </>
                    )}
                </CardActions>
            </Card>

            {/* Add to Cart Pop-Up */}
            <Dialog
                open={openCartDialog}
                onClose={handleCloseCart}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: '#1A1A1A',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 215, 0, 0.15)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#FFD700",
                        fontSize: "1.5rem",
                        padding: "24px"
                    }}
                >
                    🎉 Added to your cart!
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            padding: "20px",
                            border: "1px solid rgba(255, 215, 0, 0.15)",
                            borderRadius: "12px",
                            backgroundColor: "#242424",
                        }}
                    >
                        <img
                            src={gameImage}
                            alt={game.name}
                            style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "8px",
                                objectFit: "cover",
                            }}
                        />
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#FFD700"
                                }}
                            >
                                {game.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: "18px",
                                    color: "#E5C100",
                                    marginTop: "4px"
                                }}
                            >
                                {game.price}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: "space-between",
                        padding: "24px",
                        borderTop: '1px solid rgba(255, 215, 0, 0.15)'
                    }}
                >
                    <Button
                        onClick={handleCloseCart}
                        variant="outlined"
                        startIcon={<ArrowBackIcon/>}
                        sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            borderColor: 'rgba(255, 215, 0, 0.5)',
                            color: '#FFD700',
                            padding: "12px 24px",
                            width: "45%",
                            fontSize: "16px",
                            '&:hover': {
                                borderColor: '#FFD700',
                                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                            }
                        }}
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        onClick={handleViewCart}
                        variant="contained"
                        endIcon={<ArrowForwardIcon/>}
                        sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            padding: "12px 24px",
                            width: "45%",
                            fontSize: "16px",
                            backgroundColor: '#FFD700',
                            color: '#000000',
                            '&:hover': {
                                backgroundColor: '#E5C100',
                            }
                        }}
                    >
                        View My Cart
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Info Pop-Up Dialog */}
            <Dialog
                open={openInfoDialog}
                onClose={handleCloseInfo}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        backgroundColor: '#1A1A1A',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                <DialogTitle sx={{
                    background: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)',
                    padding: '24px'
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            color: '#FFD700',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {game?.name} Details
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{backgroundColor: '#1A1A1A', padding: '24px'}}>
                    {isLoading ? (
                        <Box sx={{display: 'flex', justifyContent: 'center', padding: '40px'}}>
                            <CircularProgress size={40} sx={{color: '#FFD700'}}/>
                        </Box>
                    ) : gameDetails ? (
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                padding: "20px",
                                color: '#FFFFFF'
                            }}
                        >
                            {/* Description */}
                            <Typography
                                variant="body1"
                                sx={{
                                    lineHeight: 1.6,
                                    color: '#E0E0E0',
                                    fontSize: '1.1rem'
                                }}
                            >
                                {gameDetails?.description}
                            </Typography>
                            <Divider sx={{
                                borderColor: 'rgba(255, 215, 0, 0.1)',
                                margin: '12px 0'
                            }}/>

                            {/* Game Meta Details */}
                            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    padding: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px'
                                }}>
                                    <PeopleIcon sx={{color: '#4A90E2'}}/>
                                    <Typography variant="body1" sx={{color: '#E0E0E0'}}>
                                        Genre: <strong style={{color: '#FFFFFF'}}>{gameDetails?.genre}</strong>
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    padding: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px'
                                }}>
                                    <CalendarTodayIcon sx={{color: '#9C27B0'}}/>
                                    <Typography variant="body1" sx={{color: '#E0E0E0'}}>
                                        Released: <strong style={{color: '#FFFFFF'}}>
                                        {new Date(gameDetails?.releaseDate ?? "").toLocaleDateString()}
                                    </strong>
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    padding: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px'
                                }}>
                                    <StarIcon sx={{color: '#FFC107'}}/>
                                    <Typography variant="body1" sx={{color: '#E0E0E0'}}>
                                        Rating: <strong style={{color: '#FFFFFF'}}>{gameDetails?.rating} / 5</strong>
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    padding: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '8px'
                                }}>
                                    <ChildFriendlyIcon sx={{color: '#FF5722'}}/>
                                    <Typography variant="body1" sx={{color: '#E0E0E0'}}>
                                        Age Limit: <strong style={{color: '#FFFFFF'}}>{gameDetails?.ageLimit}+</strong>
                                    </Typography>
                                </Box>

                                {context === 'store' && (
                                    <Box sx={{
                                        textAlign: 'center',
                                        marginTop: '16px',
                                        padding: '16px',
                                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                        borderRadius: '8px'
                                    }}>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                color: '#FFD700',
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {gameDetails?.price}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    ) : (
                        <Typography
                            color="error"
                            sx={{textAlign: "center", marginTop: "20px"}}
                        >
                            Failed to load game details
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: "center",
                        padding: "20px",
                        backgroundColor: '#1A1A1A',
                        borderTop: '1px solid rgba(255, 215, 0, 0.1)'
                    }}
                >
                    <Button
                        onClick={handleCloseInfo}
                        variant="contained"
                        endIcon={<CloseIcon/>}
                        sx={{
                            padding: "12px 24px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            backgroundColor: '#FFD700',  // Changed to gold
                            color: '#000000',  // Black text for better contrast on gold
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: '#E5C100',  // Slightly darker gold on hover
                                transform: 'translateY(-2px)',
                                transition: 'all 0.2s ease'
                            }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

