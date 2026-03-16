import { Sunrise, Sun, Moon, UtensilsCrossed, Dumbbell, Droplets, Pill, BedDouble, Brain, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";
import MealCard from "@/components/MealCard";
import QuickLogButton from "@/components/QuickLogButton";
import Timeline from "@/components/Timeline";
import InsightCard from "@/components/InsightCard";

const Dashboard = () => {
  const profile = JSON.parse(localStorage.getItem("healthProfile") || '{"name":"Friend"}');
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const timelineItems = [
    { time: "7:00 AM", title: "Breakfast", icon: UtensilsCrossed, color: "bg-health-green", completed: true },
    { time: "8:00 AM", title: "Morning Walk", icon: Dumbbell, color: "bg-health-blue", completed: true },
    { time: "10:00 AM", title: "Hydration Check", icon: Droplets, color: "bg-health-blue", completed: false },
    { time: "12:30 PM", title: "Lunch + Medication", icon: Pill, color: "bg-health-purple", completed: false },
    { time: "3:00 PM", title: "Light Stretching", icon: Dumbbell, color: "bg-health-yellow", completed: false },
    { time: "7:00 PM", title: "Dinner", icon: UtensilsCrossed, color: "bg-health-green", completed: false },
    { time: "10:00 PM", title: "Sleep", icon: BedDouble, color: "bg-health-pink", completed: false },
  ];

  return (
    <PageLayout>
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <p className="text-caption text-muted-foreground">
          {hour < 12 ? <Sunrise size={14} className="inline mr-1" /> : hour < 17 ? <Sun size={14} className="inline mr-1" /> : <Moon size={14} className="inline mr-1" />}
          {greeting}
        </p>
        <h1 className="text-heading">{profile.name || "Friend"} 👋</h1>
        <p className="text-body text-muted-foreground mt-0.5">Every step counts. You're doing great today.</p>
      </motion.div>

      {/* Quick Log */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-caption font-semibold text-muted-foreground mb-2">Quick Log</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          <QuickLogButton icon="🍽️" label="Meal" />
          <QuickLogButton icon="💧" label="Water" />
          <QuickLogButton icon="💊" label="Meds" />
          <QuickLogButton icon="😊" label="Mood" />
          <QuickLogButton icon="🏃" label="Exercise" />
          <QuickLogButton icon="😴" label="Sleep" />
        </div>
      </motion.div>

      {/* AI Insight */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-caption font-semibold text-muted-foreground">AI Insight</p>
          <Link to="/insights" className="text-caption text-primary font-semibold">View All →</Link>
        </div>
        <InsightCard message="Your energy improves on days you walk at least 20 minutes. Keep it up!" type="trend" />
      </motion.div>

      {/* Hydration */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mt-5">
        <HealthCard className="border-health-blue/20 bg-health-blue/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets size={18} className="text-health-blue" />
              <p className="text-body font-semibold">Hydration</p>
            </div>
            <span className="text-caption font-bold text-health-blue">6 / 8 glasses</span>
          </div>
          <ProgressBar value={6} max={8} color="blue" size="sm" className="mt-2" />
        </HealthCard>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-5">
        <HealthCard>
          <p className="text-subheading mb-3">Today's Progress</p>
          <div className="space-y-3">
            <ProgressBar value={2} max={3} color="green" label="Meals" showValue />
            <ProgressBar value={1} max={2} color="blue" label="Exercise" showValue />
            <ProgressBar value={6} max={8} color="blue" label="Water (glasses)" showValue />
            <ProgressBar value={1} max={3} color="purple" label="Medication" showValue />
          </div>
        </HealthCard>
      </motion.div>

      {/* Next Meal */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5">
        <p className="text-caption font-semibold text-muted-foreground mb-2">Upcoming Meal</p>
        <MealCard
          title="Lunch"
          time="12:30 PM"
          calories={520}
          icon={UtensilsCrossed}
          items={["Grilled chicken", "Brown rice", "Steamed veggies"]}
          color="bg-health-green"
        />
      </motion.div>

      {/* Quick Links */}
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

      {/* Daily Timeline */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-5">
        <p className="text-caption font-semibold text-muted-foreground mb-3">Today's Schedule</p>
        <HealthCard>
          <Timeline items={timelineItems} />
        </HealthCard>
      </motion.div>
    </PageLayout>
  );
};

export default Dashboard;
