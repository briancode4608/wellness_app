import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HealthCard from "@/components/HealthCard";
import Timeline from "@/components/Timeline";
import { fetchRoutine } from "@/api/health";

const Routine = () => {
  const [routine, setRoutine] = useState<any[]>([]);

  useEffect(() => {
    fetchRoutine().then((r) => setRoutine(r.data));
  }, []);

  return (
    <PageLayout title="Daily Routine" subtitle="Your personalized daily schedule">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HealthCard className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-subheading">Today's Plan</p>
            <p className="text-caption text-muted-foreground">{routine.length} activities scheduled</p>
          </div>
          <div className="flex items-center gap-1 text-caption text-primary font-semibold">
            <Clock size={14} />
            <span>6:30 AM – 10:00 PM</span>
          </div>
        </HealthCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {[
            { label: "Meals", icon: "🍽️", count: 3 },
            { label: "Meds", icon: "💊", count: 3 },
            { label: "Exercise", icon: "🏃", count: 2 },
            { label: "Hydration", icon: "💧", count: 3 },
            { label: "Sleep", icon: "😴", count: 1 },
          ].map((cat) => (
            <div key={cat.label} className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 flex-shrink-0">
              <span>{cat.icon}</span>
              <span className="text-caption font-semibold">{cat.label}</span>
              <span className="text-[0.6rem] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-bold">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <HealthCard>
          <Timeline items={routine} />
        </HealthCard>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5">
        <button className="w-full bg-primary text-primary-foreground rounded-lg py-3.5 text-body-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <Plus size={18} /> Add to Routine
        </button>
      </motion.div>
    </PageLayout>
  );
};

export default Routine;
