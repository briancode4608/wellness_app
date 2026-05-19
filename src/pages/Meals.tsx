import { useEffect, useState } from "react";
import { UtensilsCrossed, Camera, Plus, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import MealCard from "@/components/MealCard";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";
import CameraScanner from "@/components/CameraScanner";
import QuickLogDialog from "@/components/QuickLogDialog";
import { fetchMeals, fetchNutrients } from "@/api/health";
import { toast } from "sonner";
import { useUserData, addMeal, todayTotals } from "@/lib/userStore";
import { exportPatientHealthRecord } from "@/lib/pdfExport";

const Meals = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [meals, setMeals] = useState<any[]>([]);
  const [nutrients, setNutrients] = useState<any[]>([]);
  const [openLog, setOpenLog] = useState(false);
  const [scanDefaults, setScanDefaults] = useState<{ name: string; calories: number } | undefined>();

  const data = useUserData();
  const totals = todayTotals(data);
  const totalCalsToday = totals.meals.reduce((s, m) => s + m.calories, 0);

  useEffect(() => {
    fetchMeals().then((r) => setMeals(r.data));
    fetchNutrients().then((r) => setNutrients(r.data));
  }, []);

  const exportLog = () => {
    const stored = JSON.parse(localStorage.getItem("healthProfile") || "{}");
    exportPatientHealthRecord(
      { name: stored.name || "Patient", age: stored.age, weight: stored.weight, height: stored.height,
        conditions: stored.conditions, diet: stored.diet, activity: stored.activity, medications: stored.medications },
      data
    );
  };

  return (
    <PageLayout title="AI Meal Planner" subtitle="Personalized meal recommendations for today">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HealthCard className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-subheading">Nutrition Today</p>
            <span className="text-caption font-bold text-primary">{totalCalsToday} / 1,350 cal</span>
          </div>
          <ProgressBar value={totalCalsToday} max={1350} color="primary" size="sm" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            {nutrients.map((n) => (
              <ProgressBar key={n.label} value={n.value} max={n.max} label={n.label} showValue color={n.color} size="sm" />
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {totals.meals.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-caption font-semibold text-muted-foreground">Your Meals Today</p>
            <button onClick={exportLog} className="text-caption text-primary font-semibold flex items-center gap-1">
              <Download size={12} /> Export
            </button>
          </div>
          <div className="space-y-2">
            {totals.meals.map((m) => (
              <HealthCard key={m.id} className="flex justify-between items-center">
                <div>
                  <p className="text-body font-semibold">{m.name}</p>
                  <p className="text-caption text-muted-foreground">{m.mealType} • {m.calories} cal</p>
                </div>
                <span className="text-[0.65rem] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">✓ Logged</span>
              </HealthCard>
            ))}
          </div>
        </motion.div>
      )}

      <p className="text-caption font-semibold text-muted-foreground mb-2">Suggested for You</p>
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
        <button
          onClick={() => { setScanDefaults(undefined); setOpenLog(true); }}
          className="w-full bg-primary text-primary-foreground rounded-lg py-3.5 text-body-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Plus size={18} /> Log a Meal
        </button>
      </motion.div>

      <AnimatePresence>
        {showScanner && (
          <CameraScanner
            onClose={() => setShowScanner(false)}
            onScan={(result) => {
              setShowScanner(false);
              // Open inline log form prefilled with detected food.
              setScanDefaults({ name: typeof result === "string" ? result : (result as any).name || "Scanned meal", calories: 350 });
              setOpenLog(true);
              toast.message("Food detected — confirm details to log");
            }}
          />
        )}
      </AnimatePresence>

      <QuickLogDialog
        open={openLog}
        type={openLog ? "meal" : null}
        onClose={() => { setOpenLog(false); setScanDefaults(undefined); }}
        defaults={scanDefaults}
      />
    </PageLayout>
  );
};

export default Meals;
