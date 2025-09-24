import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import SecurityContext from "../context/SecurityContext.ts";
import playerAvatar from '../assets/player-avatar.png';
import FriendsList from "./profile/FriendList.tsx";
import DemographicPopup from "./profile/DemographicPopup.tsx";
import {useUserProfile} from "../hooks/useUserProfile.ts";

export const ProfilePage = () => {
    const {loggedInUser, isProfileComplete} = useContext(SecurityContext); // Use SecurityContext to access the loggedInUser
    const {data: userData} = useUserProfile(loggedInUser?.userId);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    useEffect(() => {
        if (userData && !isProfileComplete) {
            setIsFormOpen(true);
        }
    }, [userData, isProfileComplete]);

    if (!userData) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh', // Full screen height for centering
                    minWidth: '100vw', // Full screen width for centering
                    width: '100%',
                    backgroundColor: '#1f1f1f', // Match background color
                    color: '#fff', // Ensure color consistency
                }}
            >
                <Box sx={{textAlign: 'center'}}>
                    <CircularProgress size={50} sx={{color: '#4caf50'}}/>
                    <Typography variant="h6" sx={{marginTop: 2}}>
                        Loading profile, please wait...
                    </Typography>
                </Box>
            </Box>
        );
    }


    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
            minHeight: "100vh", // Ensures full height
            minWidth: "100vw", // Ensures full width
            padding: "50px 10px", // Padding on all sides
            boxSizing: "border-box",
            backgroundColor: "#121212",
        }}>
            <DemographicPopup
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                userData={userData}
                isProfileComplete={isProfileComplete}
            />

            <Box sx={{mt: 5, display: 'flex', gap: 4, width: "100%", minWidth: "100vw"}}>
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "50px",
                }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{
                                backgroundColor: "#1f1f1f",
                                color: "#FFD700",
                                borderRadius: '12px',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
                            }}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            src={playerAvatar}
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                border: "3px solid #FFD700",
                                            }}
                                        />
                                    }
                                    title={<Typography
                                        variant="h5" sx={{
                                        color: "#FFD700",
                                        fontWeight: "bold"
                                    }}>{userData.firstName} {userData.lastName}</Typography>}
                                    subheader={
                                        <Typography sx={{color: "#E5C100"}}>
                                            Email: {userData.email}
                                        </Typography>
                                    }
                                />
                                <Divider sx={{backgroundColor: "#FFD700"}}/>
                                <CardContent>
                                    <Typography variant="body1" sx={{color: "#fff"}}>
                                        <strong>Gender:</strong> {userData.gender}<br/>
                                        <strong>Birth Date:</strong> {userData.birthDate}<br/>
                                        <strong>Country:</strong> {userData.country}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card sx={{
                                backgroundColor: "#1f1f1f",
                                color: "#FFD700",
                                borderRadius: '12px',
                                marginTop: 3,
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
                            }}>
                                <CardHeader title="Game Statistics" sx={{color: "#FFD700", fontWeight: "bold"}}/>
                                <Divider sx={{backgroundColor: "#FFD700"}}/>
                                <CardContent>
                                    <Typography variant="body1" sx={{color: "#fff"}}>
                                        <strong>Games Played:</strong> {userData.gamesPlayed || 0}<br/>
                                        <strong>Games Won:</strong> {userData.gamesWon || 0}<br/>
                                        <strong>Rating:</strong> {userData.rating ? userData.rating.toFixed(1) : "N/A"}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Card sx={{
                                backgroundColor: "#1f1f1f",
                                color: "#FFD700",
                                borderRadius: '12px',
                                marginTop: 3,
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
                            }}>
                                <CardContent>
                                    <FriendsList
                                        friends={userData.friends}
                                        userId={loggedInUser?.userId || ''}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            {/* Achievements Card */}
                            <Card sx={{
                                backgroundColor: "#1f1f1f",
                                color: "#FFD700",
                                borderRadius: '12px',
                                marginBottom: 3,
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
                            }}>
                                <CardHeader title="Game Achievements" sx={{color: "#FFD700", fontWeight: "bold"}}/>
                                <Divider sx={{backgroundColor: "#FFD700"}}/>
                                <CardContent>
                                    {userData?.gameAchievements ? (
                                        Object.entries(userData.gameAchievements).map(([gameKey, achievements], index) => {
                                            // Extract game name and description from the key
                                            const gameDetails = /gameName=(.*?), description=(.*?),/.exec(gameKey);
                                            const gameName = gameDetails?.[1] || "Unknown Game";
                                            const gameDescription = gameDetails?.[2] || "No description available.";

                                            return (
                                                <Card key={index} sx={{
                                                    marginBottom: 3,
                                                    backgroundColor: "#1f1f1f",
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
                                                }}>
                                                    <CardContent>
                                                        <Typography variant="h6"
                                                                    sx={{marginBottom: 1, color: "#FFD700"}}>
                                                            {gameName}
                                                        </Typography>
                                                        <Divider sx={{backgroundColor: "#FFD700", marginBottom: 2}}/>
                                                        <Typography variant="body2"
                                                                    sx={{marginBottom: 2, color: "#fff"}}>
                                                            {gameDescription}
                                                        </Typography>
                                                        <Typography variant="subtitle1" sx={{color: "#4CAF50"}}>Unlocked
                                                            Achievements</Typography>
                                                        <Box sx={{marginBottom: 2}}>
                                                            {achievements
                                                                .filter((achievement) => !achievement.locked)
                                                                .map((achievement, index) => (
                                                                    <Chip
                                                                        key={index}
                                                                        label={achievement.achievementName}
                                                                        sx={{
                                                                            backgroundColor: "#4CAF50",
                                                                            color: "#fff",
                                                                            margin: "5px",
                                                                            fontWeight: "bold"
                                                                        }}
                                                                    />
                                                                ))}
                                                            {achievements.filter((achievement) => !achievement.locked).length === 0 && (
                                                                <Typography variant="body2" sx={{color: "#bbb"}}>
                                                                    No unlocked achievements!
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                        <Typography variant="subtitle1" sx={{color: "#FF6F61"}}>Locked
                                                            Achievements</Typography>
                                                        <List>
                                                            {achievements
                                                                .filter((achievement) => achievement.locked)
                                                                .map((achievement, index) => (
                                                                    <ListItem key={index}>
                                                                        <ListItemIcon>
                                                                            <Avatar
                                                                                sx={{
                                                                                    backgroundColor: "#444",
                                                                                }}
                                                                            >
                                                                                🔒
                                                                            </Avatar>
                                                                        </ListItemIcon>
                                                                        <ListItemText
                                                                            primary={achievement.achievementName}
                                                                            sx={{color: "#bbb"}}
                                                                        />
                                                                    </ListItem>
                                                                ))}
                                                            {achievements.filter((achievement) => achievement.locked).length === 0 && (
                                                                <Typography variant="body2" sx={{color: "#bbb"}}>
                                                                    No locked achievements!
                                                                </Typography>
                                                            )}
                                                        </List>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })
                                    ) : (
                                        <Typography variant="body2" sx={{color: "#bbb"}}>
                                            No achievements found.
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );

};

export default ProfilePage;
