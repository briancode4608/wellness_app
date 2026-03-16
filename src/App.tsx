import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Meals from "./pages/Meals";
import Exercise from "./pages/Exercise";
import Logs from "./pages/Logs";
import Insights from "./pages/Insights";
import Routine from "./pages/Routine";
import Profile from "./pages/Profile";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RequireOnboarding = ({ children }: { children: React.ReactNode }) => {
  const onboarded = localStorage.getItem("onboarded");
  if (!onboarded) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          <Route path="/" element={<RequireOnboarding><Dashboard /></RequireOnboarding>} />
          <Route path="/meals" element={<RequireOnboarding><Meals /></RequireOnboarding>} />
          <Route path="/exercise" element={<RequireOnboarding><Exercise /></RequireOnboarding>} />
          <Route path="/logs" element={<RequireOnboarding><Logs /></RequireOnboarding>} />
          <Route path="/insights" element={<RequireOnboarding><Insights /></RequireOnboarding>} />
          <Route path="/routine" element={<RequireOnboarding><Routine /></RequireOnboarding>} />
          <Route path="/profile" element={<RequireOnboarding><Profile /></RequireOnboarding>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
