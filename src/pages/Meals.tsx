import { useState } from "react";
import { UtensilsCrossed, Coffee, Sun, Moon, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import MealCard from "@/components/MealCard";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";
import CameraScanner from "@/components/CameraScanner";
import { toast } from "sonner";

const meals = [
  {
    title: "Breakfast",
    time: "7:00 AM",
    calories: 380,
    icon: Coffee,
    items: ["Oatmeal with berries", "Green tea", "Boiled egg"],
    color: "bg-health-yellow",
    logged: true,
  },
  {
    title: "Lunch",
    time: "12:30 PM",
    calories: 520,
    icon: Sun,
    items: ["Grilled chicken salad", "Brown rice", "Steamed broccoli"],
    color: "bg-health-green",
    logged: false,
  },
  {
    title: "Dinner",
    time: "7:00 PM",
    calories: 450,
    icon: Moon,
    items: ["Baked salmon", "Quinoa", "Roasted vegetables"],
    color: "bg-health-blue",
    logged: false,
  },
];

const nutrients = [
  { label: "Protein", value: 45, max: 80, color: "blue" as const },
  { label: "Carbs", value: 120, max: 200, color: "yellow" as const },
  { label: "Fat", value: 25, max: 55, color: "pink" as const },
  { label: "Fiber", value: 12, max: 30, color: "green" as const },
];

const Meals = () => {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <PageLayout title="AI Meal Planner" subtitle="Personalized meal recommendations for today">
      {/* Nutrition Overview */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HealthCard className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-subheading">Nutrition Today</p>
            <span className="text-caption font-bold text-primary">900 / 1,350 cal</span>
          </div>
          <ProgressBar value={900} max={1350} color="primary" size="sm" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            {nutrients.map((n) => (
              <ProgressBar key={n.label} value={n.value} max={n.max} label={n.label} showValue color={n.color} size="sm" />
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {/* Meal Cards */}
      <div className="space-y-3">
        {meals.map((meal, i) => (
          <motion.div key={meal.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <MealCard {...meal} />
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-5 space-y-3">
        <button
          onClick={() => setShowScanner(true)}
          className="w-full bg-card border-2 border-dashed border-primary/30 text-primary rounded-lg py-3.5 text-body-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Camera size={18} /> Scan Food
        </button>
        <button className="w-full bg-primary text-primary-foreground rounded-lg py-3.5 text-body-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <UtensilsCrossed size={18} /> Log a Meal
        </button>
      </motion.div>

      {/* Camera Scanner */}
      <AnimatePresence>
        {showScanner && (
          <CameraScanner
            onClose={() => setShowScanner(false)}
            onScan={(result) => {
              setShowScanner(false);
              toast.success(`Detected: ${result}`, { description: "Food has been added to your log." });
            }}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Meals;
