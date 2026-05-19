// localStorage-backed store for caregiver-managed patients & medical records.

import { useSyncExternalStore } from "react";

export interface Prescription {
  id: string;
  date: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
  prescriber: string;
}

export interface MedicalReview {
  id: string;
  date: string;
  title: string;
  findings: string;
  recommendations: string;
  reviewer: string;
}

export interface ClinicalInsight {
  id: string;
  date: string;
  category: "Observation" | "Risk Alert" | "Lifestyle" | "Follow-up";
  note: string;
  author: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: "Male" | "Female" | "Other";
  email?: string;
  phone?: string;
  conditions: string[];
  allergies?: string;
  emergencyContact?: string;
  createdAt: string;
  riskLevel: "low" | "medium" | "high";
  prescriptions: Prescription[];
  reviews: MedicalReview[];
  insights: ClinicalInsight[];
}

const KEY = "caregiverPatients";
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const seed = (): Patient[] => ([
  {
    id: "p-1", name: "Sarah Johnson", age: 68, sex: "Female",
    email: "sarah@example.com", phone: "+1 555 0102",
    conditions: ["Diabetes", "Hypertension"], allergies: "Penicillin",
    emergencyContact: "Daughter — +1 555 0188",
    createdAt: new Date().toISOString(), riskLevel: "low",
    prescriptions: [{
      id: uid(), date: new Date().toISOString(),
      medication: "Metformin", dosage: "500 mg", frequency: "Twice daily",
      duration: "Ongoing", notes: "Take with meals", prescriber: "Dr. Lee",
    }],
    reviews: [{
      id: uid(), date: new Date().toISOString(), title: "Quarterly check-up",
      findings: "Blood glucose stable. BP 128/82.",
      recommendations: "Continue current regimen. Increase daily walking to 30 minutes.",
      reviewer: "Dr. Lee",
    }],
    insights: [{
      id: uid(), date: new Date().toISOString(), category: "Observation",
      note: "Patient reports improved energy after morning walks.", author: "Dr. Lee",
    }],
  },
]);

export const loadPatients = (): Patient[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const s = seed();
      localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw);
  } catch { return []; }
};

const persist = (patients: Patient[]) => {
  localStorage.setItem(KEY, JSON.stringify(patients));
  notify();
};

export const addPatient = (p: Omit<Patient, "id" | "createdAt" | "prescriptions" | "reviews" | "insights">) => {
  const list = loadPatients();
  const newP: Patient = {
    ...p, id: uid(), createdAt: new Date().toISOString(),
    prescriptions: [], reviews: [], insights: [],
  };
  list.unshift(newP);
  persist(list);
  return newP;
};

export const updatePatient = (id: string, patch: Partial<Patient>) => {
  const list = loadPatients().map((p) => (p.id === id ? { ...p, ...patch } : p));
  persist(list);
};

export const addPrescription = (patientId: string, rx: Omit<Prescription, "id" | "date">) => {
  const list = loadPatients();
  const p = list.find((x) => x.id === patientId);
  if (!p) return;
  p.prescriptions.unshift({ ...rx, id: uid(), date: new Date().toISOString() });
  persist(list);
};

export const addReview = (patientId: string, r: Omit<MedicalReview, "id" | "date">) => {
  const list = loadPatients();
  const p = list.find((x) => x.id === patientId);
  if (!p) return;
  p.reviews.unshift({ ...r, id: uid(), date: new Date().toISOString() });
  persist(list);
};

export const addInsight = (patientId: string, i: Omit<ClinicalInsight, "id" | "date">) => {
  const list = loadPatients();
  const p = list.find((x) => x.id === patientId);
  if (!p) return;
  p.insights.unshift({ ...i, id: uid(), date: new Date().toISOString() });
  persist(list);
};

export const usePatients = (): Patient[] =>
  useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => loadPatients(),
    () => []
  );
