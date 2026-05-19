import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ExerciseCard from "@/components/ExerciseCard";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";
import QuickLogDialog from "@/components/QuickLogDialog";
import { fetchExercises } from "@/api/health";
import { useUserData, todayTotals, addExercise } from "@/lib/userStore";
import { toast } from "sonner";

const categories = ["All", "Walking", "Stretching", "Mobility", "Breathing", "Strength"];

const Exercise = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [openLog, setOpenLog] = useState(false);
  const data = useUserData();
  const totals = todayTotals(data);

  useEffect(() => { fetchExercises().then((r) => setExercises(r.data)); }, []);

  const completed = totals.exercises.length;
  const totalCal = totals.exercises.reduce((s, e) => s + e.calories, 0);

  const quickMark = (ex: any) => {
    addExercise({
      title: ex.title,
      duration: parseInt(ex.duration) || 10,
      calories: ex.calories,
      intensity: ex.intensity || "Low",
    });
    toast.success(`${ex.title} marked complete`, { description: "Every step counts." });
  };

  return (
    <PageLayout title="Exercise" subtitle="Activities tailored to your comfort level">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HealthCard className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-subheading">Today's Activity</p>
            <span className="text-caption font-bold text-health-green">{completed} done</span>
          </div>
          <ProgressBar value={completed} max={Math.max(completed, 2)} color="green" />
          <div className="flex justify-between mt-3 text-caption text-muted-foreground">
            <span>🔥 {totalCal} cal burned</span>
            <span>⏱ {totals.exercises.reduce((s, e) => s + e.duration, 0)} min</span>
          </div>
        </HealthCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <button onClick={() => setOpenLog(true)}
          className="w-full mb-4 bg-primary text-primary-foreground rounded-lg py-3 font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition">
          <Plus size={16} /> Log Custom Activity
        </button>
      </motion.div>

      {totals.exercises.length > 0 && (
        <div className="mb-4">
          <p className="text-caption font-semibold text-muted-foreground mb-2">Logged Today</p>
          <div className="space-y-2">
            {totals.exercises.map((e) => (
              <HealthCard key={e.id} className="flex justify-between items-center">
                <div>
                  <p className="text-body font-semibold">{e.title}</p>
                  <p className="text-caption text-muted-foreground">{e.duration} min • {e.intensity} • 🔥 {e.calories} cal</p>
                </div>
                <span className="text-[0.65rem] font-semibold bg-health-green/15 text-health-green px-2 py-0.5 rounded-full">✓</span>
              </HealthCard>
            ))}
          </div>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 mb-3">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg text-caption font-semibold flex-shrink-0 transition-all ${
                i === 0 ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 mb-5">
          <p className="text-caption text-primary font-semibold text-center">
            💪 Every step counts. Move at your own pace.
          </p>
        </div>
      </motion.div>

      <div className="space-y-3">
        {exercises.map((ex, i) => (
          <motion.div key={ex.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <div onClick={() => !ex.completed && quickMark(ex)}>
              <ExerciseCard {...ex} />
            </div>
          </motion.div>
        ))}
      </div>

      <QuickLogDialog open={openLog} type={openLog ? "exercise" : null} onClose={() => setOpenLog(false)} />
    </PageLayout>
  );
};

export default Exercise;
