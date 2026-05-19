// Lightweight localStorage-backed store for user-entered records.
// Each list is keyed per user email so multiple demo accounts stay separate.

import { useSyncExternalStore } from "react";

export interface MealEntry {
  id: string;
  date: string; // ISO
  name: string;
  mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  calories: number;
  notes?: string;
}

export interface WaterEntry {
  id: string;
  date: string;
  glasses: number;
}

export interface MedEntry {
  id: string;
  date: string;
  name: string;
  dose: string;
  taken: boolean;
}

export interface ExerciseEntry {
  id: string;
  date: string;
  title: string;
  duration: number; // minutes
  intensity: "Low" | "Medium" | "High";
  calories: number;
  notes?: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 0-4
  energy: number; // 0-4
  sleepHours: number;
  symptoms?: string;
}

export interface RoutineItem {
  id: string;
  time: string; // "HH:MM"
  title: string;
  category: "Meal" | "Medication" | "Exercise" | "Hydration" | "Sleep" | "Other";
  notes?: string;
}

export interface UserData {
  meals: MealEntry[];
  water: WaterEntry[];
  meds: MedEntry[];
  exercises: ExerciseEntry[];
  moods: MoodEntry[];
  routine: RoutineItem[];
}

const empty = (): UserData => ({
  meals: [], water: [], meds: [], exercises: [], moods: [], routine: [],
});

const keyFor = (email: string) => `userData:${email.toLowerCase()}`;
const currentEmail = () => {
  try {
    const raw = localStorage.getItem("authUser");
    if (!raw) return "guest";
    return JSON.parse(raw).email || "guest";
  } catch { return "guest"; }
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export const loadUserData = (email = currentEmail()): UserData => {
  try {
    const raw = localStorage.getItem(keyFor(email));
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch { return empty(); }
};

const save = (data: UserData, email = currentEmail()) => {
  localStorage.setItem(keyFor(email), JSON.stringify(data));
  notify();
};

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const addMeal = (m: Omit<MealEntry, "id" | "date"> & { date?: string }) => {
  const data = loadUserData();
  data.meals.unshift({ id: uid(), date: m.date || new Date().toISOString(), ...m });
  save(data);
};
export const addWater = (glasses = 1) => {
  const data = loadUserData();
  data.water.unshift({ id: uid(), date: new Date().toISOString(), glasses });
  save(data);
};
export const addMed = (m: Omit<MedEntry, "id" | "date" | "taken"> & { taken?: boolean }) => {
  const data = loadUserData();
  data.meds.unshift({ id: uid(), date: new Date().toISOString(), taken: m.taken ?? true, ...m });
  save(data);
};
export const addExercise = (e: Omit<ExerciseEntry, "id" | "date">) => {
  const data = loadUserData();
  data.exercises.unshift({ id: uid(), date: new Date().toISOString(), ...e });
  save(data);
};
export const addMood = (m: Omit<MoodEntry, "id" | "date">) => {
  const data = loadUserData();
  data.moods.unshift({ id: uid(), date: new Date().toISOString(), ...m });
  save(data);
};
export const addRoutineItem = (r: Omit<RoutineItem, "id">) => {
  const data = loadUserData();
  data.routine.push({ id: uid(), ...r });
  data.routine.sort((a, b) => a.time.localeCompare(b.time));
  save(data);
};
export const removeRoutineItem = (id: string) => {
  const data = loadUserData();
  data.routine = data.routine.filter((r) => r.id !== id);
  save(data);
};

export const todayTotals = (data: UserData = loadUserData()) => {
  const today = new Date().toDateString();
  const onToday = <T extends { date: string }>(xs: T[]) =>
    xs.filter((x) => new Date(x.date).toDateString() === today);
  return {
    meals: onToday(data.meals),
    water: onToday(data.water).reduce((s, w) => s + w.glasses, 0),
    meds: onToday(data.meds).filter((m) => m.taken).length,
    exercises: onToday(data.exercises),
    moods: onToday(data.moods),
  };
};

// React hook for components to subscribe to store changes.
export const useUserData = (): UserData => {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => {
      // Cache key so React detects changes
      return loadUserData();
    },
    () => empty()
  );
};
