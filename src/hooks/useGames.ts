import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import Game from "../model/Game"; // Adjust the import path as needed
import {
    fetchGameById,
    fetchGames,
    fetchPurchasedGames,
    uploadAchievements,
    uploadGameMetadata
} from "../services/game/gameService.ts";
import {useAuth} from "./useAuth.ts";

export function useGames() {
    return useQuery<Game[], Error>({
        queryKey: ['games'],
        queryFn: fetchGames, // Fetch all games
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true, // Prevent unnecessary refetches
    });
}

export function useGame(id: string) {
    return useQuery<Game, Error>({
        queryKey: ['game', id],
        queryFn: () => fetchGameById(id),
        enabled: !!id,  // Only run if name is provided
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
}

export function useMyGames() {
    const {userId, isAuthenticated} = useAuth();

    return useQuery<Game[], Error>({
        queryKey: ['purchasedGames', userId],
        queryFn: () => fetchPurchasedGames(userId),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        enabled: isAuthenticated && !!userId,
    });
}

export function useUploadGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadGameMetadata,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["games"]});
        },
        onError: (error) => {
            console.error("Error uploading game:", error);
        },
    });
}

export function useUploadAchievements() {
    return useMutation({
        mutationFn: uploadAchievements,
        onError: (error) => {
            console.error("Error uploading achievements:", error);
        },
    });
}
