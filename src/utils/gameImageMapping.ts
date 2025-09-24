export const GAME_IMAGES: { [key: string]: string } = {
    "BattleShip": new URL("../assets/logo-battleship.png", import.meta.url).href,
    "Clue": new URL("../assets/logo-clue.png", import.meta.url).href,
    "DonkeyKong": new URL("../assets/logo-donkey.png", import.meta.url).href,
    "Mario": new URL("../assets/logo-mario.png", import.meta.url).href,
    "Pac-Man": new URL("../assets/logo-pacman.png", import.meta.url).href,
    "Pong": new URL("../assets/logo-tennis.webp", import.meta.url).href,
    "Sonic": new URL("../assets/logo-sonic.png", import.meta.url).href,
    "Street Fighter": new URL("../assets/logo-streetfighter.png", import.meta.url).href,
    "Tetris": new URL("../assets/logo-tetris.png", import.meta.url).href,
    "Zelda": new URL("../assets/logo-zelda.png", import.meta.url).href,
    "logo": new URL("../assets/logo.png", import.meta.url).href,
};

export const getGameImage = (gameName: string): string => {
    // Try exact match first
    if (GAME_IMAGES[gameName]) {
        return GAME_IMAGES[gameName];
    }

    // If no exact match, try partial match (case-insensitive)
    const matchedGame = Object.keys(GAME_IMAGES).find(
        key => gameName.toLowerCase().includes(key.toLowerCase())
    );

    return matchedGame ? GAME_IMAGES[matchedGame] : "/src/assets/logo-placeholder.webp";
};