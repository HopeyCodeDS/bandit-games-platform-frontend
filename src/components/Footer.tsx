import {Box, Typography} from "@mui/material";

const Footer = () => (
    <Box
        component="footer"
        sx={{
            mt: "auto", // Pushes the footer to the bottom
            background: "linear-gradient(90deg, #000000, #1A1A1A)", // Black gradient
            color: "#FFD700", // Golden text
            textAlign: "center",
            py: 2, // Adds vertical padding
            px: 1, // Adds horizontal padding
        }}
    >
        <Typography
            variant="body2"
            sx={{
                fontWeight: "bold",
                letterSpacing: "0.5px",
                fontFamily: "Raleway, sans-serif",
            }}
        >
            © {new Date().getFullYear()} Bandit Games. All rights reserved.
        </Typography>
    </Box>
);

export default Footer;
