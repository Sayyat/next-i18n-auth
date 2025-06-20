import { IResponse, IUser } from "@/shared";
import { getCentralApi } from "@/shared/services/server";
import {
  ILoginPayload,
  IRegisterPayload,
} from "@/features/authentication/types/payload";
import { IToken } from "@/features/authentication/types/response";

const api = getCentralApi();

export const registerUser = (
  payload: IRegisterPayload,
): Promise<IResponse<IUser>> =>
  api.postWithHandle<IUser>("/api/auth/register/", payload);

export const loginUser = (payload: ILoginPayload): Promise<IResponse<IUser>> =>
  api.postWithHandle<IUser>("/api/auth/login/", payload);

export const refreshToken = (refresh: string): Promise<IResponse<IToken>> =>
  api.postWithHandle<IToken>("/api/auth/token/refresh/", { refresh });
