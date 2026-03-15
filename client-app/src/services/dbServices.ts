import api from "../lib/axios";
import { ROUTES } from "../config/routes";
import type { ApiResponse } from "../types/auth.type";
import type { ShortUrlData } from "../types/url.types";
import type { User } from "../types/user.types";

// Update Profile - Note: This should probably be in a user service, not here
export const updateProfile = async (
  data: Partial<User>,
): Promise<ApiResponse<User>> => {
  try {
    const res = await api.patch(ROUTES.users.updateMe, data);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: {
        message:
          err.response?.data?.message || err.message || "Profile update failed",
        status: err.response?.status,
      },
    };
  }
};

// Create short URL
export const createShortUrl = async (
  fullUrl: string,
  alias?: string,
): Promise<ApiResponse<ShortUrlData>> => {
  try {
    const payload = {
      fullUrl,
      ...(alias && { alias }),
    };

    const response = await api.post(ROUTES.urls.base, payload);
    return {
      success: true,
      data: response.data,
    };
  } catch (err: any) {
    console.error("Create short URL error:", err);
    return {
      success: false,
      error: {
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to create short URL",
        status: err.response?.status,
      },
    };
  }
};

// Get user's URLs (protected route)
export const getMyUrls = async (): Promise<ApiResponse<ShortUrlData[]>> => {
  try {
    const res = await api.get(ROUTES.urls.myUrls);
    console.log(res.data);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    console.error("Get my URLs error:", err);
    return {
      success: false,
      error: {
        message:
          err.response?.data?.message || err.message || "Failed to fetch URLs",
        status: err.response?.status,
      },
      data: [], // Return empty array as fallback
    };
  }
};

// saves urls that were created offline
export const saveUrls = async (
  urls: ShortUrlData[],
): Promise<ApiResponse<ShortUrlData[]>> => {
  try {
    const res = await api.post(ROUTES.urls.saveUrls, { urls });

    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    console.error("Get my URLs error:", err);
    return {
      success: false,
      error: {
        message:
          err.response?.data?.message || err.message || "Failed to fetch URLs",
        status: err.response?.status,
      },
      data: [], // Return empty array as fallback
    };
  }
};

// Get single URL by short code (public route)
export const getUrl = async (
  shortUrl: string,
): Promise<ApiResponse<ShortUrlData | null>> => {
  try {
    const res = await api.get(ROUTES.urls.get(shortUrl));

    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    // Handle 404 specially
    if (err.response?.status === 404) {
      return {
        success: false,
        data: null,
        error: {
          message: "URL not found",
          status: 404,
        },
      };
    }

    // Handle other errors
    console.error("Get URL error:", err);
    return {
      success: false,
      error: {
        message:
          err.response?.data?.message || err.message || "Failed to fetch URL",
        status: err.response?.status,
      },
    };
  }
};

// Delete URL (protected route)
export const deleteUrl = async (urlId: string): Promise<ApiResponse> => {
  try {
    const { data } = await api.delete(ROUTES.urls.delete(urlId));

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    console.error("Delete URL error:", err);
    return {
      success: false,
      error: {
        message:
          err.response?.data?.message || err.message || "Failed to delete URL",
        status: err.response?.status,
      },
    };
  }
};

// Optional: Update URL alias (protected route)
export const updateUrlAlias = async (
  shortUrl: string,
  alias: string,
): Promise<ApiResponse<ShortUrlData>> => {
  try {
    const res = await api.patch(ROUTES.urls.updateAlias, { shortUrl, alias });

    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    console.error("Update alias error:", err);
    return {
      success: false,
      error: {
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to update alias",
        status: err.response?.status,
      },
    };
  }
};
