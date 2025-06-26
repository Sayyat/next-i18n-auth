/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use server";
import { IResponse, IUser } from "@/shared";
import { postWithHandle } from "@/shared/services/server";
import {
  ILoginPayload,
  IRegisterPayload,
} from "@/features/authentication/types/payload";
import { IToken } from "@/features/authentication/types/response";

export const registerUser = (
  payload: IRegisterPayload,
): Promise<IResponse<IUser>> =>
  postWithHandle<IUser>("/api/auth/register/", payload);

export const loginUser = (payload: ILoginPayload): Promise<IResponse<IUser>> =>
  postWithHandle<IUser>("/api/auth/login/", payload);

export const refreshToken = (refresh: string): Promise<IResponse<IToken>> =>
  postWithHandle<IToken>("/api/auth/token/refresh/", { refresh });
