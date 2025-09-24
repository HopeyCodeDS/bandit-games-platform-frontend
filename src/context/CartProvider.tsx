import {ReactNode, useState} from "react";
import Game from "../model/Game.ts";
import {CartContext} from "./CartContext.tsx";

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<Game[]>([]);

    const addToCart = (game: Game) => {
        if (!cart.find((item) => item.id === game.id)) {
            setCart([...cart, game]);
        }
    };

    const removeFromCart = (gameId: string) => {
        setCart(cart.filter((item) => item.id !== gameId));
    };

    const clearCart = () => {
        setCart([]); // Clears all items from the cart
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};
