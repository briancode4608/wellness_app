import { useEffect, useState } from "react";
import { UtensilsCrossed, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import MealCard from "@/components/MealCard";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";
import CameraScanner from "@/components/CameraScanner";
import { fetchMeals, fetchNutrients } from "@/api/health";
import { toast } from "sonner";

const Meals = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [meals, setMeals] = useState<any[]>([]);
  const [nutrients, setNutrients] = useState<any[]>([]);

  useEffect(() => {
    fetchMeals().then((r) => setMeals(r.data));
    fetchNutrients().then((r) => setNutrients(r.data));
  }, []);

  return (
    <PageLayout title="AI Meal Planner" subtitle="Personalized meal recommendations for today">
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

      <div className="space-y-3">
        {meals.map((meal, i) => (
          <motion.div key={meal.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <MealCard {...meal} />
          </motion.div>
        ))}
      </div>

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
