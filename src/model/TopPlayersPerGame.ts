import {TopPlayer} from "./TopPlayer.ts";

export interface TopPlayersPerGame{

    game_name: string;
    top_players: TopPlayer[];
}