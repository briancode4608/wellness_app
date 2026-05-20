import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string })?.from || "/";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      navigate(u.role === "caregiver" ? "/caregiver" : from, { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Heart size={28} className="text-primary" />
        </div>
        <h1 className="text-display">Welcome back</h1>
        <p className="text-body text-muted-foreground mt-1">Sign in to continue your health journey</p>
      </motion.div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-bold text-body-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-60"
        >
          <LogIn size={18} /> {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-caption text-center text-muted-foreground mt-6">
        New here?{" "}
        <Link to="/signup" className="text-primary font-semibold">Create an account</Link>
      </p>

    </div>
  );
};

export default Login;
