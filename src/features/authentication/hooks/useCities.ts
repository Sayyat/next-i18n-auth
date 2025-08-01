import { useQuery } from "@tanstack/react-query";
import { useAuthenticationApi } from "@/features/authentication/services/client";
import { QUERY_KEYS } from "@/features/authentication/lib/queryKeys"; // Import your API functions

/**
 * Unified Cities Hook: Fetch & Mutate Cities Data
 */
export const useCities = () => {
  const { getCities } = useAuthenticationApi();
  // Fetch cities list
  const citiesQuery = useQuery({
    queryKey: QUERY_KEYS.cities,
    queryFn: getCities,
  });

  return {
    ...citiesQuery, // Includes `data`, `isLoading`, `error`, etc.
  };
};
