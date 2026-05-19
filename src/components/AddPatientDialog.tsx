import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addPatient } from "@/lib/caregiverStore";
import { toast } from "sonner";

interface Props { open: boolean; onClose: () => void; }

const AddPatientDialog = ({ open, onClose }: Props) => {
  const [form, setForm] = useState({
    name: "", age: "", sex: "Female", email: "", phone: "",
    conditions: "", allergies: "", emergencyContact: "", riskLevel: "low",
  });
  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = () => {
    if (!form.name.trim() || !form.age) return toast.error("Name and age are required");
    addPatient({
      name: form.name.trim(),
      age: Number(form.age),
      sex: form.sex as any,
      email: form.email || undefined,
      phone: form.phone || undefined,
      conditions: form.conditions.split(",").map((s) => s.trim()).filter(Boolean),
      allergies: form.allergies || undefined,
      emergencyContact: form.emergencyContact || undefined,
      riskLevel: form.riskLevel as any,
    });
    toast.success("Patient registered", { description: form.name });
    setForm({ name: "", age: "", sex: "Female", email: "", phone: "", conditions: "", allergies: "", emergencyContact: "", riskLevel: "low" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register New Patient</DialogTitle>
          <DialogDescription>Create a new patient record for your caseload.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div>
            <Label>Full name *</Label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Age *</Label>
              <Input type="number" value={form.age} onChange={(e) => set("age", e.target.value)} />
            </div>
            <div>
              <Label>Sex</Label>
              <select value={form.sex} onChange={(e) => set("sex", e.target.value)}
                className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Female</option><option>Male</option><option>Other</option>
              </select>
            </div>
            <div>
              <Label>Risk</Label>
              <select value={form.riskLevel} onChange={(e) => set("riskLevel", e.target.value)}
                className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Conditions (comma-separated)</Label>
            <Input value={form.conditions} onChange={(e) => set("conditions", e.target.value)} placeholder="Diabetes, Hypertension" />
          </div>
          <div>
            <Label>Allergies</Label>
            <Input value={form.allergies} onChange={(e) => set("allergies", e.target.value)} placeholder="Penicillin..." />
          </div>
          <div>
            <Label>Emergency contact</Label>
            <Textarea value={form.emergencyContact} onChange={(e) => set("emergencyContact", e.target.value)} placeholder="Name, relationship, phone" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={submit}>Register Patient</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
