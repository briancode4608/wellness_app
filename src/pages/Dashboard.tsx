import { useEffect, useState } from "react";
import { Sunrise, Sun, Moon, Droplets, Brain, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";
import MealCard from "@/components/MealCard";
import QuickLogButton from "@/components/QuickLogButton";
import Timeline from "@/components/Timeline";
import InsightCard from "@/components/InsightCard";
import QuickLogDialog, { QuickLogType } from "@/components/QuickLogDialog";
import { fetchTimeline, fetchMeals } from "@/api/health";
import { useAuth } from "@/context/AuthContext";
import { useUserData, todayTotals } from "@/lib/userStore";
import { exportPatientHealthRecord } from "@/lib/pdfExport";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const [timelineItems, setTimelineItems] = useState<any[]>([]);
  const [nextMeal, setNextMeal] = useState<any>(null);
  const [quickType, setQuickType] = useState<QuickLogType | null>(null);

  const data = useUserData();
  const totals = todayTotals(data);

  useEffect(() => {
    fetchTimeline().then((r) => setTimelineItems(r.data));
    fetchMeals().then((r) => setNextMeal(r.data.find((m: any) => !m.logged) || r.data[0]));
  }, []);

  const exportRecord = () => {
    const stored = JSON.parse(localStorage.getItem("healthProfile") || "{}");
    exportPatientHealthRecord(
      {
        name: stored.name || user?.name || "Patient",
        age: stored.age, weight: stored.weight, height: stored.height,
        conditions: stored.conditions, diet: stored.diet,
        activity: stored.activity, medications: stored.medications,
      },
      data
    );
    toast.success("Health record downloaded");
  };

  return (
    <PageLayout>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-caption text-muted-foreground">
            {hour < 12 ? <Sunrise size={14} className="inline mr-1" /> : hour < 17 ? <Sun size={14} className="inline mr-1" /> : <Moon size={14} className="inline mr-1" />}
            {greeting}
          </p>
          <h1 className="text-heading">{user?.name || "Friend"} 👋</h1>
          <p className="text-body text-muted-foreground mt-0.5">Every step counts. You're doing great today.</p>
        </div>
        <button onClick={exportRecord} title="Export health record"
          className="flex items-center gap-1 bg-card border border-border rounded-lg px-2.5 py-2 text-caption font-semibold active:scale-95 transition">
          <Download size={14} /> PDF
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-caption font-semibold text-muted-foreground mb-2">Quick Log</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          <QuickLogButton icon="🍽️" label="Meal" onClick={() => setQuickType("meal")} />
          <QuickLogButton icon="💧" label="Water" onClick={() => setQuickType("water")} />
          <QuickLogButton icon="💊" label="Meds" onClick={() => setQuickType("meds")} />
          <QuickLogButton icon="😊" label="Mood" onClick={() => setQuickType("mood")} />
          <QuickLogButton icon="🏃" label="Exercise" onClick={() => setQuickType("exercise")} />
          <QuickLogButton icon="😴" label="Sleep" onClick={() => setQuickType("sleep")} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-caption font-semibold text-muted-foreground">AI Insight</p>
          <Link to="/insights" className="text-caption text-primary font-semibold">View All →</Link>
        </div>
        <InsightCard message="Your energy improves on days you walk at least 20 minutes. Keep it up!" type="trend" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mt-5">
        <HealthCard className="border-health-blue/20 bg-health-blue/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets size={18} className="text-health-blue" />
              <p className="text-body font-semibold">Hydration</p>
            </div>
            <span className="text-caption font-bold text-health-blue">{totals.water} / 8 glasses</span>
          </div>
          <ProgressBar value={totals.water} max={8} color="blue" size="sm" className="mt-2" />
          <button onClick={() => setQuickType("water")} className="mt-2 text-caption font-semibold text-health-blue">+ Add a glass</button>
        </HealthCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-5">
        <HealthCard>
          <p className="text-subheading mb-3">Today's Progress</p>
          <div className="space-y-3">
            <ProgressBar value={totals.meals.length} max={3} color="green" label="Meals" showValue />
            <ProgressBar value={totals.exercises.length} max={2} color="blue" label="Exercise" showValue />
            <ProgressBar value={totals.water} max={8} color="blue" label="Water (glasses)" showValue />
            <ProgressBar value={totals.meds} max={3} color="purple" label="Medication" showValue />
          </div>
        </HealthCard>
      </motion.div>

      {nextMeal && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5">
          <p className="text-caption font-semibold text-muted-foreground mb-2">Upcoming Meal</p>
          <MealCard {...nextMeal} />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-5">
        <div className="grid grid-cols-2 gap-3">
          <Link to="/routine">
            <HealthCard className="flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform">
              <Calendar size={20} className="text-primary" />
              <div>
                <p className="text-caption font-bold">Routine</p>
                <p className="text-[0.65rem] text-muted-foreground">Daily plan</p>
              </div>
            </HealthCard>
          </Link>
          <Link to="/insights">
            <HealthCard className="flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform">
              <Brain size={20} className="text-primary" />
              <div>
                <p className="text-caption font-bold">Insights</p>
                <p className="text-[0.65rem] text-muted-foreground">AI analysis</p>
              </div>
            </HealthCard>
          </Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-5">
        <p className="text-caption font-semibold text-muted-foreground mb-3">Today's Schedule</p>
        <HealthCard>
          <Timeline items={timelineItems} />
        </HealthCard>
      </motion.div>

      <QuickLogDialog open={!!quickType} type={quickType} onClose={() => setQuickType(null)} />
    </PageLayout>
  );
};

export default Dashboard;
