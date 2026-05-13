import { api, mockRequest } from "./client";
import * as M from "./mockData";

/**
 * API SERVICE LAYER
 * All UI calls go through these functions. Currently they return mocked
 * promises (axios-shaped) so swapping `mockRequest(...)` for `api.get('/...')`
 * is a one-line change per endpoint.
 */

// To switch to a real backend, change USE_MOCK to false and ensure VITE_API_BASE_URL is set.
const USE_MOCK = true;

export const fetchTimeline = () =>
  USE_MOCK ? mockRequest(M.mockTimeline) : api.get("/timeline");

export const fetchMeals = () =>
  USE_MOCK ? mockRequest(M.mockMeals) : api.get("/meals");

export const fetchNutrients = () =>
  USE_MOCK ? mockRequest(M.mockNutrients) : api.get("/nutrients");

export const fetchExercises = () =>
  USE_MOCK ? mockRequest(M.mockExercises) : api.get("/exercises");

export const fetchInsights = () =>
  USE_MOCK ? mockRequest(M.mockInsights) : api.get("/insights");

export const fetchWeekData = () =>
  USE_MOCK ? mockRequest(M.mockWeekData) : api.get("/logs/week");

export const fetchRoutine = () =>
  USE_MOCK ? mockRequest(M.mockRoutine) : api.get("/routine");

export const fetchHydration = () =>
  USE_MOCK ? mockRequest(M.mockHydration) : api.get("/hydration");

export const fetchProgress = () =>
  USE_MOCK ? mockRequest(M.mockProgress) : api.get("/progress");

// Caregiver endpoints
export const fetchPatients = () =>
  USE_MOCK ? mockRequest(M.mockPatients) : api.get("/caregiver/patients");

export const fetchAlerts = () =>
  USE_MOCK ? mockRequest(M.mockAlerts) : api.get("/caregiver/alerts");

export const fetchOverview = () =>
  USE_MOCK ? mockRequest(M.mockOverviewData) : api.get("/caregiver/overview");

// Logging mutations
export const submitDailyLog = (payload: {
  mood: number | null;
  energy: number | null;
  sleepHours: string;
  symptoms: string;
}) => (USE_MOCK ? mockRequest({ ok: true, ...payload }) : api.post("/logs", payload));

export const submitMealScan = (imageBase64: string) =>
  USE_MOCK
    ? mockRequest({ name: "Grilled Chicken Salad", calories: 350 }, 1200)
    : api.post("/meals/scan", { image: imageBase64 });
