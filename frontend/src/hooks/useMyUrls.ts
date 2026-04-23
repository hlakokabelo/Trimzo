// hooks/useMyUrls.ts

import { useQuery } from "@tanstack/react-query";
import { getMyUrls } from "../services/dbServices";

export const useMyUrls = (enabled: boolean) => {

  return useQuery({
    queryKey: ["myUrls"],
    queryFn: async () => {
      const res = await getMyUrls();
      return res.data;
    },
    enabled,
  });
};
