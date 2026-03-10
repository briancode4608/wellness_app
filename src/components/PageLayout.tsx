import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  noPadding?: boolean;
}

const PageLayout = ({ children, title, subtitle, className = "", noPadding = false }: PageLayoutProps) => (
  <div className={`min-h-screen pb-20 ${noPadding ? "" : "px-4 pt-6"} max-w-lg mx-auto ${className}`}>
    {title && (
      <div className={`mb-5 ${noPadding ? "px-4 pt-6" : ""}`}>
        <h1 className="text-heading">{title}</h1>
        {subtitle && <p className="text-body text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

export default PageLayout;
