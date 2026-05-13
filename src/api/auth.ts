import { mockRequest } from "./client";

export type Role = "user" | "caregiver";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

// Seeded mock user database (persisted in localStorage so signups survive reloads).
const SEED_USERS: Array<AuthUser & { password: string }> = [
  { id: "u-1", name: "Alex Patient", email: "user@demo.com", password: "password", role: "user" },
  { id: "c-1", name: "Dr. Lee", email: "caregiver@demo.com", password: "password", role: "caregiver" },
];

const USERS_KEY = "mockUsers";

const loadUsers = (): typeof SEED_USERS => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
  try { return JSON.parse(raw); } catch { return SEED_USERS; }
};

const saveUsers = (users: typeof SEED_USERS) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const loginRequest = async (email: string, password: string) => {
  const users = loadUsers();
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!found) {
    return mockRequest({ error: "Invalid email or password" } as const, 400).then(() => {
      throw new Error("Invalid email or password");
    });
  }
  const { password: _pw, ...safe } = found;
  return mockRequest({ user: safe, token: `mock-token-${found.id}` });
};

export const signupRequest = async (
  name: string,
  email: string,
  password: string,
  role: Role
) => {
  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists");
  }
  const newUser = { id: `u-${Date.now()}`, name, email, password, role };
  users.push(newUser);
  saveUsers(users);
  const { password: _pw, ...safe } = newUser;
  return mockRequest({ user: safe, token: `mock-token-${newUser.id}` });
};
