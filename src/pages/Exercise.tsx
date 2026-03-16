import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ExerciseCard from "@/components/ExerciseCard";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";

const categories = ["All", "Walking", "Stretching", "Mobility", "Breathing", "Strength"];

const exercises = [
  {
    title: "Morning Walk",
    duration: "20 min",
    calories: 90,
    description: "A gentle walk to start your day. Keep a comfortable pace.",
    completed: true,
    intensity: "Low" as const,
    category: "Walking",
  },
  {
    title: "Chair Yoga",
    duration: "15 min",
    calories: 50,
    description: "Gentle stretches you can do seated. Great for flexibility.",
    completed: false,
    intensity: "Low" as const,
    category: "Stretching",
  },
  {
    title: "Deep Breathing",
    duration: "10 min",
    calories: 15,
    description: "Calming breathing exercises to reduce stress and improve focus.",
    completed: false,
    intensity: "Low" as const,
    category: "Breathing",
  },
  {
    title: "Light Resistance Band",
    duration: "10 min",
    calories: 60,
    description: "Simple upper body exercises with resistance bands.",
    completed: false,
    intensity: "Medium" as const,
    category: "Strength",
  },
  {
    title: "Joint Mobility",
    duration: "8 min",
    calories: 30,
    description: "Gentle joint rotations to maintain range of motion.",
    completed: false,
    intensity: "Low" as const,
    category: "Mobility",
  },
];

const Exercise = () => (
  <PageLayout title="Exercise" subtitle="Activities tailored to your comfort level">
    {/* Summary */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <HealthCard className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-subheading">Today's Activity</p>
          <span className="text-caption font-bold text-health-green">1 of {exercises.length} done</span>
        </div>
        <ProgressBar value={1} max={exercises.length} color="green" />
        <div className="flex justify-between mt-3 text-caption text-muted-foreground">
          <span>🔥 90 cal burned</span>
          <span>⏱ 20 min active</span>
        </div>
      </HealthCard>
    </motion.div>

    {/* Categories */}
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

    {/* Encouragement */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
      <div className="bg-primary/5 border border-primary/15 rounded-lg p-3 mb-5">
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
