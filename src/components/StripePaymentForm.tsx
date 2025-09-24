import React, {useState} from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Typography
} from '@mui/material';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {useStripePayment} from '../hooks/useStripePayment';
import {useAuth} from "../hooks/useAuth.ts";

interface StripePaymentFormProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Array<{
        id: string;
        name: string;
        price: string;
    }>;
    total: number;
    onSuccess?: () => void;
}

export const StripePaymentForm = ({isOpen, onClose, cartItems, total, onSuccess}: StripePaymentFormProps) => {
    const [error, setError] = useState<string | null>(null);
    const {processPayment, isProcessing} = useStripePayment();
    const stripe = useStripe();
    const elements = useElements();
    const {userId} = useAuth(); // Get userId and authentication status


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!stripe || !elements) {
            setError('Stripe has not loaded correctly. Please try again.');
            return;
        }

        try {
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card element not found');
            }

            // Create PaymentMethod using Stripe
            const {paymentMethod, error} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw new Error(error.message);
            }

            // Process payment
            const gameIds = cartItems.map(item => item.id);
            await processPayment(gameIds, paymentMethod!, total * 100, userId); // Convert to cents

            onSuccess?.();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Payment failed. Please try again.');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Complete Purchase
                <Typography variant="subtitle1" color="textSecondary">
                    Total amount: ${total.toFixed(2)}
                </Typography>
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

                <Box sx={{mb: 3}}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <Paper variant="outlined" sx={{p: 2}}>
                        {cartItems.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 1
                                }}
                            >
                                <Typography variant="body2">{item.name}</Typography>
                                <Typography variant="body2">{item.price}</Typography>
                            </Box>
                        ))}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderTop: 1,
                                borderColor: 'divider',
                                pt: 1,
                                mt: 1
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                Total
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="bold">
                                ${total.toFixed(2)}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>

                <Paper variant="outlined" sx={{p: 2, mb: 2}}>
                    <CardElement/>
                </Paper>
            </DialogContent>

            <DialogActions sx={{p: 2}}>
                <Button onClick={onClose} disabled={isProcessing}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    startIcon={isProcessing && <CircularProgress size={20}/>}
                >
                    {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
