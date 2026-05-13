import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, Activity, TrendingUp, ChevronRight, Moon, LogOut } from "lucide-react";
import HealthCard from "@/components/HealthCard";
import SimpleChart from "@/components/SimpleChart";
import ProgressBar from "@/components/ProgressBar";
import { fetchPatients, fetchAlerts, fetchOverview } from "@/api/health";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const riskColors = {
  low: "bg-health-green/10 text-health-green",
  medium: "bg-health-yellow/10 text-health-yellow",
  high: "bg-health-pink/10 text-health-pink",
};

const CaregiverDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [overview, setOverview] = useState<any[]>([]);

  useEffect(() => {
    fetchPatients().then((r) => setPatients(r.data));
    fetchAlerts().then((r) => setAlerts(r.data));
    fetchOverview().then((r) => setOverview(r.data));
  }, []);

  const activeToday = patients.filter((p) => !p.lastActive.includes("12 hours")).length;
  const avgAdherence = patients.length
    ? Math.round(patients.reduce((s, p) => s + p.adherence, 0) / patients.length)
    : 0;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen pb-8 bg-background">
      <div className="bg-card border-b border-border px-4 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Activity size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-heading">Caregiver Dashboard</h1>
              <p className="text-caption text-muted-foreground">
                {user ? `Signed in as ${user.name}` : "Monitor patient health"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-caption font-semibold text-muted-foreground hover:text-foreground"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Patients", value: String(patients.length), icon: Users, color: "text-primary" },
              { label: "Alerts", value: String(alerts.length), icon: AlertTriangle, color: "text-health-pink" },
              { label: "Avg Adherence", value: `${avgAdherence}%`, icon: TrendingUp, color: "text-health-green" },
              { label: "Active Today", value: String(activeToday), icon: Activity, color: "text-health-blue" },
            ].map((stat) => (
              <HealthCard key={stat.label} className="text-center">
                <stat.icon size={20} className={`${stat.color} mx-auto mb-1`} />
                <p className="text-heading">{stat.value}</p>
                <p className="text-caption text-muted-foreground">{stat.label}</p>
              </HealthCard>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="text-caption font-semibold text-muted-foreground mb-2">⚠️ Active Alerts</p>
          <div className="space-y-2 mb-5">
            {alerts.map((alert, i) => (
              <HealthCard
                key={i}
                className={`flex items-start gap-3 ${
                  alert.severity === "high" ? "border-health-pink/30" : "border-health-yellow/30"
                }`}
              >
                <AlertTriangle
                  size={16}
                  className={alert.severity === "high" ? "text-health-pink mt-0.5" : "text-health-yellow mt-0.5"}
                />
                <div>
                  <p className="text-caption font-bold">{alert.patient}</p>
                  <p className="text-caption text-muted-foreground">{alert.message}</p>
                </div>
              </HealthCard>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-caption font-semibold text-muted-foreground mb-2">Overall Health Score Trend</p>
          <HealthCard className="mb-5">
            <SimpleChart data={overview} maxValue={100} color="bg-primary" height={80} />
          </HealthCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-caption font-semibold text-muted-foreground mb-2">Patients</p>
          <div className="space-y-3">
            {patients.map((patient, i) => (
              <motion.div
                key={patient.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <HealthCard className="cursor-pointer active:scale-[0.99] transition-transform">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                        {patient.mood}
                      </div>
                      <div>
                        <p className="text-body font-bold">{patient.name}</p>
                        <p className="text-caption text-muted-foreground">Age {patient.age} • {patient.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[0.6rem] font-bold px-2 py-1 rounded-full ${riskColors[patient.risk as keyof typeof riskColors]}`}>
                        {patient.risk.toUpperCase()}
                      </span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {patient.conditions.map((c: string) => (
                      <span key={c} className="text-[0.6rem] font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
                      <Moon size={12} />
                      <span>Sleep: {patient.sleepAvg}h avg</span>
                    </div>
                    <ProgressBar
                      value={patient.adherence}
                      max={100}
                      color={patient.adherence > 70 ? "green" : patient.adherence > 50 ? "yellow" : "pink"}
                      label="Adherence"
                      size="sm"
                    />
                  </div>
                </HealthCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
