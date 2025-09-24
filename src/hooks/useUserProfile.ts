import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import UserData from '../model/UserData';
import {fetchUserProfile, updateUserDemographics} from '../services/user/userService.ts';

type DemographicsUpdate = Pick<UserData, 'userId' | 'birthDate' | 'gender' | 'country'>;


export function useUserProfile(userId: string | undefined) {
    return useQuery<UserData, Error>({
        queryKey: ['userProfile', userId],
        queryFn: () => fetchUserProfile(userId),
        enabled: !!userId, // Only fetch if userId is provided
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        refetchOnWindowFocus: false,
    });
}

export function useUpdateDemographics() {
    const queryClient = useQueryClient();

    const mutation = useMutation<UserData, Error, DemographicsUpdate>({
        mutationFn: (data: DemographicsUpdate) => updateUserDemographics(data),
        onSuccess: (updatedUser, variables) => {
            // Update the cache with new user data
            queryClient.setQueryData(['userProfile', variables.userId], updatedUser);

            // Invalidate the query to ensure consistency
            queryClient.invalidateQueries({
                queryKey: ['userProfile', variables.userId]
            });
        },
    });

    const updateDemographics = async (data: DemographicsUpdate) => {
        try {
            const result = await mutation.mutateAsync(data);
            return result;
        } catch (error) {
            console.error('Failed to update demographics:', error);
            throw error;
        }
    };

    return {
        updateDemographics,
        isLoading: mutation.isPending,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError
    };
}
