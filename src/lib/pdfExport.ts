// Centralised PDF export helpers for patient and caregiver records.
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { UserData } from "./userStore";
import type { Patient } from "./caregiverStore";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const addHeader = (doc: jsPDF, title: string, subtitle?: string) => {
  doc.setFillColor(20, 184, 166); // teal
  doc.rect(0, 0, 210, 22, "F");
  doc.setTextColor(255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("VitalCare Health Report", 14, 14);
  doc.setTextColor(40);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, 32);
  if (subtitle) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110);
    doc.text(subtitle, 14, 38);
  }
  doc.setTextColor(40);
};

const addFooter = (doc: jsPDF) => {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text(
      `Generated ${new Date().toLocaleString()}  •  VitalCare  •  Page ${i} of ${pages}`,
      14, 290
    );
  }
};

const section = (doc: jsPDF, title: string, y: number) => {
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 130, 120);
  doc.text(title, 14, y);
  doc.setDrawColor(220);
  doc.line(14, y + 1.5, 196, y + 1.5);
  doc.setTextColor(40);
  return y + 6;
};

export interface PatientProfileForPdf {
  name: string;
  age?: string | number;
  weight?: string | number;
  height?: string | number;
  conditions?: string[];
  diet?: string[];
  activity?: string;
  medications?: string;
}

