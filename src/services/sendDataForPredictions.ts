import axios from "axios";
import PredictionFormData from "../model/PredictionFormData.ts";
import PredictionData from "../model/PredictionData.ts";

const PREDICTIONS_URL: string = import.meta.env.VITE_PREDICTIONS_URL;

export async function sendDataForPredictions(predictionFormData: PredictionFormData): Promise<PredictionData> {
    const response = await axios.post<PredictionData>(PREDICTIONS_URL, predictionFormData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}