import { Clock } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface TimelineItem {
  time: string;
  title: string;
  icon: LucideIcon;
  color: string;
  completed?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => (
  <div className="space-y-0">
    {items.map((item, i) => (
      <div key={i} className="flex gap-3 relative">
        <div className="flex flex-col items-center">
          <div className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center flex-shrink-0 ${item.completed ? "opacity-60" : ""}`}>
            <item.icon size={16} className="text-card" />
          </div>
          {i < items.length - 1 && <div className="w-0.5 h-8 bg-border" />}
        </div>
        <div className={`pb-4 ${item.completed ? "opacity-60" : ""}`}>
          <p className="text-caption text-muted-foreground flex items-center gap-1">
            <Clock size={12} /> {item.time}
          </p>
          <p className={`text-body font-semibold ${item.completed ? "line-through" : ""}`}>{item.title}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Timeline;
