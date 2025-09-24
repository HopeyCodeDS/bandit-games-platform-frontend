import {createContext} from "react";
import Game from "../model/Game";

interface CartContextProps {
    cart: Game[];
    addToCart: (game: Game) => void;
    removeFromCart: (gameId: string) => void;
    clearCart: () => void;
}

export interface CartItem {
    id: string;
    name: string;
    price: string; // Ensure this matches your `Game` model's price type
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);


