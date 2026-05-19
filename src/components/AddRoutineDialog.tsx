import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addRoutineItem } from "@/lib/userStore";
import { toast } from "sonner";

interface Props { open: boolean; onClose: () => void; }

const AddRoutineDialog = ({ open, onClose }: Props) => {
  const [time, setTime] = useState("08:00");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Meal");
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!title.trim()) return toast.error("Please add a title");
    addRoutineItem({ time, title: title.trim(), category: category as any, notes });
    toast.success("Added to your routine", { description: `${time} — ${title}` });
    setTitle(""); setNotes(""); onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Routine</DialogTitle>
          <DialogDescription>Schedule a meal, medication, exercise or other reminder.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Time</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div>
              <Label>Category</Label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Meal</option><option>Medication</option><option>Exercise</option>
                <option>Hydration</option><option>Sleep</option><option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Take blood pressure meds" />
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Dose, instructions..." />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={submit}>Add</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoutineDialog;
