import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import SecurityContext from "../context/SecurityContext.ts";
import logo from '../assets/logo.png';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const navigate = useNavigate();
    const {logout, login, register, loggedInUser} = useContext(SecurityContext);
    const hasRole = (role: string) => loggedInUser?.roles.includes(role);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Open profile menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Close profile menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navButtonStyle = (path: string) => ({
        fontSize: "1.1rem",
        color: '#FFD700',
        padding: '8px 16px',
        position: 'relative', // For absolute positioning of pseudo-element
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-4px', // Adjust distance from text
            left: 0,
            width: '100%',
            height: '3px', // Thicker line
            backgroundColor: location.pathname === path ? '#FFD700' : 'transparent',
            boxShadow: location.pathname === path ? '0 0 8px #FFD700' : 'none', // Add glow effect
            transition: 'all 0.3s ease'
        },
        '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease'
        }
    });

    return (
        <AppBar position="fixed" color="primary" elevation={5} sx={{
            background: "linear-gradient(90deg, #1A1A1A, #000000)", // Dark gray to black gradient
            color: "#FFD700",
        }}>
            <Toolbar>
                {/* Logo */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="logo"
                    onClick={() => navigate("/")}
                    sx={{mr: 2}}
                >
                    <img src={logo} alt="Logo" style={{width: 80, height: 80}}/>
                </IconButton>

                {/* Title */}
                <Typography variant="h4" component="div" sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    fontFamily: "Nunito, sans-serif",
                }}>
                    Bandit Online Games
                </Typography>

                {/* Buttons */}
                <Box sx={{display: "flex", gap: 2}}>
                    {loggedInUser ? (
                        <>
                            <Button color="inherit" onClick={() => navigate("/store")} sx={navButtonStyle("/store")}>
                                Game Store
                            </Button>
                            {hasRole("normal-player") && !hasRole("admin") && (
                                <Button color="inherit" onClick={() => navigate("/my-games")}
                                        sx={navButtonStyle("/my-games")}>
                                    My Games
                                </Button>
                            )}

                            {hasRole("normal-player") && !hasRole("admin") && (
                                <Button color="inherit" onClick={() => navigate("/profile")}
                                        sx={navButtonStyle("/profile")}>
                                    My Profile
                                </Button>
                            )}

                            {hasRole("admin") && (
                                <>
                                    <Button color="inherit" onClick={() => navigate("/statistics")}
                                            sx={navButtonStyle("/statistics")}>
                                        Statistics
                                    </Button>
                                    <Button color="inherit" onClick={() => navigate("/analytics")}
                                            sx={navButtonStyle("/analytics")}>
                                        Analytics
                                    </Button>
                                    <Button color="inherit" onClick={() => navigate("/predictions")}
                                            sx={navButtonStyle("/predictions")}>
                                        Predictions
                                    </Button>
                                    <Button color="inherit" onClick={() => navigate("/add-game")}
                                            sx={navButtonStyle("/add-game")}>
                                        Add New Game
                                    </Button>
                                </>
                            )}

                            {/* ProfilePage Picture and Menu */}
                            <IconButton onClick={handleMenuOpen} color="inherit">
                                <Avatar alt={loggedInUser?.name || "Profile"} src="/src/assets/player-avatar.png" sx={{
                                    width: 40,
                                    height: 40,
                                    border: '2px solid #FFD700',
                                    boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)',
                                    backgroundColor: '#444',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }
                                }}/>
                            </IconButton>

                            {/* Dropdown Menu */}
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    sx: {
                                        backgroundColor: '#242424',
                                        border: '1px solid rgba(255, 215, 0, 0.2)',
                                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.1)',
                                        minWidth: '200px',
                                        mt: 1.5  // Margin from the avatar
                                    }
                                }}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                <MenuItem
                                    onClick={() => {
                                        logout(() => navigate("/"));
                                        handleMenuClose();
                                    }}
                                    sx={navButtonStyle("/")}
                                >
                                    Logout
                                    <LogoutIcon sx={{ml: 1}}/> {/* Add margin-right for spacing */}
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => login()} sx={navButtonStyle("/")}>
                                Log In
                            </Button>
                            <Button color="inherit" onClick={() => register()} sx={navButtonStyle("/")}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
