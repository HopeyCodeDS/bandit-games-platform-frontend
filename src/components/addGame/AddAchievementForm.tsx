import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {CheckCircle2} from "lucide-react";
import textFieldStyle from "./textFieldStyle.ts";


const AddAchievements = ({
                             achievementsJson,
                             handleAchievementsChange,
                             handleUploadAchievements,
                             isUploadingAchievements,
                             jsonError,
                             showSuccess,
                         }: any) => {
    return (
        <Box sx={{
            mt: 3,
            padding: "24px",
            borderRadius: '12px',
            border: '1px solid rgba(255, 215, 0, 0.15)'
        }}>
            <Typography
                variant="h6"
                sx={{
                    color: '#FFD700',
                    fontWeight: 'bold',
                    mb: 2
                }}
            >
                Game Achievements
            </Typography>
            <TextField
                label="Achievements JSON"
                multiline
                rows={6}
                value={achievementsJson}
                onChange={handleAchievementsChange}
                fullWidth
                error={!!jsonError}
                helperText={jsonError}
                placeholder='{"achievements": [{"gameName": "gameName", "name": "achievement name", ...}]}'
                sx={textFieldStyle}

            />
            <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                {showSuccess && (
                    <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle2 className="text-green-500" size={24}/>
                        <Typography color="success.main">
                            Achievements uploaded successfully!
                        </Typography>
                    </Box>
                )}
                <Button
                    variant="contained"
                    onClick={handleUploadAchievements}
                    disabled={isUploadingAchievements || !achievementsJson}
                    sx={{
                        backgroundColor: '#FFD700',
                        color: '#000000',
                        padding: '10px 24px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#E5C100',
                            transform: 'translateY(-2px)',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'rgba(255, 215, 0, 0.3)',
                            color: 'rgba(0, 0, 0, 0.5)'
                        },
                        transition: 'all 0.2s ease',
                    }}
                >
                    {isUploadingAchievements ? (
                        <CircularProgress size={24} sx={{color: '#000000'}}/>
                    ) : (
                        "Upload Achievements"
                    )}
                </Button>

            </Box>
        </Box>
    );
};

export default AddAchievements;
