import {ExpertiseClassification} from "./ExpertiseClassification.ts";

export interface GamePlayerPrediction {
    playerName: string;
    gameName: string;
    churn: number;
    gameEngagement: number;
    winProbability: number;
    expertiseClassification:  ExpertiseClassification;
}
