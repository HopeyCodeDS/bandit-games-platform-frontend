import { Box, CircularProgress, Typography } from "@mui/material";

interface StatisticsLoadingDataProps {
    message: string;
}

const StatisticsLoadingData: React.FC<StatisticsLoadingDataProps> = ({ message }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 2,
                width: '100vw'
            }}
        >
            <CircularProgress size={50} sx={{ marginBottom: 2 }} />
            <Typography variant="h6" color="white">
                {message} please wait...
            </Typography>
        </Box>
    );
};

export default StatisticsLoadingData;