export const exportPatientHealthRecord = (
  profile: PatientProfileForPdf,
  data: UserData
) => {
  const doc = new jsPDF();
  addHeader(doc, "Personal Health Record", `${profile.name} • ${fmtDate(new Date().toISOString())}`);

  let y = 46;
  y = section(doc, "Patient Profile", y);
  autoTable(doc, {
    startY: y,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    headStyles: { fillColor: [240, 240, 240], textColor: 40 },
    body: [
      ["Name", String(profile.name || "—")],
      ["Age", String(profile.age || "—")],
      ["Weight", profile.weight ? `${profile.weight} kg` : "—"],
      ["Height", profile.height ? `${profile.height} cm` : "—"],
      ["Conditions", (profile.conditions || []).join(", ") || "—"],
      ["Diet", (profile.diet || []).join(", ") || "—"],
      ["Activity", profile.activity || "—"],
      ["Medications", profile.medications || "—"],
    ],
  });
  y = (doc as any).lastAutoTable.finalY + 8;

  y = section(doc, "Meal Log", y);
  if (data.meals.length === 0) {
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text("No meals logged.", 14, y); y += 8; doc.setTextColor(40);
  } else {
    autoTable(doc, {
      startY: y, theme: "striped",
      head: [["Date", "Type", "Meal", "Calories", "Notes"]],
      body: data.meals.map((m) => [fmt(m.date), m.mealType, m.name, String(m.calories), m.notes || ""]),
      headStyles: { fillColor: [20, 184, 166] },
      styles: { fontSize: 9 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  y = section(doc, "Exercise Log", y);
  if (data.exercises.length === 0) {
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text("No exercises logged.", 14, y); y += 8; doc.setTextColor(40);
  } else {
    autoTable(doc, {
      startY: y, theme: "striped",
      head: [["Date", "Activity", "Duration", "Intensity", "Calories", "Notes"]],
      body: data.exercises.map((e) => [
        fmt(e.date), e.title, `${e.duration} min`, e.intensity, String(e.calories), e.notes || "",
      ]),
      headStyles: { fillColor: [20, 184, 166] },
      styles: { fontSize: 9 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  y = section(doc, "Medication Log", y);
  if (data.meds.length === 0) {
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text("No medications logged.", 14, y); y += 8; doc.setTextColor(40);
  } else {
    autoTable(doc, {
      startY: y, theme: "striped",
      head: [["Date", "Medication", "Dose", "Taken"]],
      body: data.meds.map((m) => [fmt(m.date), m.name, m.dose, m.taken ? "Yes" : "No"]),
      headStyles: { fillColor: [20, 184, 166] },
      styles: { fontSize: 9 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  y = section(doc, "Daily Wellbeing", y);
  if (data.moods.length === 0) {
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text("No wellbeing entries logged.", 14, y); y += 8; doc.setTextColor(40);
  } else {
    autoTable(doc, {
      startY: y, theme: "striped",
      head: [["Date", "Mood (0-4)", "Energy (0-4)", "Sleep (h)", "Symptoms"]],
      body: data.moods.map((m) => [
        fmt(m.date), String(m.mood), String(m.energy), String(m.sleepHours), m.symptoms || "",
      ]),
      headStyles: { fillColor: [20, 184, 166] },
      styles: { fontSize: 9 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  const waterTotal = data.water.reduce((s, w) => s + w.glasses, 0);
  doc.setFontSize(10);
  doc.text(`Total hydration entries: ${data.water.length}  (${waterTotal} glasses)`, 14, y);

  addFooter(doc);
  doc.save(`VitalCare-Health-Record-${profile.name.replace(/\s+/g, "_")}.pdf`);
};

export const exportPatientClinicalRecord = (patient: Patient, caregiverName = "Care Team") => {
  const doc = new jsPDF();
  addHeader(
    doc,
    `Clinical Record — ${patient.name}`,
    `Prepared by ${caregiverName} • ${fmtDate(new Date().toISOString())}`
  );

  let y = 46;
  y = section(doc, "Patient Information", y);
  autoTable(doc, {
    startY: y, theme: "grid", styles: { fontSize: 10, cellPadding: 2 },
    body: [
      ["Name", patient.name],
      ["Age / Sex", `${patient.age} • ${patient.sex}`],
      ["Email", patient.email || "—"],
      ["Phone", patient.phone || "—"],
      ["Conditions", patient.conditions.join(", ") || "—"],
      ["Allergies", patient.allergies || "—"],
      ["Emergency contact", patient.emergencyContact || "—"],
      ["Risk level", patient.riskLevel.toUpperCase()],
      ["Registered", fmtDate(patient.createdAt)],
    ],
  });
  y = (doc as any).lastAutoTable.finalY + 8;

  y = section(doc, "Prescriptions", y);
  if (patient.prescriptions.length === 0) {
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text("No prescriptions on file.", 14, y); y += 8; doc.setTextColor(40);
  } else {
    autoTable(doc, {
      startY: y, theme: "striped",
      head: [["Date", "Medication", "Dosage", "Frequency", "Duration", "Prescriber", "Notes"]],
      body: patient.prescriptions.map((p) => [
        fmtDate(p.date), p.medication, p.dosage, p.frequency, p.duration, p.prescriber, p.notes || "",
      ]),
      headStyles: { fillColor: [20, 184, 166] },
      styles: { fontSize: 9 },
    });
    y = (doc as any).lastAutoTable.finalY + 8;
  }

  y = section(doc, "Medical Reviews", y);
  if (patient.reviews.length === 0) {
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text("No reviews recorded.", 14, y); y += 8; doc.setTextColor(40);
  } else {
    patient.reviews.forEach((r) => {
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold"); doc.setFontSize(11);
      doc.text(`${r.title}`, 14, y);
      doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(110);
      doc.text(`${fmtDate(r.date)} • ${r.reviewer}`, 14, y + 5);
      doc.setTextColor(40); doc.setFontSize(10);
      const findings = doc.splitTextToSize(`Findings: ${r.findings}`, 180);
      const recs = doc.splitTextToSize(`Recommendations: ${r.recommendations}`, 180);
      doc.text(findings, 14, y + 11);
      doc.text(recs, 14, y + 11 + findings.length * 4.5 + 2);
      y += 18 + findings.length * 4.5 + recs.length * 4.5;
    });
    y += 4;
  }

  y = section(doc, "Clinical Insights", y);
  if (patient.insights.length === 0) {
    doc.setFontSize(10); doc.setTextColor(120);
    doc.text("No insights recorded.", 14, y); doc.setTextColor(40);
  } else {
    autoTable(doc, {
      startY: y, theme: "striped",
      head: [["Date", "Category", "Note", "Author"]],
      body: patient.insights.map((i) => [fmtDate(i.date), i.category, i.note, i.author]),
      headStyles: { fillColor: [20, 184, 166] },
      styles: { fontSize: 9 },
    });
  }

  addFooter(doc);
  doc.save(`VitalCare-Clinical-${patient.name.replace(/\s+/g, "_")}.pdf`);
};

export const exportCaregiverRoster = (patients: Patient[], caregiverName = "Care Team") => {
  const doc = new jsPDF();
  addHeader(doc, "Patient Roster Summary", `Prepared by ${caregiverName}`);
  let y = 46;
  autoTable(doc, {
    startY: y, theme: "striped",
    head: [["Name", "Age", "Sex", "Conditions", "Risk", "Rx", "Reviews", "Registered"]],
    body: patients.map((p) => [
      p.name, String(p.age), p.sex, p.conditions.join(", "),
      p.riskLevel.toUpperCase(), String(p.prescriptions.length),
      String(p.reviews.length), fmtDate(p.createdAt),
    ]),
    headStyles: { fillColor: [20, 184, 166] },
    styles: { fontSize: 9 },
  });
  addFooter(doc);
  doc.save("VitalCare-Patient-Roster.pdf");
};
