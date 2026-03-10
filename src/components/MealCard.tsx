import { LucideIcon } from "lucide-react";
import HealthCard from "./HealthCard";

interface MealCardProps {
  title: string;
  time: string;
  calories: number;
  icon: LucideIcon;
  items: string[];
  color?: string;
  logged?: boolean;
}

const MealCard = ({ title, time, calories, icon: Icon, items, color = "bg-health-green", logged = false }: MealCardProps) => (
  <HealthCard className="flex gap-3 items-start">
    <div className={`${color} rounded-lg p-2.5 flex-shrink-0`}>
      <Icon size={20} className="text-card" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-subheading">{title}</h3>
        {logged && (
          <span className="text-[0.65rem] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            ✓ Logged
          </span>
        )}
      </div>
      <p className="text-caption text-muted-foreground">{time} • {calories} cal</p>
      <p className="text-caption text-muted-foreground mt-1 truncate">
        {items.join(", ")}
      </p>
    </div>
  </HealthCard>
);

export default MealCard;
