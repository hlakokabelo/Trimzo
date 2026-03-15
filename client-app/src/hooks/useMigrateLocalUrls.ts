import { useQueryClient } from "@tanstack/react-query";
import { saveUrls } from "../services/dbServices";
import type { ShortUrlData } from "../types/url.types";

export const useMigrateLocalUrls = () => {
  const queryClient = useQueryClient();

  const migrate = async () => {
    const stored: ShortUrlData[] = JSON.parse(
      localStorage.getItem("guestUrls") || "[]",
    );

    if (stored.length === 0) return;

    const { success } = await saveUrls(stored);

    if (success) {
      localStorage.removeItem("guestUrls");

      // refresh cloud data
      queryClient.invalidateQueries({ queryKey: ["myUrls"] });
    }
  };

  return migrate;
};