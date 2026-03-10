import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import HealthCard from "@/components/HealthCard";
import ProgressBar from "@/components/ProgressBar";

const moods = ["😊", "🙂", "😐", "😔", "😢"];
const energyLevels = ["⚡ High", "🔋 Good", "😐 Okay", "🪫 Low", "😴 Very Low"];

const weekData = [
  { day: "Mon", mood: 4, energy: 3, sleep: 7 },
  { day: "Tue", mood: 3, energy: 4, sleep: 8 },
  { day: "Wed", mood: 5, energy: 4, sleep: 7.5 },
  { day: "Thu", mood: 4, energy: 3, sleep: 6 },
  { day: "Fri", mood: 3, energy: 2, sleep: 7 },
  { day: "Sat", mood: 4, energy: 4, sleep: 8 },
  { day: "Sun", mood: 0, energy: 0, sleep: 0 },
];

const Logs = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [sleepHours, setSleepHours] = useState("7");
  const [symptoms, setSymptoms] = useState("");

  return (
    <PageLayout title="Health Logs" subtitle="Track how you're feeling today">
      {/* Mood */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <HealthCard className="mb-4">
          <p className="text-subheading mb-3">How are you feeling?</p>
          <div className="flex justify-between">
            {moods.map((m, i) => (
              <button
                key={i}
                onClick={() => setSelectedMood(i)}
                className={`text-3xl p-2 rounded-lg transition-all ${
                  selectedMood === i ? "bg-primary/10 scale-110" : "opacity-60"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {/* Energy */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <HealthCard className="mb-4">
          <p className="text-subheading mb-3">Energy Level</p>
          <div className="flex flex-wrap gap-2">
            {energyLevels.map((level, i) => (
              <button
                key={i}
                onClick={() => setSelectedEnergy(i)}
                className={`px-3 py-2 rounded-lg text-caption font-semibold transition-all ${
                  selectedEnergy === i
                    ? "bg-health-blue text-health-blue-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {/* Sleep + Symptoms */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <HealthCard className="mb-4">
          <p className="text-subheading mb-3">Sleep & Symptoms</p>
          <div className="mb-4">
            <label className="text-caption text-muted-foreground mb-1.5 block font-semibold">Hours of Sleep</label>
            <input
              type="number"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-body-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="text-caption text-muted-foreground mb-1.5 block font-semibold">Any symptoms? (optional)</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., headache, fatigue, dizziness..."
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-body focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px] resize-none"
            />
          </div>
        </HealthCard>
      </motion.div>

      {/* Weekly chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <p className="text-caption font-semibold text-muted-foreground mb-2">This Week</p>
        <HealthCard className="mb-4">
          <p className="text-caption font-semibold text-muted-foreground mb-3">Sleep (hours)</p>
          <div className="flex items-end gap-2 h-24">
            {weekData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-health-blue/80 rounded-t-sm transition-all"
                  style={{ height: d.sleep ? `${(d.sleep / 10) * 100}%` : "0%" }}
                />
                <span className="text-[0.6rem] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {/* Weekly mood */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <HealthCard className="mb-4">
          <p className="text-caption font-semibold text-muted-foreground mb-3">Mood Trend</p>
          <div className="flex justify-between">
            {weekData.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1">
                <span className="text-lg">{d.mood ? moods[5 - d.mood] || "😊" : "—"}</span>
                <span className="text-[0.6rem] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </HealthCard>
      </motion.div>

      {/* Save */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <button className="w-full bg-primary text-primary-foreground rounded-lg py-3.5 text-body-lg font-bold active:scale-[0.98] transition-transform">
          Save Today's Log
        </button>
      </motion.div>
    </PageLayout>
  );
};

export default Logs;
