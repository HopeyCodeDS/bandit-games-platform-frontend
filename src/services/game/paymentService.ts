import axios from "axios";
import {addAccessTokenToAuthHeader, getToken} from "../auth.ts";
import Stripe from 'stripe';

const BACKEND_CORE_URL: string = import.meta.env.VITE_BACKEND_URL
const SECRET_KEY = 'sk_test_51QeB1CAVidmKrgyTeZX4BoMmTzViZf6bysvxYiVC8VTc1xNBKsmOEdChFuKFNonZNTFJqEDlgQFIhpNfKY25E5DM008GY2LbBh'; // Replace with your Stripe secret key
const stripe = new Stripe(SECRET_KEY, {apiVersion: '2024-12-18.acacia'});
const token = getToken() || undefined;  // Convert null to undefined if no token exists
addAccessTokenToAuthHeader(token); // Add the token to the default axios headers if it exists

// Add game to user library
export const addGameToLibrary = async (gameId: string, userId: string | undefined): Promise<any> => {
    console.log('Adding game to user library:', {gameId, userId});

    try {
        const response = await axios.post(
            `${BACKEND_CORE_URL}/store/sell`,
            {gameId, userId}, // Send gameId and userId in the request body
            {
                headers: {
                    'Content-Type': 'application/json', // Content-Type is still required
                },
            }
        );
        console.log('Game added to user library successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to add game to user library:', error);
        throw new Error('Failed to add game to library.');
    }

};

// Create a payment intent for purchasing games
export const createPaymentIntent = async (
    gameIds: string[],
    amount: number
): Promise<any> => {
    console.log('Creating payment intent for:', {gameIds, amount});

    try {
        // Use Stripe to create a real Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency: 'usd',
        });

        console.log('Payment intent created:', paymentIntent.client_secret);

        return {
            clientSecret: paymentIntent.client_secret, // Return the real client secret
        };
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw new Error('Failed to create payment intent.');
    }
};

// Confirm the purchase of games
export const confirmGamePurchase = async (
    gameIds: string[],
    paymentIntentId: string
): Promise<any> => {
    console.log('Confirming game purchase for:', {gameIds, paymentIntentId});

    // Temporary hardcoded response
    return {
        success: true,
        message: 'Game purchase confirmed successfully!',
    };
};

