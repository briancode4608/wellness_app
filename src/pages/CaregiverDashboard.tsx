import { useState } from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle, Activity, TrendingUp, ChevronRight, LogOut, Plus, Download, FileText } from "lucide-react";
import HealthCard from "@/components/HealthCard";
import SimpleChart from "@/components/SimpleChart";
import ProgressBar from "@/components/ProgressBar";
import AddPatientDialog from "@/components/AddPatientDialog";
import PatientRecordDialog from "@/components/PatientRecordDialog";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { usePatients, Patient } from "@/lib/caregiverStore";
import { exportCaregiverRoster, exportPatientClinicalRecord } from "@/lib/pdfExport";
import { toast } from "sonner";

const mockOverview = [
  { label: "Mon", value: 78 }, { label: "Tue", value: 82 }, { label: "Wed", value: 75 },
  { label: "Thu", value: 80 }, { label: "Fri", value: 70 }, { label: "Sat", value: 85 }, { label: "Sun", value: 0 },
];

const riskColors: any = {
  low: "bg-health-green/10 text-health-green",
  medium: "bg-health-yellow/10 text-health-yellow",
  high: "bg-health-pink/10 text-health-pink",
};

const CaregiverDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const patients = usePatients();
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Patient | null>(null);

  // keep selected in sync with store updates
  const liveSelected = selected ? patients.find((p) => p.id === selected.id) || null : null;

  const alerts = patients.flatMap((p) =>
    p.riskLevel === "high"
      ? [{ patient: p.name, message: "High risk — review prescriptions and recent reviews", severity: "high" }]
      : p.riskLevel === "medium"
      ? [{ patient: p.name, message: "Medium risk — schedule a follow-up", severity: "medium" }]
      : []
  );

  const avgRx = patients.length
    ? Math.round(patients.reduce((s, p) => s + p.prescriptions.length, 0) / patients.length * 10) / 10
    : 0;

  const handleLogout = () => { logout(); navigate("/login", { replace: true }); };

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
              { label: "Active Alerts", value: String(alerts.length), icon: AlertTriangle, color: "text-health-pink" },
              { label: "Avg Rx / Patient", value: String(avgRx), icon: TrendingUp, color: "text-health-green" },
              { label: "Reviews", value: String(patients.reduce((s, p) => s + p.reviews.length, 0)), icon: FileText, color: "text-health-blue" },
            ].map((stat) => (
              <HealthCard key={stat.label} className="text-center">
                <stat.icon size={20} className={`${stat.color} mx-auto mb-1`} />
                <p className="text-heading">{stat.value}</p>
                <p className="text-caption text-muted-foreground">{stat.label}</p>
              </HealthCard>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-2 mb-5">
          <button onClick={() => setAddOpen(true)}
            className="flex-1 bg-primary text-primary-foreground rounded-lg py-3 font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition">
            <Plus size={16} /> Register Patient
          </button>
          <button onClick={() => { exportCaregiverRoster(patients, user?.name || "Care Team"); toast.success("Roster downloaded"); }}
            className="bg-card border border-border rounded-lg px-4 font-bold flex items-center gap-2 active:scale-95 transition">
            <Download size={16} /> Roster PDF
          </button>
        </div>

        {alerts.length > 0 && (
          <>
            <p className="text-caption font-semibold text-muted-foreground mb-2">⚠️ Active Alerts</p>
            <div className="space-y-2 mb-5">
              {alerts.map((alert, i) => (
                <HealthCard key={i}
                  className={`flex items-start gap-3 ${alert.severity === "high" ? "border-health-pink/30" : "border-health-yellow/30"}`}>
                  <AlertTriangle size={16}
                    className={alert.severity === "high" ? "text-health-pink mt-0.5" : "text-health-yellow mt-0.5"} />
                  <div>
                    <p className="text-caption font-bold">{alert.patient}</p>
                    <p className="text-caption text-muted-foreground">{alert.message}</p>
                  </div>
                </HealthCard>
              ))}
            </div>
          </>
        )}

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-caption font-semibold text-muted-foreground mb-2">Overall Health Score Trend</p>
          <HealthCard className="mb-5">
            <SimpleChart data={mockOverview} maxValue={100} color="bg-primary" height={80} />
          </HealthCard>
        </motion.div>

        <p className="text-caption font-semibold text-muted-foreground mb-2">Patients</p>
        <div className="space-y-3">
          {patients.length === 0 && (
            <HealthCard className="text-center text-muted-foreground py-8">
              No patients yet — click "Register Patient" to add one.
            </HealthCard>
          )}
          {patients.map((patient) => (
            <HealthCard key={patient.id} className="cursor-pointer active:scale-[0.99] transition-transform"
              onClick={() => setSelected(patient)}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="text-body font-bold">{patient.name}</p>
                    <p className="text-caption text-muted-foreground">Age {patient.age} • {patient.sex}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[0.6rem] font-bold px-2 py-1 rounded-full ${riskColors[patient.riskLevel]}`}>
                    {patient.riskLevel.toUpperCase()}
                  </span>
                  <button onClick={(e) => { e.stopPropagation(); exportPatientClinicalRecord(patient, user?.name || "Care Team"); }}
                    className="p-1 text-muted-foreground hover:text-foreground" title="Download PDF">
                    <Download size={14} />
                  </button>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </div>

              {patient.conditions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {patient.conditions.map((c) => (
                    <span key={c} className="text-[0.6rem] font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 text-caption">
                <div className="text-muted-foreground"><b>{patient.prescriptions.length}</b> Rx</div>
                <div className="text-muted-foreground"><b>{patient.reviews.length}</b> reviews</div>
                <div className="text-muted-foreground"><b>{patient.insights.length}</b> insights</div>
              </div>
            </HealthCard>
          ))}
        </div>
      </div>

      <AddPatientDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <PatientRecordDialog
        patient={liveSelected}
        onClose={() => setSelected(null)}
        caregiverName={user?.name || "Care Team"}
      />
    </div>
  );
};

export default CaregiverDashboard;
