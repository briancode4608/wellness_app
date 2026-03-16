import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import HealthCard from "./HealthCard";

interface InsightCardProps {
  message: string;
  type?: "tip" | "trend" | "warning";
  className?: string;
}

const iconMap = {
  tip: { icon: Lightbulb, bg: "bg-health-yellow/10", text: "text-health-yellow" },
  trend: { icon: TrendingUp, bg: "bg-health-green/10", text: "text-health-green" },
  warning: { icon: AlertTriangle, bg: "bg-health-pink/10", text: "text-health-pink" },
};

const InsightCard = ({ message, type = "tip", className = "" }: InsightCardProps) => {
  const { icon: Icon, bg, text } = iconMap[type];
  return (
    <HealthCard className={`flex items-start gap-3 ${className}`}>
      <div className={`${bg} rounded-lg p-2.5 flex-shrink-0`}>
        <Icon size={18} className={text} />
      </div>
      <p className="text-body font-medium text-foreground leading-relaxed">{message}</p>
    </HealthCard>
  );
};

export default InsightCard;
