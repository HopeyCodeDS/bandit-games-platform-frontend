import {Alert, Box, Button, Paper, Snackbar, Typography} from "@mui/material";
import {useCart} from "../hooks/useCart";
import {CartItem} from "../context/CartContext";
import PaymentIcon from '@mui/icons-material/Payment';
import {useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {StripePaymentForm} from "./StripePaymentForm.tsx";
import {useNavigate} from 'react-router-dom';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {stripePromise} from "../services/game/stripeService.ts"; // Typo in import path


export const Cart = () => {
    const {cart, removeFromCart, clearCart} = useCart();
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const total = cart.reduce(
        (sum, game) => sum + parseFloat(game.price.replace("$", "")),
        0
    );

    const handlePaymentSuccess = () => {
        clearCart?.();
        setSnackbarOpen(true); // Show the snackbar
    };

    // Handle closing of the snackbar and navigate to My Games page
    const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return; // Prevent closing if the user clicks away
        }
        setSnackbarOpen(false);
        navigate('/my-games'); // Redirect to My Games page
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxSizing: "border-box",
                p: 1.25,
                bgcolor: "background.default"
            }}
        >
            <Typography
                variant="h4"
                style={{
                    marginBottom: "20px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "primary.main",  // Add brand color
                    fontFamily: "'Roboto', sans-serif",  // More modern font
                }}
            >
                Your Shopping Cart {/* More personalized title */}
            </Typography>

            {cart.length === 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",  // Changed to column
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        gap: 2  // Add spacing between elements
                    }}
                >
                    <ShoppingCartIcon sx={{fontSize: 60, color: 'text.secondary', mb: 2}}/>
                    <Typography variant="h6" color="text.secondary">
                        Your cart is empty
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box sx={{flex: 1, overflowY: "auto", mb: 2}}>
                        {(cart as CartItem[]).map((game) => (
                            <Paper
                                key={game.id}
                                elevation={2}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                    p: 2,  // Increased padding
                                    borderRadius: 2,  // More rounded corners
                                    transition: 'transform 0.2s, box-shadow 0.2s',  // Add hover effect
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 4
                                    }
                                }}
                            >
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                    <Box>
                                        <Typography variant="h6" sx={{fontWeight: 'medium'}}>
                                            {game.name}
                                        </Typography>
                                        <Typography variant="body2" color="primary.main" sx={{fontWeight: 'bold'}}>
                                            {game.price}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteOutlineIcon/>}  // Add icon
                                    onClick={() => removeFromCart?.(game.id)}
                                    sx={{
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'error.light',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    Remove
                                </Button>
                            </Paper>
                        ))}
                    </Box>

                    <Paper
                        elevation={3}
                        sx={{
                            p: 2.5,
                            borderRadius: "10px",
                            bgcolor: "background.paper",
                            position: "sticky",
                            bottom: 0,
                            boxShadow: theme => `0 -4px 20px ${theme.palette.divider}`  // Subtle shadow
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: "center",
                                fontWeight: "bold",
                                mb: 2.5,
                                color: 'primary.main'  // Brand color
                            }}
                        >
                            Total: ${total.toFixed(2)}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<PaymentIcon/>}
                            fullWidth
                            onClick={() => setIsPaymentOpen(true)}
                            sx={{
                                py: 1.5,
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow: 4,
                                '&:hover': {
                                    boxShadow: 6
                                }
                            }}
                        >
                            Proceed to Payment
                        </Button>
                    </Paper>
                </>
            )}

            {stripePromise && (
                <Elements stripe={stripePromise}>
                    <StripePaymentForm
                        isOpen={isPaymentOpen}
                        onClose={() => setIsPaymentOpen(false)}
                        cartItems={cart as CartItem[]}
                        total={total}
                        onSuccess={handlePaymentSuccess}
                    />
                </Elements>
            )}

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Snackbar will disappear after 3 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{width: '100%'}}>
                    Purchase successful! Redirecting to 'My Games'...
                </Alert>
            </Snackbar>
        </Box>
    );
};