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

export const registerUser = async (
  payload: IRegisterPayload,
): Promise<IResponse<IUser>> =>
  await postWithHandle<IUser>("/api/auth/register/", payload);

export const loginUser = async (
  payload: ILoginPayload,
): Promise<IResponse<IUser>> =>
  await postWithHandle<IUser>("/api/auth/login/", payload);

export const refreshToken = async (
  refresh: string,
): Promise<IResponse<IToken>> =>
  await postWithHandle<IToken>("/api/auth/token/refresh/", { refresh });
