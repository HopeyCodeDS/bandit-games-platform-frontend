// Create a new file: hooks/useFriendManagement.ts

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addFriend, removeFriend, searchUserByUsername} from '../services/user/friendService.ts';
import {useState} from 'react';

export const useFriendManagement = (userId: string) => {
    const [searchResult, setSearchResult] = useState<any>(null);
    const queryClient = useQueryClient();

    // Search user mutation
    const searchUserMutation = useMutation({
        mutationFn: searchUserByUsername,
        onSuccess: (data) => {
            setSearchResult(data);
        },
        onError: () => {
            setSearchResult(null);
        }
    });

    // Add friend mutation
    const addFriendMutation = useMutation({
        mutationFn: (friendId: string) => addFriend(userId, friendId),
        onSuccess: () => {
            // Invalidate and refetch user profile data
            queryClient.invalidateQueries({queryKey: ['userProfile', userId]});
            setSearchResult(null); // Clear search result after adding
        }
    });

    // Remove friend mutation
    const removeFriendMutation = useMutation({
        mutationFn: (friendId: string) => removeFriend(userId, friendId),
        onSuccess: () => {
            // Invalidate and refetch user profile data
            queryClient.invalidateQueries({queryKey: ['userProfile', userId]});
        }
    });

    return {
        searchResult,
        isSearching: searchUserMutation.isPending,
        searchError: searchUserMutation.error,
        isAddingFriend: addFriendMutation.isPending,
        addFriendError: addFriendMutation.error,
        isRemovingFriend: removeFriendMutation.isPending,
        removeFriendError: removeFriendMutation.error,
        searchUser: searchUserMutation.mutate,
        handleAddFriend: addFriendMutation.mutate,
        handleRemoveFriend: removeFriendMutation.mutate
    };
};