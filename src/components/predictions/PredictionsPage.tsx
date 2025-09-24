import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import PredictionFormData from "../../model/PredictionFormData.ts";
import { useSendDataForPredictions } from "../../hooks/useSendDataForPredictions.ts";
import PredictionResults from "./PredictionResults.tsx";

const FormPage = () => {
    const [formData, setFormData] = useState<Omit<PredictionFormData, 'total_games_played'>>({
        total_moves: 0,
        total_wins: 0,
        total_losses: 0,
        total_time_played_minutes: 0,
        gender: '',
        country: '',
        game_name: '',
        age: 15,
    });

    const [showResults, setShowResults] = useState(false);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const { mutate: sendData, data: predictionResults, isError } = useSendDataForPredictions({
        ...formData,
        total_games_played: Number(formData.total_wins) + Number(formData.total_losses), // Compute total games played
    });

    const handleSubmit = async () => {
        sendData();
        setShowResults(true);
    };

    const handlePredictAgain = () => {
        setFormData({
            total_moves: 0,
            total_wins: 0,
            total_losses: 0,
            total_time_played_minutes: 0,
            gender: '',
            country: '',
            game_name: '',
            age: 15,
        });
        setShowResults(false);
    };

    if (showResults && predictionResults && Object.keys(predictionResults).length > 0) {
        return <PredictionResults predictions={predictionResults} onPredictAgain={handlePredictAgain} />;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                padding: 3,
                backgroundColor: '#121212',
                color: 'white',
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: 4, color: 'white' }}>
                Player Statistics Form
            </Typography>

            {isError && (
                <Typography variant="h6" sx={{ color: 'red', marginBottom: 2 }}>
                    There was an error while making the prediction. Please check your input values.
                </Typography>
            )}

            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                {[
                    { label: 'Total Moves', field: 'total_moves', type: 'number' },
                    { label: 'Total Wins', field: 'total_wins', type: 'number' },
                    { label: 'Total Losses', field: 'total_losses', type: 'number' },
                    { label: 'Total Time Played (Minutes)', field: 'total_time_played_minutes', type: 'number' },
                    { label: 'Country', field: 'country', type: 'text' },
                    { label: 'Age', field: 'age', type: 'number' },
                ].map(({ label, field, type }) => (
                    <TextField
                        key={field}
                        label={label}
                        type={type}
                        value={formData[field as keyof typeof formData]}
                        onChange={(e) => handleChange(field as keyof typeof formData, e.target.value)}
                        required
                        sx={{
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiInputLabel-root': { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            },
                        }}
                    />
                ))}

                <FormControl fullWidth required>
                    <InputLabel
                        sx={{
                            color: 'white',
                            '&.Mui-focused': {
                                color: 'white',
                            },
                            '&.MuiInputLabel-shrink': {
                                top: '-5px',
                                color: 'white',
                            },
                            transition: 'top 0.2s ease-in-out',
                        }}
                        shrink={formData.game_name !== ''}
                    >
                        Game Name
                    </InputLabel>
                    <Select
                        value={formData.game_name}
                        onChange={(e) => handleChange('game_name', e.target.value)}
                        sx={{
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        }}
                    >
                        <MenuItem value="battleship">battleship</MenuItem>
                        <MenuItem value="chess">chess</MenuItem>
                        <MenuItem value="connect four">connect four</MenuItem>
                        <MenuItem value="tic tac toe">tic tac toe</MenuItem>
                        <MenuItem value="dots and boxes">dots and boxes</MenuItem>
                        <MenuItem value="go">go</MenuItem>
                        <MenuItem value="reversi">reversi</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth required>
                    <InputLabel
                        sx={{
                            color: 'white',
                            '&.Mui-focused': {
                                color: 'white',
                            },
                            '&.MuiInputLabel-shrink': {
                                top: '-5px',
                                color: 'white',
                            },
                            transition: 'top 0.2s ease-in-out',
                        }}
                        shrink={formData.gender !== ''}
                    >
                        Gender
                    </InputLabel>
                    <Select
                        value={formData.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        sx={{
                            '& .MuiInputBase-input': { color: 'white' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        }}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Non-Binary">Non-Binary</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                        marginTop: 2,
                        color: '#121212',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default FormPage;
