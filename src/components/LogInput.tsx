import { ReactNode } from "react";

interface LogInputProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const LogInput = ({ label, children, className = "" }: LogInputProps) => (
  <div className={className}>
    <label className="text-caption font-semibold text-muted-foreground mb-1.5 block">{label}</label>
    {children}
  </div>
);

export default LogInput;
