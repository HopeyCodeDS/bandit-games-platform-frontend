import React from "react";
import {Box, Button, CircularProgress, Rating, TextField, Typography} from "@mui/material";
import {CheckCircle2} from "lucide-react";
import textFieldStyle from "./textFieldStyle.ts";


const AddGameForm = ({
                         formData,
                         setFormData,
                         handleSubmit,
                         isPending,
                         isGameAdded,
                     }: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        setFormData((prev: any) => ({
            ...prev,
            rating: newValue || 0,
        }));
    };

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
            <TextField
                label="Game Title"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyle}
            />
            <TextField
                label="Description"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyle}

            />
            <TextField
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyle}

            />
            <TextField
                label="Price (€)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyle}

            />
            <TextField
                label="Release Date"
                name="releaseDate"
                type="date"
                InputLabelProps={{shrink: true}}
                value={formData.releaseDate}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyle}

            />

            <TextField
                label="Age Limit"
                name="ageLimit"
                type="number"
                value={formData.ageLimit}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyle}

            />

            <TextField
                label="Game URL"
                name="url"
                multiline
                value={formData.url}
                onChange={handleChange}
                fullWidth
                required
                sx={textFieldStyle}

            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    padding: "16px",
                    backgroundColor: 'rgba(255, 215, 0, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 215, 0, 0.15)'
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        color: '#FFD700',
                        fontWeight: "bold",
                        fontSize: '1.1rem'
                    }}
                >
                    Rating:
                </Typography>
                <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={handleRatingChange}
                    precision={0.5}
                    max={5}
                    sx={{
                        '& .MuiRating-iconFilled': {
                            color: '#FFD700',
                        },
                        '& .MuiRating-iconEmpty': {
                            color: 'rgba(255, 215, 0, 0.3)'
                        },
                        '& .MuiRating-iconHover': {
                            color: '#E5C100',
                        }
                    }}
                />
            </Box>

            <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={isPending || isGameAdded}
                    sx={{
                        backgroundColor: isGameAdded ? '#4CAF50' : '#FFD700',
                        color: '#000000',
                        padding: '12px 40px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: isGameAdded ? '#45a049' : '#E5C100',
                            transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    {isPending ? (
                        <CircularProgress size={24} sx={{color: '#000000'}}/>
                    ) : isGameAdded ? (
                        <>
                            <CheckCircle2 size={20} style={{marginRight: "8px"}}/>
                            Game Added!
                        </>
                    ) : (
                        "Add Game"
                    )}
                </Button>
            </Box>
            {isGameAdded && (
                <Typography
                    color="success.main"
                    textAlign="center"
                    mt={2}
                    sx={{
                        animation: "fadeIn 0.5s ease-in",
                    }}
                >
                    Game added successfully!
                </Typography>
            )}
        </form>
    );
};

export default AddGameForm;
