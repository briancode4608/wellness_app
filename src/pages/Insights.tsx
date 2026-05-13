import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Shield } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import InsightCard from "@/components/InsightCard";
import HealthCard from "@/components/HealthCard";
import SimpleChart from "@/components/SimpleChart";
import ProgressBar from "@/components/ProgressBar";
import { fetchInsights, fetchWeekData } from "@/api/health";

const Insights = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [moodTrend, setMoodTrend] = useState<any[]>([]);
  const [energyTrend, setEnergyTrend] = useState<any[]>([]);

  useEffect(() => {
    fetchInsights().then((r) => setInsights(r.data));
    fetchWeekData().then((r) => {
      setMoodTrend(r.data.map((d: any) => ({ label: d.day, value: d.mood })));
      setEnergyTrend(r.data.map((d: any) => ({ label: d.day, value: d.energy })));
    });
  }, []);

  return (
    <PageLayout title="AI Insights" subtitle="Personalized patterns from your health data">
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

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-caption font-semibold text-muted-foreground mb-2">Mood Trend</p>
        <HealthCard className="mb-5">
          <SimpleChart data={moodTrend} maxValue={5} color="bg-health-green" />
        </HealthCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <p className="text-caption font-semibold text-muted-foreground mb-2">Energy Trend</p>
        <HealthCard className="mb-5">
          <SimpleChart data={energyTrend} maxValue={5} color="bg-health-blue" />
        </HealthCard>
      </motion.div>

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
};

export default Insights;
