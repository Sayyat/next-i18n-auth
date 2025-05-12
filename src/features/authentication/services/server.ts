import {IUser, IResponse} from "@/shared";
import {apiClient} from "@/shared/services/server";
import {createApiService} from "@/shared/services/api";
import {IRegisterPayload, ILoginPayload} from "@/features/authentication/types/payload";
import {IToken} from "@/features/authentication/types/response";


const api = createApiService(apiClient);

/**
 * Register new user
 */
export const registerUser = (
    payload: IRegisterPayload
): Promise<IResponse<IUser>> =>
    api.postWithHandle<IUser>("/api/auth/register/", payload);

/**
 * Login user
 */
export const loginUser = (
    payload: ILoginPayload
): Promise<IResponse<IUser>> =>
    api.postWithHandle<IUser>("/api/auth/login/", payload);

/**
 * Refresh access token
 */
export const refreshToken = (
    refresh: string
): Promise<IResponse<IToken>> =>
    api.postWithHandle<IToken>("/api/auth/token/refresh/", {refresh});
