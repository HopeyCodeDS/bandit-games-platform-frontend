import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addGameToLibrary, confirmGamePurchase, createPaymentIntent} from '../services/game/paymentService.ts';
import {stripePromise} from '../services/game/stripeService.ts';
import {PaymentMethod} from '@stripe/stripe-js';

export function useStripePayment() {
    const [isProcessing, setIsProcessing] = useState(false);
    const queryClient = useQueryClient();

    const {mutateAsync: createIntent} = useMutation({
        mutationFn: ({gameIds, amount}: { gameIds: string[]; amount: number }) =>
            createPaymentIntent(gameIds, amount),
    });

    const {mutateAsync: confirmPurchase} = useMutation({
        mutationFn: ({gameIds, paymentIntentId}: { gameIds: string[]; paymentIntentId: string }) =>
            confirmGamePurchase(gameIds, paymentIntentId),
    });

    const processPayment = async (
        gameIds: string[],
        paymentMethod: PaymentMethod,
        amount: number,
        userId: string | undefined
    ) => {
        try {
            setIsProcessing(true);

            if (!paymentMethod || !paymentMethod.id) {
                throw new Error('Invalid payment method');
            }

            const {clientSecret} = await createIntent({gameIds, amount});
            const stripe = await stripePromise;
            if (!stripe) throw new Error('Stripe failed to load');

            const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (error) {
                throw new Error(error.message);
            }

            if (paymentIntent.status === 'succeeded') {
                // Call the backend to add games to the user's library
                for (const gameId of gameIds) {
                    await addGameToLibrary(gameId, userId); // Add game to user library
                }
                await confirmPurchase({
                    gameIds,
                    paymentIntentId: paymentIntent.id,
                });

                queryClient.invalidateQueries({queryKey: ['purchasedGames']});
                queryClient.invalidateQueries({queryKey: ['games']});

                return {success: true};
            }
        } catch (error) {
            console.error('Payment failed:', error);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    return {processPayment, isProcessing};
}
