import { motion } from "framer-motion";
import { Brain, TrendingUp, Shield, Activity } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import InsightCard from "@/components/InsightCard";
import HealthCard from "@/components/HealthCard";
import SimpleChart from "@/components/SimpleChart";
import ProgressBar from "@/components/ProgressBar";

const insights = [
  { message: "Your energy improves on days you walk at least 20 minutes.", type: "trend" as const },
  { message: "Sleep below 6 hours tends to lower your mood the next day.", type: "warning" as const },
  { message: "Walking improves your mood — you've been consistent this week!", type: "tip" as const },
  { message: "Your blood sugar is more stable on days you eat breakfast before 8 AM.", type: "trend" as const },
  { message: "Hydration drops on weekends. Try setting a reminder.", type: "warning" as const },
];

const moodTrend = [
  { label: "Mon", value: 4 },
  { label: "Tue", value: 3 },
  { label: "Wed", value: 5 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 3 },
  { label: "Sat", value: 4 },
  { label: "Sun", value: 0 },
];

const energyTrend = [
  { label: "Mon", value: 3 },
  { label: "Tue", value: 4 },
  { label: "Wed", value: 4 },
  { label: "Thu", value: 3 },
  { label: "Fri", value: 2 },
  { label: "Sat", value: 4 },
  { label: "Sun", value: 0 },
];

const Insights = () => (
  <PageLayout title="AI Insights" subtitle="Personalized patterns from your health data">
    {/* AI Header */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <HealthCard className="mb-5 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Brain size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-subheading">Health Intelligence</p>
            <p className="text-caption text-muted-foreground">Based on your last 7 days of data</p>
          </div>
        </div>
      </HealthCard>
    </motion.div>

    {/* Insights List */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
      <p className="text-caption font-semibold text-muted-foreground mb-3">Key Observations</p>
      <div className="space-y-3 mb-5">
        {insights.map((insight, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <InsightCard {...insight} />
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Mood Trend */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <p className="text-caption font-semibold text-muted-foreground mb-2">Mood Trend</p>
      <HealthCard className="mb-5">
        <SimpleChart data={moodTrend} maxValue={5} color="bg-health-green" />
      </HealthCard>
    </motion.div>

    {/* Energy Trend */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
      <p className="text-caption font-semibold text-muted-foreground mb-2">Energy Trend</p>
      <HealthCard className="mb-5">
        <SimpleChart data={energyTrend} maxValue={5} color="bg-health-blue" />
      </HealthCard>
    </motion.div>

    {/* Health Score */}
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <HealthCard>
        <div className="flex items-center gap-3 mb-3">
          <Shield size={18} className="text-primary" />
          <p className="text-subheading">Weekly Health Score</p>
        </div>
        <ProgressBar value={72} max={100} color="primary" size="md" />
        <p className="text-caption text-muted-foreground mt-2">
          You're doing well! Keep up your walking routine.
        </p>
      </HealthCard>
    </motion.div>
  </PageLayout>
);

export default Insights;
