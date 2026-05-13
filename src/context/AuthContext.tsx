import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthUser, loginRequest, signupRequest, Role } from "@/api/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (name: string, email: string, password: string, role: Role) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("authUser");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const persist = (u: AuthUser, token: string) => {
    localStorage.setItem("authUser", JSON.stringify(u));
    localStorage.setItem("authToken", token);
    setUser(u);
  };

  const login: AuthContextValue["login"] = async (email, password) => {
    const res = await loginRequest(email, password);
    persist(res.data.user, res.data.token);
    return res.data.user;
  };

  const signup: AuthContextValue["signup"] = async (name, email, password, role) => {
    const res = await signupRequest(name, email, password, role);
    persist(res.data.user, res.data.token);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
