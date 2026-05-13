import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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

const RequireAuth = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: Array<"user" | "caregiver">;
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  // Patients must complete onboarding
  if (user.role === "user" && !localStorage.getItem("onboarded") && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
            <Route path="/caregiver" element={<RequireAuth roles={["caregiver"]}><CaregiverDashboard /></RequireAuth>} />
            <Route path="/" element={<RequireAuth roles={["user"]}><Dashboard /></RequireAuth>} />
            <Route path="/meals" element={<RequireAuth roles={["user"]}><Meals /></RequireAuth>} />
            <Route path="/exercise" element={<RequireAuth roles={["user"]}><Exercise /></RequireAuth>} />
            <Route path="/logs" element={<RequireAuth roles={["user"]}><Logs /></RequireAuth>} />
            <Route path="/insights" element={<RequireAuth roles={["user"]}><Insights /></RequireAuth>} />
            <Route path="/routine" element={<RequireAuth roles={["user"]}><Routine /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
