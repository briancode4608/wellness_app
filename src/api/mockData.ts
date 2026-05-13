import { UtensilsCrossed, Dumbbell, Droplets, Pill, BedDouble, Coffee, Sun, Moon } from "lucide-react";

export const mockTimeline = [
  { time: "7:00 AM", title: "Breakfast", icon: UtensilsCrossed, color: "bg-health-green", completed: true },
  { time: "8:00 AM", title: "Morning Walk", icon: Dumbbell, color: "bg-health-blue", completed: true },
  { time: "10:00 AM", title: "Hydration Check", icon: Droplets, color: "bg-health-blue", completed: false },
  { time: "12:30 PM", title: "Lunch + Medication", icon: Pill, color: "bg-health-purple", completed: false },
  { time: "3:00 PM", title: "Light Stretching", icon: Dumbbell, color: "bg-health-yellow", completed: false },
  { time: "7:00 PM", title: "Dinner", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
  { time: "10:00 PM", title: "Sleep", icon: BedDouble, color: "bg-health-pink", completed: false },
];

export const mockMeals = [
  { title: "Breakfast", time: "7:00 AM", calories: 380, icon: Coffee, items: ["Oatmeal with berries", "Green tea", "Boiled egg"], color: "bg-health-yellow", logged: true },
  { title: "Lunch", time: "12:30 PM", calories: 520, icon: Sun, items: ["Grilled chicken salad", "Brown rice", "Steamed broccoli"], color: "bg-health-green", logged: false },
  { title: "Dinner", time: "7:00 PM", calories: 450, icon: Moon, items: ["Baked salmon", "Quinoa", "Roasted vegetables"], color: "bg-health-blue", logged: false },
];

export const mockNutrients = [
  { label: "Protein", value: 45, max: 80, color: "blue" as const },
  { label: "Carbs", value: 120, max: 200, color: "yellow" as const },
  { label: "Fat", value: 25, max: 55, color: "pink" as const },
  { label: "Fiber", value: 12, max: 30, color: "green" as const },
];

export const mockExercises = [
  { title: "Morning Walk", duration: "20 min", calories: 90, description: "A gentle walk to start your day. Keep a comfortable pace.", completed: true, intensity: "Low" as const, category: "Walking" },
  { title: "Chair Yoga", duration: "15 min", calories: 50, description: "Gentle stretches you can do seated. Great for flexibility.", completed: false, intensity: "Low" as const, category: "Stretching" },
  { title: "Deep Breathing", duration: "10 min", calories: 15, description: "Calming breathing exercises to reduce stress and improve focus.", completed: false, intensity: "Low" as const, category: "Breathing" },
  { title: "Light Resistance Band", duration: "10 min", calories: 60, description: "Simple upper body exercises with resistance bands.", completed: false, intensity: "Medium" as const, category: "Strength" },
  { title: "Joint Mobility", duration: "8 min", calories: 30, description: "Gentle joint rotations to maintain range of motion.", completed: false, intensity: "Low" as const, category: "Mobility" },
];

export const mockInsights = [
  { message: "Your energy improves on days you walk at least 20 minutes.", type: "trend" as const },
  { message: "Sleep below 6 hours tends to lower your mood the next day.", type: "warning" as const },
  { message: "Walking improves your mood — you've been consistent this week!", type: "tip" as const },
  { message: "Your blood sugar is more stable on days you eat breakfast before 8 AM.", type: "trend" as const },
  { message: "Hydration drops on weekends. Try setting a reminder.", type: "warning" as const },
];

export const mockWeekData = [
  { day: "Mon", mood: 4, energy: 3, sleep: 7 },
  { day: "Tue", mood: 3, energy: 4, sleep: 8 },
  { day: "Wed", mood: 5, energy: 4, sleep: 7.5 },
  { day: "Thu", mood: 4, energy: 3, sleep: 6 },
  { day: "Fri", mood: 3, energy: 2, sleep: 7 },
  { day: "Sat", mood: 4, energy: 4, sleep: 8 },
  { day: "Sun", mood: 0, energy: 0, sleep: 0 },
];

export const mockRoutine = [
  { time: "6:30 AM", title: "Wake up & Hydrate", icon: Droplets, color: "bg-health-blue", completed: false },
  { time: "7:00 AM", title: "Morning Medication", icon: Pill, color: "bg-health-purple", completed: false },
  { time: "7:30 AM", title: "Breakfast", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
  { time: "8:30 AM", title: "Morning Walk", icon: Dumbbell, color: "bg-health-blue", completed: false },
  { time: "10:00 AM", title: "Hydration Reminder", icon: Droplets, color: "bg-health-blue", completed: false },
  { time: "12:30 PM", title: "Lunch", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
  { time: "1:00 PM", title: "Afternoon Medication", icon: Pill, color: "bg-health-purple", completed: false },
  { time: "3:00 PM", title: "Light Stretching", icon: Dumbbell, color: "bg-health-yellow", completed: false },
  { time: "4:00 PM", title: "Hydration Reminder", icon: Droplets, color: "bg-health-blue", completed: false },
  { time: "7:00 PM", title: "Dinner", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
  { time: "9:00 PM", title: "Evening Medication", icon: Pill, color: "bg-health-purple", completed: false },
  { time: "10:00 PM", title: "Sleep", icon: BedDouble, color: "bg-health-pink", completed: false },
];

export const mockPatients = [
  { name: "Sarah Johnson", age: 68, conditions: ["Diabetes", "Hypertension"], mood: "😊", risk: "low", lastActive: "2 hours ago", sleepAvg: 7.2, adherence: 85 },
  { name: "Robert Chen", age: 72, conditions: ["Heart Disease"], mood: "😐", risk: "medium", lastActive: "5 hours ago", sleepAvg: 5.8, adherence: 60 },
  { name: "Maria Garcia", age: 55, conditions: ["Autoimmune", "Recovering"], mood: "🙂", risk: "low", lastActive: "1 hour ago", sleepAvg: 7.8, adherence: 92 },
  { name: "James Wilson", age: 80, conditions: ["Elderly Care", "Diabetes"], mood: "😔", risk: "high", lastActive: "12 hours ago", sleepAvg: 4.5, adherence: 40 },
];

export const mockAlerts = [
  { patient: "James Wilson", message: "Missed 3 medications today", severity: "high" },
  { patient: "Robert Chen", message: "Sleep below 6 hours for 3 consecutive days", severity: "medium" },
  { patient: "James Wilson", message: "Low activity — no exercise logged in 2 days", severity: "high" },
];

export const mockOverviewData = [
  { label: "Mon", value: 78 }, { label: "Tue", value: 82 }, { label: "Wed", value: 75 },
  { label: "Thu", value: 80 }, { label: "Fri", value: 70 }, { label: "Sat", value: 85 }, { label: "Sun", value: 0 },
];

export const mockHydration = { current: 6, max: 8 };
export const mockProgress = { meals: 2, mealsMax: 3, exercise: 1, exerciseMax: 2, water: 6, waterMax: 8, meds: 1, medsMax: 3 };
