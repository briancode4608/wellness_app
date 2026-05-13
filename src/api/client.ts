import axios from "axios";

/**
 * Central axios instance used for all API calls.
 * Replace baseURL with your real backend when available.
 * Auth token is automatically attached if present in localStorage.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.vitalcare.local",
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Helper to simulate a network call returning mock data. Swap for `api.get(url)` later. */
export const mockRequest = <T>(data: T, delay = 350): Promise<{ data: T }> =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), delay));
