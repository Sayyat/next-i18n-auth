/*
 * Copyright (c) 2025. Sayat Raykul
 */

import { useQuery } from "@tanstack/react-query";
import { useCitiesApi } from "@/features/cities/services/client";

export const useCitiesQuery = () => {
  const { getCities } = useCitiesApi();
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await getCities();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    refetchInterval: 60000, // ⏱️ автообновление каждую минуту
    staleTime: 30000, // данные считаются "свежими" в течение 30 секунд
  });
};
