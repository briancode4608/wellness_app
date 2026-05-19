import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Pill, FileText, Lightbulb } from "lucide-react";
import { Patient, addPrescription, addReview, addInsight } from "@/lib/caregiverStore";
import { exportPatientClinicalRecord } from "@/lib/pdfExport";
import { toast } from "sonner";

interface Props { patient: Patient | null; onClose: () => void; caregiverName: string; }

const PatientRecordDialog = ({ patient, onClose, caregiverName }: Props) => {
  const [rx, setRx] = useState({ medication: "", dosage: "", frequency: "", duration: "", notes: "" });
  const [rev, setRev] = useState({ title: "", findings: "", recommendations: "" });
  const [ins, setIns] = useState({ category: "Observation", note: "" });

  if (!patient) return null;

  const fmt = (d: string) => new Date(d).toLocaleDateString();

  const saveRx = () => {
    if (!rx.medication || !rx.dosage) return toast.error("Medication & dosage required");
    addPrescription(patient.id, { ...rx, prescriber: caregiverName });
    setRx({ medication: "", dosage: "", frequency: "", duration: "", notes: "" });
    toast.success("Prescription added");
  };
  const saveRev = () => {
    if (!rev.title || !rev.findings) return toast.error("Title & findings required");
    addReview(patient.id, { ...rev, reviewer: caregiverName });
    setRev({ title: "", findings: "", recommendations: "" });
    toast.success("Review recorded");
  };
  const saveIns = () => {
    if (!ins.note) return toast.error("Insight note required");
    addInsight(patient.id, { category: ins.category as any, note: ins.note, author: caregiverName });
    setIns({ category: "Observation", note: "" });
    toast.success("Insight added");
  };

  return (
    <Dialog open={!!patient} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle>{patient.name}</DialogTitle>
              <DialogDescription>
                Age {patient.age} • {patient.sex} • Risk {patient.riskLevel.toUpperCase()}
                {patient.conditions.length ? ` • ${patient.conditions.join(", ")}` : ""}
              </DialogDescription>
            </div>
            <Button size="sm" variant="outline" onClick={() => exportPatientClinicalRecord(patient, caregiverName)}>
              <Download size={14} className="mr-1" /> PDF
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="prescriptions" className="mt-2">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="prescriptions"><Pill size={14} className="mr-1" />Rx</TabsTrigger>
            <TabsTrigger value="reviews"><FileText size={14} className="mr-1" />Reviews</TabsTrigger>
            <TabsTrigger value="insights"><Lightbulb size={14} className="mr-1" />Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-4">
            <div className="rounded-lg border p-3 space-y-2 bg-muted/30">
              <p className="text-sm font-semibold">New prescription</p>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Medication" value={rx.medication} onChange={(e) => setRx({ ...rx, medication: e.target.value })} />
                <Input placeholder="Dosage (e.g. 500 mg)" value={rx.dosage} onChange={(e) => setRx({ ...rx, dosage: e.target.value })} />
                <Input placeholder="Frequency (e.g. Twice daily)" value={rx.frequency} onChange={(e) => setRx({ ...rx, frequency: e.target.value })} />
                <Input placeholder="Duration (e.g. 30 days)" value={rx.duration} onChange={(e) => setRx({ ...rx, duration: e.target.value })} />
              </div>
              <Textarea placeholder="Notes / instructions" value={rx.notes} onChange={(e) => setRx({ ...rx, notes: e.target.value })} />
              <Button size="sm" onClick={saveRx}>Add Prescription</Button>
            </div>
            <div className="space-y-2">
              {patient.prescriptions.length === 0 && <p className="text-sm text-muted-foreground">No prescriptions yet.</p>}
              {patient.prescriptions.map((p) => (
                <div key={p.id} className="border rounded-md p-3 text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>{p.medication} — {p.dosage}</span>
                    <span className="text-xs text-muted-foreground">{fmt(p.date)}</span>
                  </div>
                  <p className="text-muted-foreground text-xs">{p.frequency} • {p.duration} • {p.prescriber}</p>
                  {p.notes && <p className="text-xs mt-1">{p.notes}</p>}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="rounded-lg border p-3 space-y-2 bg-muted/30">
              <p className="text-sm font-semibold">New medical review</p>
              <Input placeholder="Title (e.g. Quarterly check-up)" value={rev.title} onChange={(e) => setRev({ ...rev, title: e.target.value })} />
              <div>
                <Label className="text-xs">Findings</Label>
                <Textarea value={rev.findings} onChange={(e) => setRev({ ...rev, findings: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs">Recommendations</Label>
                <Textarea value={rev.recommendations} onChange={(e) => setRev({ ...rev, recommendations: e.target.value })} />
              </div>
              <Button size="sm" onClick={saveRev}>Save Review</Button>
            </div>
            <div className="space-y-2">
              {patient.reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
              {patient.reviews.map((r) => (
                <div key={r.id} className="border rounded-md p-3 text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>{r.title}</span>
                    <span className="text-xs text-muted-foreground">{fmt(r.date)} • {r.reviewer}</span>
                  </div>
                  <p className="text-xs mt-1"><b>Findings:</b> {r.findings}</p>
                  <p className="text-xs mt-1"><b>Recommendations:</b> {r.recommendations}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="rounded-lg border p-3 space-y-2 bg-muted/30">
              <p className="text-sm font-semibold">New clinical insight</p>
              <select value={ins.category} onChange={(e) => setIns({ ...ins, category: e.target.value })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Observation</option><option>Risk Alert</option><option>Lifestyle</option><option>Follow-up</option>
              </select>
              <Textarea placeholder="Insight or recommendation..." value={ins.note} onChange={(e) => setIns({ ...ins, note: e.target.value })} />
              <Button size="sm" onClick={saveIns}>Add Insight</Button>
            </div>
            <div className="space-y-2">
              {patient.insights.length === 0 && <p className="text-sm text-muted-foreground">No insights yet.</p>}
              {patient.insights.map((i) => (
                <div key={i.id} className="border rounded-md p-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">{i.category}</span>
                    <span className="text-xs text-muted-foreground">{fmt(i.date)} • {i.author}</span>
                  </div>
                  <p className="text-xs mt-1">{i.note}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientRecordDialog;
