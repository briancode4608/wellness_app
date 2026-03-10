import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ExerciseCard from "@/components/ExerciseCard";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";

const exercises = [
  {
    title: "Morning Walk",
    duration: "20 min",
    calories: 90,
    description: "A gentle walk to start your day. Keep a comfortable pace.",
    completed: true,
    intensity: "Low" as const,
  },
  {
    title: "Chair Yoga",
    duration: "15 min",
    calories: 50,
    description: "Gentle stretches you can do seated. Great for flexibility.",
    completed: false,
    intensity: "Low" as const,
  },
  {
    title: "Light Resistance Band",
    duration: "10 min",
    calories: 60,
    description: "Simple upper body exercises with resistance bands.",
    completed: false,
    intensity: "Medium" as const,
  },
];

const Exercise = () => (
  <PageLayout title="Exercise" subtitle="Activities tailored to your comfort level">
    {/* Summary */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <HealthCard className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-subheading">Today's Activity</p>
          <span className="text-caption font-bold text-health-green">1 of 3 done</span>
        </div>
        <ProgressBar value={1} max={3} color="green" />
        <div className="flex justify-between mt-3 text-caption text-muted-foreground">
          <span>🔥 90 cal burned</span>
          <span>⏱ 20 min active</span>
        </div>
      </HealthCard>
    </motion.div>

    {/* Encouragement */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
      <div className="bg-primary/8 border border-primary/15 rounded-lg p-3 mb-5">
        <p className="text-caption text-primary font-semibold text-center">
          💪 Every step counts. Move at your own pace.
        </p>
      </div>
    </motion.div>

    {/* Exercise Cards */}
    <div className="space-y-3">
      {exercises.map((ex, i) => (
        <motion.div key={ex.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
          <ExerciseCard {...ex} />
        </motion.div>
      ))}
    </div>
  </PageLayout>
);

export default Exercise;
