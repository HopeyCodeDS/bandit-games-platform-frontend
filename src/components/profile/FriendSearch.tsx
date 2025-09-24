import {Avatar, Box, Button, Card, CardContent, CircularProgress, TextField, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import {useFriendManagement} from "../../hooks/useFriendManagement.ts";
import Friend from "../../model/Friend.ts";

const FriendSearch = ({userId, friends}: { userId: string, friends: Friend[] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        searchResult,
        isSearching,
        searchError,
        isAddingFriend,
        searchUser,
        handleAddFriend
    } = useFriendManagement(userId);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            searchUser(searchQuery.trim());
        }
    };

    const isAlreadyFriend = useMemo(() => {
        if (!searchResult) return false;
        return friends.some(friend => friend.username === searchResult.username);
    }, [searchResult, friends]);


    return (
        <Box sx={{mb: 2}}>
            <form onSubmit={handleSearch}>
                <Box sx={{display: 'flex', gap: 1, mb: 2}}>
                    <TextField
                        fullWidth
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search friend by username"
                        sx={{
                            backgroundColor: '#1f1f1f',
                            input: {color: '#fff'},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {borderColor: '#FFD700'},
                                '&:hover fieldset': {borderColor: '#E5C100'},
                                '&.Mui-focused fieldset': {borderColor: '#FFD700', boxShadow: '0 0 5px #FFD700'}

                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isSearching}
                        sx={{
                            backgroundColor: '#FFD700',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#E5C100'
                            },
                            minWidth: '100px'
                        }}
                    >
                        {isSearching ? <CircularProgress size={24} sx={{color: '#000'}}/> : 'Search'}
                    </Button>
                </Box>
            </form>

            {searchError && (
                <Typography color="error" sx={{mb: 2}}>
                    User not found
                </Typography>
            )}

            {searchResult && (
                <Card sx={{
                    backgroundColor: '#1f1f1f',
                    mb: 3,
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
                }}>
                    <CardContent sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                        <Avatar sx={{bgcolor: '#444'}}>
                            {searchResult.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box sx={{flex: 1}}>
                            <Typography color="white" sx={{fontWeight: 'bold'}}>{searchResult.username}</Typography>
                            <Typography color="#bbb" variant="body2">
                                {searchResult.country}
                            </Typography>
                        </Box>
                        {isAlreadyFriend ? (
                            <Button
                                variant="contained"
                                disabled
                                sx={{
                                    bgcolor: '#666',
                                    '&:disabled': {
                                        color: '#fff',
                                        opacity: 0.7
                                    }
                                }}
                            >
                                Already Friends
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#45A049'
                                    }
                                }}
                                onClick={() => handleAddFriend(searchResult.userId)}
                                disabled={isAddingFriend}
                            >
                                {isAddingFriend ? <CircularProgress size={24}/> : 'Add Friend'}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default FriendSearch;