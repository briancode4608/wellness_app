interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "primary" | "green" | "blue" | "yellow" | "pink" | "purple";
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const colorMap = {
  primary: "bg-primary",
  green: "bg-health-green",
  blue: "bg-health-blue",
  yellow: "bg-health-yellow",
  pink: "bg-health-pink",
  purple: "bg-health-purple",
};

const ProgressBar = ({
  value,
  max = 100,
  color = "primary",
  label,
  showValue = false,
  size = "md",
  className = "",
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-caption text-muted-foreground">{label}</span>}
          {showValue && (
            <span className="text-caption font-semibold text-foreground">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${size === "sm" ? "h-1.5" : "h-2.5"}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorMap[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
