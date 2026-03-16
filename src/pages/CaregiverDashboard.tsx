import { motion } from "framer-motion";
import { Users, AlertTriangle, Activity, TrendingUp, ChevronRight, Heart, Moon, Dumbbell } from "lucide-react";
import HealthCard from "@/components/HealthCard";
import SimpleChart from "@/components/SimpleChart";
import ProgressBar from "@/components/ProgressBar";

const patients = [
  {
    name: "Sarah Johnson",
    age: 68,
    conditions: ["Diabetes", "Hypertension"],
    mood: "😊",
    risk: "low",
    lastActive: "2 hours ago",
    sleepAvg: 7.2,
    adherence: 85,
  },
  {
    name: "Robert Chen",
    age: 72,
    conditions: ["Heart Disease"],
    mood: "😐",
    risk: "medium",
    lastActive: "5 hours ago",
    sleepAvg: 5.8,
    adherence: 60,
  },
  {
    name: "Maria Garcia",
    age: 55,
    conditions: ["Autoimmune", "Recovering"],
    mood: "🙂",
    risk: "low",
    lastActive: "1 hour ago",
    sleepAvg: 7.8,
    adherence: 92,
  },
  {
    name: "James Wilson",
    age: 80,
    conditions: ["Elderly Care", "Diabetes"],
    mood: "😔",
    risk: "high",
    lastActive: "12 hours ago",
    sleepAvg: 4.5,
    adherence: 40,
  },
];

const riskColors = {
  low: "bg-health-green/10 text-health-green",
  medium: "bg-health-yellow/10 text-health-yellow",
  high: "bg-health-pink/10 text-health-pink",
};

const alerts = [
  { patient: "James Wilson", message: "Missed 3 medications today", severity: "high" },
  { patient: "Robert Chen", message: "Sleep below 6 hours for 3 consecutive days", severity: "medium" },
  { patient: "James Wilson", message: "Low activity — no exercise logged in 2 days", severity: "high" },
];

const overviewData = [
  { label: "Mon", value: 78 },
  { label: "Tue", value: 82 },
  { label: "Wed", value: 75 },
  { label: "Thu", value: 80 },
  { label: "Fri", value: 70 },
  { label: "Sat", value: 85 },
  { label: "Sun", value: 0 },
];

const CaregiverDashboard = () => (
  <div className="min-h-screen pb-8 bg-background">
    {/* Header */}
    <div className="bg-card border-b border-border px-4 py-5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Activity size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-heading">Caregiver Dashboard</h1>
            <p className="text-caption text-muted-foreground">Monitor patient health at a glance</p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 pt-5">
      {/* Stats Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Patients", value: "4", icon: Users, color: "text-primary" },
            { label: "Alerts", value: "3", icon: AlertTriangle, color: "text-health-pink" },
            { label: "Avg Adherence", value: "69%", icon: TrendingUp, color: "text-health-green" },
            { label: "Active Today", value: "3", icon: Activity, color: "text-health-blue" },
          ].map((stat) => (
            <HealthCard key={stat.label} className="text-center">
              <stat.icon size={20} className={`${stat.color} mx-auto mb-1`} />
              <p className="text-heading">{stat.value}</p>
              <p className="text-caption text-muted-foreground">{stat.label}</p>
            </HealthCard>
          ))}
        </div>
      </motion.div>

      {/* Alerts */}
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

      {/* Overall Health Trend */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-caption font-semibold text-muted-foreground mb-2">Overall Health Score Trend</p>
        <HealthCard className="mb-5">
          <SimpleChart data={overviewData} maxValue={100} color="bg-primary" height={80} />
        </HealthCard>
      </motion.div>

      {/* Patient List */}
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
                  {patient.conditions.map((c) => (
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

export default CaregiverDashboard;
