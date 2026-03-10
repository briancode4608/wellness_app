import { ReactNode } from "react";

interface HealthCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const HealthCard = ({ children, className = "", onClick }: HealthCardProps) => (
  <div
    onClick={onClick}
    className={`bg-card rounded-lg p-4 shadow-sm border border-border ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform" : ""} ${className}`}
  >
    {children}
  </div>
);

export default HealthCard;
