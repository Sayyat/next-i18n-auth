/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { IPaginatedResponse, IPaginationParams, IResponse } from "@/shared";
import { useCentralApi } from "@/shared/services/client";
import { ICity } from "@/features/cities/types/city";

export interface ICitiesApi {
  getCities: (
    params?: IPaginationParams,
  ) => Promise<IResponse<IPaginatedResponse<ICity>>>;
  getCity: (cityId: number, lang?: string) => Promise<IResponse<ICity>>;
}

export const useCitiesApi = (): ICitiesApi => {
  const api = useCentralApi();

  const getCities = (
    params?: IPaginationParams,
  ): Promise<IResponse<IPaginatedResponse<ICity>>> =>
    api.getPaginatedWithHandle<ICity>(`/api/v1/locations/cities`, params);

  const getCity = (
    cityId: number,
    lang: string = "ru",
  ): Promise<IResponse<ICity>> =>
    api.getWithHandle<ICity>(`/api/v1/locations/cities/${cityId}?lang=${lang}`);

  return {
    getCities,
    getCity,
  };
};
