import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, UtensilsCrossed, Dumbbell, Pill, Droplets, BedDouble, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HealthCard from "@/components/HealthCard";
import Timeline from "@/components/Timeline";

const defaultRoutine = [
  { time: "6:30 AM", title: "Wake up & Hydrate", icon: Droplets, color: "bg-health-blue", completed: false },
  { time: "7:00 AM", title: "Morning Medication", icon: Pill, color: "bg-health-purple", completed: false },
  { time: "7:30 AM", title: "Breakfast", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
  { time: "8:30 AM", title: "Morning Walk", icon: Dumbbell, color: "bg-health-blue", completed: false },
  { time: "10:00 AM", title: "Hydration Reminder", icon: Droplets, color: "bg-health-blue", completed: false },
  { time: "12:30 PM", title: "Lunch", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
  { time: "1:00 PM", title: "Afternoon Medication", icon: Pill, color: "bg-health-purple", completed: false },
  { time: "3:00 PM", title: "Light Stretching", icon: Dumbbell, color: "bg-health-yellow", completed: false },
  { time: "4:00 PM", title: "Hydration Reminder", icon: Droplets, color: "bg-health-blue", completed: false },
  { time: "7:00 PM", title: "Dinner", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
  { time: "9:00 PM", title: "Evening Medication", icon: Pill, color: "bg-health-purple", completed: false },
  { time: "10:00 PM", title: "Sleep", icon: BedDouble, color: "bg-health-pink", completed: false },
];

const Routine = () => {
  const [routine] = useState(defaultRoutine);

  return (
    <PageLayout title="Daily Routine" subtitle="Your personalized daily schedule">
      {/* Today's Overview */}
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

      {/* Categories */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {[
            { label: "Meals", icon: "🍽️", count: 3 },
            { label: "Meds", icon: "💊", count: 3 },
            { label: "Exercise", icon: "🏃", count: 2 },
            { label: "Hydration", icon: "💧", count: 3 },
            { label: "Sleep", icon: "😴", count: 1 },
          ].map((cat) => (
            <div
              key={cat.label}
              className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-3 py-2 flex-shrink-0"
            >
              <span>{cat.icon}</span>
              <span className="text-caption font-semibold">{cat.label}</span>
              <span className="text-[0.6rem] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-bold">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <HealthCard>
          <Timeline items={routine} />
        </HealthCard>
      </motion.div>

      {/* Add Routine Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5">
        <button className="w-full bg-primary text-primary-foreground rounded-lg py-3.5 text-body-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <Plus size={18} /> Add to Routine
        </button>
      </motion.div>
    </PageLayout>
  );
};

export default Routine;
