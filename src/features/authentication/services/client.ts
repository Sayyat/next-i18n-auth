/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { IPaginatedResponse, IResponse } from "@/shared";
import { createApiService } from "@/shared/services/api";
import { apiClient } from "@/shared/services/client";
import { IProfile } from "@/features/authentication/types/profile";
import { ICity } from "@/features/authentication/types/city";
import {
  IResetPayload,
  IResetResponse,
} from "@/features/authentication/types/payload";

const api = createApiService(apiClient);

/**
 * Reset Password
 */
export const resetPassword = async (
  payload: IResetPayload,
): Promise<IResponse<IResetResponse>> => {
  return api.postWithHandle<IResetResponse>("/api/password-reset/", {
    email: payload.email,
  });
};

/**
 * Get Cities list
 */
export const getCities = (): Promise<IResponse<IPaginatedResponse<ICity>>> =>
  api.getWithHandle<IPaginatedResponse<ICity>>("/api/cities/");

/**
 * Get User Profile
 */
export const getProfile = (): Promise<IResponse<IProfile>> =>
  api.getWithHandle<IProfile>("/api/user/profile/");

/**
 * Update Profile (without Image)
 */
export const updateProfile = (
  data: Partial<IProfile>,
): Promise<IResponse<IProfile>> =>
  api.patchWithHandle<IProfile>("/api/user/profile/", data);

/**
 * Update Profile Image
 */
export const updateProfileImage = (
  imageFile: File,
): Promise<IResponse<IProfile>> => {
  const formData = new FormData();
  formData.append("file", imageFile);
  return api.postFormWithHandle<IProfile>("/api/user/profile/photo/", formData);
};
