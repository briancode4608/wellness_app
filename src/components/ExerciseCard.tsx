import { Clock, CheckCircle2 } from "lucide-react";
import HealthCard from "./HealthCard";

interface ExerciseCardProps {
  title: string;
  duration: string;
  calories: number;
  description: string;
  completed?: boolean;
  intensity?: "Low" | "Medium" | "High";
}

const intensityColors = {
  Low: "bg-health-green/15 text-health-green",
  Medium: "bg-health-yellow/15 text-health-yellow",
  High: "bg-health-pink/15 text-health-pink",
};

const ExerciseCard = ({ title, duration, calories, description, completed = false, intensity = "Low" }: ExerciseCardProps) => (
  <HealthCard className="relative overflow-hidden">
    {completed && (
      <div className="absolute top-3 right-3">
        <CheckCircle2 size={20} className="text-health-green" />
      </div>
    )}
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${intensityColors[intensity]}`}>
        {intensity}
      </span>
    </div>
    <h3 className="text-subheading mb-1">{title}</h3>
    <p className="text-caption text-muted-foreground mb-3">{description}</p>
    <div className="flex items-center gap-4 text-caption text-muted-foreground">
      <span className="flex items-center gap-1">
        <Clock size={14} /> {duration}
      </span>
      <span>🔥 {calories} cal</span>
    </div>
    {!completed && (
      <button className="mt-3 w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-caption font-bold active:scale-[0.98] transition-transform">
        Start Exercise
      </button>
    )}
  </HealthCard>
);

export default ExerciseCard;
