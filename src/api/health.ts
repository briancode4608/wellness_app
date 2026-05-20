import { api } from "./client";

/**
 * API SERVICE LAYER
 * All endpoints hit the real backend defined by VITE_API_BASE_URL.
 */

export const fetchTimeline   = () => api.get("/timeline");
export const fetchMeals      = () => api.get("/meals");
export const fetchNutrients  = () => api.get("/nutrients");
export const fetchExercises  = () => api.get("/exercises");
export const fetchInsights   = () => api.get("/insights");
export const fetchWeekData   = () => api.get("/logs/week");
export const fetchRoutine    = () => api.get("/routine");
export const fetchHydration  = () => api.get("/hydration");
export const fetchProgress   = () => api.get("/progress");

// Caregiver endpoints
export const fetchPatients = () => api.get("/caregiver/patients");
export const fetchAlerts   = () => api.get("/caregiver/alerts");
export const fetchOverview = () => api.get("/caregiver/overview");

// Logging mutations
export const submitDailyLog = (payload: {
  mood: number | null;
  energy: number | null;
  sleepHours: string;
  symptoms: string;
}) => api.post("/logs", payload);

export const submitMealScan = (imageBase64: string) =>
  api.post("/meals/scan", { image: imageBase64 });
