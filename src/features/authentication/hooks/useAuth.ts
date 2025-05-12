import {signIn, signOut} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/features/authentication/lib/queryKeys";
import {tokenStore} from "@/shared/lib/tokenStore";
import {toast} from "react-toastify";
import {IRegisterPayload} from "@/features/authentication/types/payload";


export const useAuth = () => {
    const queryClient = useQueryClient();

    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const response = await signIn("login", {
                ...credentials,
                redirect: false, // Prevent full-page reload
            });

            console.log({response})

            if (response?.error) throw new Error(response.code);
            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.session});
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.profile});
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    // Register Mutation
    const registerMutation = useMutation({
        mutationFn: async (credentials: IRegisterPayload) => {
            const response = await signIn("register", {
                ...credentials,
                redirect: false,
            });

            if (response?.error) throw new Error(response.code);
            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.session});
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.profile});
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    // Logout Mutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            tokenStore.clear();
            await signOut({redirect: false});
        },
        onSuccess: async () => {
            queryClient.removeQueries({queryKey: QUERY_KEYS.session});
            queryClient.removeQueries({queryKey: QUERY_KEYS.profile});
            await queryClient.refetchQueries({queryKey: QUERY_KEYS.session});
        },
    });

    return {
        loginMutation,
        registerMutation,
        logoutMutation,
    };
};
