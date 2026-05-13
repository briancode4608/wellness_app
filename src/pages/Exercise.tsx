import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ExerciseCard from "@/components/ExerciseCard";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";
import { fetchExercises } from "@/api/health";

const categories = ["All", "Walking", "Stretching", "Mobility", "Breathing", "Strength"];

const Exercise = () => {
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    fetchExercises().then((r) => setExercises(r.data));
  }, []);

  const completed = exercises.filter((e) => e.completed).length;
  const totalCal = exercises.filter((e) => e.completed).reduce((s, e) => s + e.calories, 0);

  return (
    <PageLayout title="Exercise" subtitle="Activities tailored to your comfort level">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HealthCard className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-subheading">Today's Activity</p>
            <span className="text-caption font-bold text-health-green">{completed} of {exercises.length || 0} done</span>
          </div>
          <ProgressBar value={completed} max={exercises.length || 1} color="green" />
          <div className="flex justify-between mt-3 text-caption text-muted-foreground">
            <span>🔥 {totalCal} cal burned</span>
            <span>⏱ active today</span>
          </div>
        </HealthCard>
      </motion.div>

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
            <ExerciseCard {...ex} />
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Exercise;
