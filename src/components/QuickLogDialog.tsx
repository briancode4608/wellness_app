import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addMeal, addWater, addMed, addExercise, addMood } from "@/lib/userStore";

export type QuickLogType = "meal" | "water" | "meds" | "exercise" | "mood" | "sleep";

interface Props {
  open: boolean;
  type: QuickLogType | null;
  onClose: () => void;
  defaults?: { name?: string; calories?: number; mealType?: string };
}

const QuickLogDialog = ({ open, type, onClose, defaults }: Props) => {
  // shared local state - reset on close
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [select1, setSelect1] = useState<string>("");
  const [notes, setNotes] = useState("");

  const reset = () => { setText1(""); setText2(""); setNum1(""); setNum2(""); setSelect1(""); setNotes(""); };

  const handleClose = () => { reset(); onClose(); };

  const submit = () => {
    try {
      switch (type) {
        case "meal": {
          const name = text1 || defaults?.name;
          if (!name) return toast.error("Please enter what you ate");
          addMeal({
            name,
            mealType: (select1 || defaults?.mealType || "Snack") as any,
            calories: Number(num1) || defaults?.calories || 0,
            notes,
          });
          toast.success("Meal logged", { description: "Nicely done. Every healthy choice counts." });
          break;
        }
        case "water": {
          const n = Number(num1) || 1;
          addWater(n);
          toast.success(`+${n} glass${n > 1 ? "es" : ""} of water`, { description: "Great job staying hydrated." });
          break;
        }
        case "meds": {
          if (!text1) return toast.error("Please enter the medication name");
          addMed({ name: text1, dose: text2 || "1 dose" });
          toast.success("Medication recorded");
          break;
        }
        case "exercise": {
          if (!text1) return toast.error("Please name the activity");
          addExercise({
            title: text1,
            duration: Number(num1) || 10,
            calories: Number(num2) || 30,
            intensity: (select1 as any) || "Low",
            notes,
          });
          toast.success("Exercise logged", { description: "Every move counts. Well done!" });
          break;
        }
        case "mood": {
          const mood = Number(num1);
          if (Number.isNaN(mood)) return toast.error("Choose a mood value");
          addMood({ mood, energy: Number(num2) || 2, sleepHours: 7, symptoms: notes });
          toast.success("Mood saved", { description: "Thanks for checking in." });
          break;
        }
        case "sleep": {
          const hrs = Number(num1);
          if (!hrs) return toast.error("Enter hours of sleep");
          addMood({ mood: 2, energy: 2, sleepHours: hrs, symptoms: notes });
          toast.success(`Sleep logged: ${hrs}h`);
          break;
        }
      }
      handleClose();
    } catch (e: any) {
      toast.error(e.message || "Couldn't save");
    }
  };

  if (!type) return null;

  const config: Record<QuickLogType, { title: string; desc: string }> = {
    meal: { title: "Log a Meal", desc: "Add what you ate so we can track your nutrition." },
    water: { title: "Log Water", desc: "How many glasses did you just drink?" },
    meds: { title: "Log Medication", desc: "Record the medication you just took." },
    exercise: { title: "Log Exercise", desc: "What activity did you complete?" },
    mood: { title: "Log Mood", desc: "How are you feeling right now?" },
    sleep: { title: "Log Sleep", desc: "How many hours did you sleep last night?" },
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{config[type].title}</DialogTitle>
          <DialogDescription>{config[type].desc}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {type === "meal" && (
            <>
              <div>
                <Label>Meal type</Label>
                <select value={select1 || defaults?.mealType || "Snack"} onChange={(e) => setSelect1(e.target.value)}
                  className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
                </select>
              </div>
              <div>
                <Label>What did you eat?</Label>
                <Input value={text1} onChange={(e) => setText1(e.target.value)} placeholder={defaults?.name || "e.g. Grilled chicken salad"} />
              </div>
              <div>
                <Label>Calories (approx.)</Label>
                <Input type="number" inputMode="numeric" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder={String(defaults?.calories || 350)} />
              </div>
              <div>
                <Label>Notes (optional)</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How you felt, ingredients, etc." />
              </div>
            </>
          )}

          {type === "water" && (
            <div>
              <Label>Glasses</Label>
              <Input type="number" inputMode="numeric" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="1" />
            </div>
          )}

          {type === "meds" && (
            <>
              <div>
                <Label>Medication name</Label>
                <Input value={text1} onChange={(e) => setText1(e.target.value)} placeholder="e.g. Metformin" />
              </div>
              <div>
                <Label>Dose</Label>
                <Input value={text2} onChange={(e) => setText2(e.target.value)} placeholder="e.g. 500 mg" />
              </div>
            </>
          )}

          {type === "exercise" && (
            <>
              <div>
                <Label>Activity</Label>
                <Input value={text1} onChange={(e) => setText1(e.target.value)} placeholder="e.g. Morning walk" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Minutes</Label>
                  <Input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="20" />
                </div>
                <div>
                  <Label>Calories</Label>
                  <Input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="60" />
                </div>
              </div>
              <div>
                <Label>Intensity</Label>
                <select value={select1 || "Low"} onChange={(e) => setSelect1(e.target.value)}
                  className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm">
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
              <div>
                <Label>Notes (optional)</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </>
          )}

          {type === "mood" && (
            <>
              <div>
                <Label>Mood (0 low — 4 great)</Label>
                <Input type="number" min={0} max={4} value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="3" />
              </div>
              <div>
                <Label>Energy (0 low — 4 high)</Label>
                <Input type="number" min={0} max={4} value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="3" />
              </div>
              <div>
                <Label>Notes / symptoms</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </>
          )}

          {type === "sleep" && (
            <>
              <div>
                <Label>Hours slept</Label>
                <Input type="number" step="0.5" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="7.5" />
              </div>
              <div>
                <Label>Notes (optional)</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Quality, interruptions..." />
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickLogDialog;
