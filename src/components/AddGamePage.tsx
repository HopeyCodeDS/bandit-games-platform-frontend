import React, {useState} from "react";
import {Box, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useUploadAchievements, useUploadGame} from "../hooks/useGames"; // Import the custom hook
import AddGameForm from "./addGame/AddGameForm.tsx";
import AddAchievementForm from "./addGame/AddAchievementForm.tsx";

const AddGamePage = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        genre: "",
        price: "",
        releaseDate: "",
        rating: 0,
        ageLimit: "",
        url: "",
    });

    const [achievementsJson, setAchievementsJson] = useState("");
    const [jsonError, setJsonError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isGameAdded, setIsGameAdded] = useState(false);
    const {mutate: uploadGame, isPending} = useUploadGame(); // Use the custom hook
    const {mutate: uploadAchievements, isPending: isUploadingAchievements} = useUploadAchievements();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleAchievementsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAchievementsJson(e.target.value);
        setJsonError(null);
    };

    const handleUploadAchievements = () => {
        try {
            // Validate JSON format
            const achievements = JSON.parse(achievementsJson);

            // Validate required structure
            if (!achievements.achievements || !Array.isArray(achievements.achievements)) {
                throw new Error('Invalid achievements format. Must include "achievements" array.');
            }

            // Validate each achievement
            achievements.achievements.forEach((achievement: any, index: number) => {
                if (!achievement.gameName || !achievement.name || !achievement.description ||
                    !achievement.criteria || !Array.isArray(achievement.criteria) ||
                    typeof achievement.rewardPoints !== 'number') {
                    throw new Error(`Invalid achievement format at index ${index}`);
                }
            });

            uploadAchievements(achievements, {
                onSuccess: () => {
                    setJsonError(null);
                    setAchievementsJson("");
                    setShowSuccess(true);
                    setTimeout(() => {
                        navigate("/store");
                    }, 3000);
                },
                onError: (error: Error) => {
                    setJsonError(error.message || "Failed to upload achievements. Please try again.");
                    console.error("Error uploading achievements:", error);
                },
            });
        } catch (e: any) {
            setJsonError(e.message || "Invalid JSON format. Please check your input.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const payload = {
            name: formData.name,
            description: formData.description,
            genre: formData.genre.toUpperCase(),
            price: parseFloat(formData.price),
            releaseDate: formData.releaseDate,
            rating: formData.rating,
            ageLimit: parseInt(formData.ageLimit),
            url: formData.url,
        };

        // Use the mutation function to upload game
        uploadGame(payload, {
            onSuccess: () => {
                // navigate("/store"); // Redirect to store after success
                setIsGameAdded(true);
                setTimeout(() => setIsGameAdded(false), 3000);
            },
            onError: (error) => {
                console.error("Error uploading game:", error);
                setError("Failed to add the game. Please try again.");
            },
        });
    };


    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                minWidth: "100vw", // Ensures full width
                padding: "120px 20px 40px 20px",
                backgroundColor: "#121212",
                boxSizing: "border-box",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    padding: "40px",
                    width: "100%",
                    maxWidth: "800px", // Increased from 600px
                    borderRadius: "16px",
                    backgroundColor: "#1A1A1A", // Dark theme
                    border: "1px solid rgba(255, 215, 0, 0.15)", // Subtle gold border
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    gutterBottom
                    sx={{
                        color: "#FFD700",
                        fontWeight: "bold",
                        marginBottom: "32px",
                        letterSpacing: "0.5px"
                    }}
                >
                    Add New Game
                </Typography>


                {error && (
                    <Typography color="error" textAlign="center" mb={2}>
                        {error}
                    </Typography>
                )}
                <AddGameForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                    isGameAdded={isGameAdded}
                    error={error}
                />

                <AddAchievementForm
                    achievementsJson={achievementsJson}
                    handleAchievementsChange={handleAchievementsChange}
                    handleUploadAchievements={handleUploadAchievements}
                    isUploadingAchievements={isUploadingAchievements}
                    jsonError={jsonError}
                    showSuccess={showSuccess}
                />
            </Paper>
        </Box>
    );
};

export default AddGamePage;
