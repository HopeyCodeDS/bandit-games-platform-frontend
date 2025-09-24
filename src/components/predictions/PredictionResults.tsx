import React from 'react';
import { Box, Typography, Card, CardContent, Grid2, LinearProgress, Button } from '@mui/material';
import PredictionData from '../../model/PredictionData';

type PredictionResultsProps = {
    predictions: PredictionData;
    onPredictAgain: () => void;
};

const PredictionResults: React.FC<PredictionResultsProps> = ({ predictions, onPredictAgain }) => {
    const { churn_prediction, engagement_prediction, skill_assessment, win_probability } = predictions.predictions;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#121212',
                color: 'white',
                width: '100vw',
                height: '100vh',
                paddingBottom: 3,
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                Player Prediction Results
            </Typography>

            <Grid2
                container
                sx={{
                    maxWidth: 800,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: '16px',
                    marginBottom: 3,
                }}
            >
                {/* Churn Prediction */}
                <Grid2>
                    <Card sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Churn Prediction</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Prediction: {churn_prediction?.result || 'N/A'}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Probability: {churn_prediction?.probability || 'N/A'}
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                {churn_prediction?.advice || 'No advice available'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Win Probability */}
                <Grid2>
                    <Card sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Win Probability</Typography>
                            <LinearProgress
                                variant="determinate"
                                value={parseFloat(win_probability?.probability || '0') * 100}
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: '#666',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#2196f3',
                                    },
                                }}
                            />
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                {parseFloat(win_probability?.probability || '0') * 100}% ({win_probability?.probability})
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                {win_probability?.advice || 'No advice available'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Engagement Prediction */}
                <Grid2>
                    <Card sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Engagement Prediction</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Monthly Forecast: {engagement_prediction?.predicted_engagement['monthly forecast'] || 'N/A'}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Daily Average: {engagement_prediction?.predicted_engagement['daily_average'] || 'N/A'}
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                {engagement_prediction?.advice || 'No advice available'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Skill Assessment */}
                <Grid2>
                    <Card sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>Skill Assessment</Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Predicted Level: {skill_assessment?.predicted_level || 'N/A'}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Games Played: {skill_assessment?.current_stats?.games_played || 'N/A'}
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                Win Rate: {skill_assessment?.current_stats?.win_rate || 'N/A'}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min(skill_assessment?.current_stats?.win_rate || 0, 100)}
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: '#666',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#2196f3',
                                    },
                                }}
                            />
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                {skill_assessment?.advice || 'No advice available'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            <Button
                variant="contained"
                color="primary"
                sx={{
                    marginTop: 4,
                    color: '#121212',
                }}
                onClick={onPredictAgain}
            >
                Predict Again
            </Button>
        </Box>
    );
};

export default PredictionResults;

