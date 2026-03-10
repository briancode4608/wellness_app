import { NavLink, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, Dumbbell, ClipboardList, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/meals", icon: UtensilsCrossed, label: "Meals" },
  { to: "/exercise", icon: Dumbbell, label: "Exercise" },
  { to: "/logs", icon: ClipboardList, label: "Logs" },
  { to: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();

  // Hide on onboarding
  if (location.pathname === "/onboarding") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[3.5rem] py-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-8 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <tab.icon
                size={22}
                className={isActive ? "text-primary" : "text-muted-foreground"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[0.65rem] font-semibold ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
