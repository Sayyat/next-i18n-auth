import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProfile, updateProfile, updateProfileImage} from "../services/client";
import {IProfile} from "@/features/authentication/types/profile";
import {QUERY_KEYS} from "@/features/authentication/lib/queryKeys";

/**
 * Unified Profile Hook: Fetch & Mutate Profile Data
 */
export const useProfile = () => {
    const queryClient = useQueryClient();

    // Fetch profile data
    const profileQuery = useQuery<IProfile>({
        queryKey: QUERY_KEYS.profile,
        queryFn: async () => {
            const response = await getProfile();
            if (!response.success) throw new Error(response.error); // ✅ Throw error so React Query can handle it
            return response.data;
        },
    });

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationKey: QUERY_KEYS.updateProfile,
        mutationFn: async (data: Partial<IProfile>) => {
            const response = await updateProfile(data);
            if (!response.success) throw new Error(response.error); // ✅ Throw error if API fails
            return response.data;
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.profile}); // ✅ Refresh profile
            // toast.success("Profile updated successfully!");
        },
        onError: (error) => {
            console.error("Profile update error:", error);
            // toast.error(error.message || "Failed to update profile.");
        },
    });

    // Update profile image mutation
    const updateProfileImageMutation = useMutation({
        mutationKey: QUERY_KEYS.updateProfileImage,
        mutationFn: async (file: File) => {
            const response = await updateProfileImage(file);
            if (!response.success) throw new Error(response.error); // ✅ Throw error if API fails
            return response.data;
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.profile});
            // toast.success("Profile image updated successfully!");
        },
        onError: (error) => {
            console.error("Image upload error:", error);
            // toast.error(error.message || "Failed to upload image.");
        },
    });

    return {
        ...profileQuery, // Includes `data`, `isLoading`, `error`, etc.
        updateProfileMutation,
        updateProfileImageMutation
    };
};
