import { api } from "./client";

export type Role = "user" | "caregiver";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const loginRequest = (email: string, password: string) =>
  api.post<AuthResponse>("/auth/login", { email, password });

export const signupRequest = (
  name: string,
  email: string,
  password: string,
  role: Role
) => api.post<AuthResponse>("/auth/signup", { name, email, password, role });
