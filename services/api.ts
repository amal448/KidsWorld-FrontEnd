import { tokenStore } from "./tokenStore";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = tokenStore.getToken();

  const headers: any = {
    ...options.headers,
  };

  // Only add Content-Type: application/json if not passing FormData
  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // Attach token
  } else {
    console.warn(`[apiFetch] No token found for ${endpoint}`);
  }

  // console.log(`[apiFetch] Requesting ${endpoint} with headers:`, headers);

  let res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers,
  });

  // 401 Interceptor: Try to refresh token
  // Skip if we are already trying to refresh (prevent infinite loop)
  if (res.status === 401 && !options.headers?.hasOwnProperty("x-retry") && !endpoint.includes("/refresh-token")) {
    try {
      console.log("[apiFetch] 401 detected. Attempting refresh...");
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        credentials: "include",
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        if (refreshData.accessToken) {
          console.log("[apiFetch] Refresh successful. Retrying request...");
          tokenStore.setToken(refreshData.accessToken);

          // Retry original request with new token
          const newHeaders: any = {
            ...headers,
            "Authorization": `Bearer ${refreshData.accessToken}`,
            "x-retry": "true" // Prevent infinite loops
          };

          res = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            credentials: "include",
            headers: newHeaders
          });
        }
      } else {
        console.error("[apiFetch] Refresh failed.");
        // Optional: Redirect to login if needed, or let the error bubble up
        // if (typeof window !== 'undefined') window.location.href = '/login';
      }
    } catch (err) {
      console.error("[apiFetch] Error during refresh retry:", err);
    }
  }

  return res;
};