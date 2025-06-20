/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { IPaginatedResponse, IResponse } from "@/shared";
import { useCentralApi } from "@/shared/services/client";
import { IProfile } from "@/features/authentication/types/profile";
import { ICity } from "@/features/authentication/types/city";
import {
  IResetPayload,
  IResetResponse,
} from "@/features/authentication/types/payload";

export interface IAuthenticationApi {
  resetPassword: (payload: IResetPayload) => Promise<IResponse<IResetResponse>>;
  getCities: () => Promise<IResponse<IPaginatedResponse<ICity>>>;
  getProfile: () => Promise<IResponse<IProfile>>;
  updateProfile: (data: Partial<IProfile>) => Promise<IResponse<IProfile>>;
  updateProfileImage: (file: File) => Promise<IResponse<IProfile>>;
}

export const useAuthenticationApi = (): IAuthenticationApi => {
  const api = useCentralApi();

  const resetPassword = async (
    payload: IResetPayload,
  ): Promise<IResponse<IResetResponse>> => {
    return api.postWithHandle<IResetResponse>("/api/password-reset/", {
      email: payload.email,
    });
  };

  const getCities = (): Promise<IResponse<IPaginatedResponse<ICity>>> =>
    api.getWithHandle<IPaginatedResponse<ICity>>("/api/cities/");

  const getProfile = (): Promise<IResponse<IProfile>> =>
    api.getWithHandle<IProfile>("/api/user/profile/");

  const updateProfile = (
    data: Partial<IProfile>,
  ): Promise<IResponse<IProfile>> =>
    api.patchWithHandle<IProfile>("/api/user/profile/", data);

  const updateProfileImage = (
    imageFile: File,
  ): Promise<IResponse<IProfile>> => {
    const formData = new FormData();
    formData.append("file", imageFile);
    return api.postFormWithHandle<IProfile>(
      "/api/user/profile/photo/",
      formData,
    );
  };

  return {
    resetPassword,
    getCities,
    getProfile,
    updateProfile,
    updateProfileImage,
  };
};
