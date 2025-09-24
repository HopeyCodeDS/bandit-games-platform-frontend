import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import Friend from "../../model/Friend.ts";
import FriendSearch from "./FriendSearch.tsx";
import {useFriendManagement} from '../../hooks/useFriendManagement.ts';

export const FriendsList = ({friends, userId}: { friends: Friend[], userId: string }) => {
    const {
        isRemovingFriend,
        handleRemoveFriend
    } = useFriendManagement(userId);

    return (
        <Card sx={{
            backgroundColor: "#1f1f1f",
            color: "#fff",
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
        }}>
            <CardHeader title="My Friends" sx={{color: "#FFD700", fontWeight: "bold"}}/>
            <Divider sx={{backgroundColor: "#FFD700"}}/>
            <CardContent>
                {/* Search is always visible */}
                <FriendSearch userId={userId} friends={friends}/>

                {/* Show friends list if there are friends */}
                {friends && friends.length > 0 ? (

                    <List>
                        {friends.map((friend) => (
                            <ListItem key={friend.friendId} sx={{
                                backgroundColor: '#2c2c2c',
                                borderRadius: '8px',
                                mb: 2,
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
                            }}>
                                <ListItemIcon>
                                    <Avatar sx={{backgroundColor: "#FFD700", color: "#000"}}>
                                        {friend.username[0].toUpperCase()}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography sx={{color: "#fff", fontWeight: "bold"}}>
                                            {friend.username}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            component="span"
                                            sx={{
                                                color: '#bbb',
                                                '& span': {
                                                    color: '#4CAF50',
                                                    fontWeight: 'bold'
                                                }
                                            }}
                                        >
                                            Rating: <span>{friend.rating}</span> |
                                            Country: <span>{friend.country}</span>
                                        </Typography>
                                    }
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleRemoveFriend(friend.friendId)}
                                    disabled={isRemovingFriend}
                                    sx={{
                                        color: '#FF6F61',
                                        borderColor: '#FF6F61',
                                        '&:hover': {
                                            backgroundColor: '#FF6F61',
                                            color: '#fff'
                                        }
                                    }}
                                >
                                    {isRemovingFriend ? (
                                        <CircularProgress size={24} sx={{color: '#FF6F61'}}/>
                                    ) : (
                                        'Remove Friend'
                                    )}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box sx={{
                        textAlign: 'center',
                        py: 3,
                        backgroundColor: '#2c2c2c',
                        borderRadius: 1,
                        mt: 2
                    }}>
                        <Typography color="#bbb">
                            No friends added yet. Use the search bar above to find and add friends.
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default FriendsList;