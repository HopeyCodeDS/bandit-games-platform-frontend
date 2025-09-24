import Game from "./Game.ts";
import Friend from "./Friend.ts";
import GameAchievements from "./GameAchievements.ts";

interface UserData {
    userId: string;
    username: string;
    gender: string;
    email: string;
    firstName: string;
    lastName: string;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    rating: number;
    birthDate: string;
    country: string;
    friends: Friend[];
    games: Game[] | null;
    achievements: null;
    gameAchievements: GameAchievements;
    avatar: string;
}

export default UserData;