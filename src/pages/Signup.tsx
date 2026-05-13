import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User as UserIcon, UserPlus, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/api/auth";
import { toast } from "sonner";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await signup(name, email, password, role);
      toast.success(`Welcome, ${u.name}!`);
      navigate(u.role === "caregiver" ? "/caregiver" : "/onboarding", { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Heart size={28} className="text-primary" />
        </div>
        <h1 className="text-display">Create your account</h1>
        <p className="text-body text-muted-foreground mt-1">Start your personalized health journey</p>
      </motion.div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Account type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border-2 transition-all ${
                role === "user" ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <UserIcon size={18} className={role === "user" ? "text-primary" : "text-muted-foreground"} />
              <span className="text-caption font-bold">Patient</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("caregiver")}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg border-2 transition-all ${
                role === "caregiver" ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <Shield size={18} className={role === "caregiver" ? "text-primary" : "text-muted-foreground"} />
              <span className="text-caption font-bold">Caregiver</span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">Full name</label>
          <div className="relative">
            <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Your name"
            />
          </div>
        </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="At least 6 characters"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-bold text-body-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-60"
        >
          <UserPlus size={18} /> {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-caption text-center text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-semibold">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;
