import Game from "./Game.ts";

interface Friend {
    friendId: string;
    username: string;
    rating: number;
    country: string;
    games: Game[];
}

export default Friend;