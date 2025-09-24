import {Gender} from "./Gender.ts";

export interface PlayerGameStatistic {

    player_name: string;
    game_name: string;
    total_games_played: number;
    total_wins: number;
    total_losses: number;
    total_moves: number;
    total_time_played_minutes: string;
    win_ratio: number;
    age: number;
    gender: Gender;
    country: string;
}
