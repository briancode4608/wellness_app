import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Clock, Trash2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HealthCard from "@/components/HealthCard";
import Timeline from "@/components/Timeline";
import AddRoutineDialog from "@/components/AddRoutineDialog";
import { fetchRoutine } from "@/api/health";
import { useUserData, removeRoutineItem } from "@/lib/userStore";
import { UtensilsCrossed, Pill, Dumbbell, Droplets, BedDouble, Calendar as CalIcon } from "lucide-react";

const iconFor = (cat: string) => {
  const map: any = { Meal: UtensilsCrossed, Medication: Pill, Exercise: Dumbbell, Hydration: Droplets, Sleep: BedDouble, Other: CalIcon };
  return map[cat] || CalIcon;
};
const colorFor = (cat: string) => {
  const map: any = { Meal: "bg-health-green", Medication: "bg-health-purple", Exercise: "bg-health-blue", Hydration: "bg-health-blue", Sleep: "bg-health-pink", Other: "bg-primary" };
  return map[cat] || "bg-primary";
};

const Routine = () => {
  const [remote, setRemote] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const data = useUserData();

  useEffect(() => {
    fetchRoutine()
      .then((r) => setRemote(Array.isArray(r.data) ? r.data : []))
      .catch(() => setRemote([]));
  }, []);

  const customItems = data.routine.map((r) => ({
    time: r.time, title: r.title, icon: iconFor(r.category), color: colorFor(r.category), completed: false, id: r.id,
  }));

  const merged = [...remote.map((s) => ({ ...s, id: undefined })), ...customItems].sort((a, b) => {
    const t = (s: string) => {
      const m = s.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (!m) return 0;
      let h = +m[1]; const min = +m[2]; const ap = m[3]?.toUpperCase();
      if (ap === "PM" && h < 12) h += 12;
      if (ap === "AM" && h === 12) h = 0;
      return h * 60 + min;
    };
    return t(a.time) - t(b.time);
  });

  return (
    <PageLayout title="Daily Routine" subtitle="Your personalized daily schedule">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HealthCard className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-subheading">Today's Plan</p>
            <p className="text-caption text-muted-foreground">{merged.length} activities scheduled</p>
          </div>
          <div className="flex items-center gap-1 text-caption text-primary font-semibold">
            <Clock size={14} />
            <span>6:30 AM – 10:00 PM</span>
          </div>
        </HealthCard>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
        <button onClick={() => setOpen(true)}
          className="w-full bg-primary text-primary-foreground rounded-lg py-3.5 text-body-lg font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          <Plus size={18} /> Add to Routine
        </button>
      </motion.div>

      {data.routine.length > 0 && (
        <div className="mb-5">
          <p className="text-caption font-semibold text-muted-foreground mb-2">Your custom items</p>
          <div className="space-y-2">
            {data.routine.map((r) => (
              <HealthCard key={r.id} className="flex justify-between items-center">
                <div>
                  <p className="text-body font-semibold">{r.time} — {r.title}</p>
                  <p className="text-caption text-muted-foreground">{r.category}{r.notes ? ` • ${r.notes}` : ""}</p>
                </div>
                <button onClick={() => removeRoutineItem(r.id)} className="text-muted-foreground p-1">
                  <Trash2 size={16} />
                </button>
              </HealthCard>
            ))}
          </div>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <HealthCard>
          <Timeline items={merged} />
        </HealthCard>
      </motion.div>

      <AddRoutineDialog open={open} onClose={() => setOpen(false)} />
    </PageLayout>
  );
};

export default Routine;
