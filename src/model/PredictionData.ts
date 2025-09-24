interface PredictionData {
    predictions: {
        churn_prediction: {
            result: string;
            probability: string;
            advice: string;
        };
        engagement_prediction: {
            predicted_engagement: {
                'monthly forecast': string;
                'daily_average': string;
            };
            raw_minutes: number;
            advice: string;
        };
        skill_assessment: {
            predicted_level: string;
            current_stats: {
                games_played: number;
                win_rate: number;
                total_playtime: number;
            };
            advice: string;
        };
        win_probability: {
            probability: string;
            advice: string;
        };
    };
    metadata: {
        model_version: string;
        timestamp: string;
        analysis_type: string;
    };
}

export default PredictionData;
