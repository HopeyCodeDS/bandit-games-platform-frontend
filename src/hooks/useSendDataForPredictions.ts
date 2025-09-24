import { useMutation } from "@tanstack/react-query";
import PredictionFormData from "../model/PredictionFormData.ts";
import {sendDataForPredictions} from "../services/sendDataForPredictions.ts";

export const useSendDataForPredictions = (predictionFormData: PredictionFormData) => {
    return useMutation({
        mutationFn: () => sendDataForPredictions(predictionFormData),
    });
};
