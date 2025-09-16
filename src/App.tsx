import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Recruitment from "./pages/recruitment/Recruitment";
import NotFound from "./pages/NotFound";
import { MantineProvider } from '@mantine/core';

// Recruitment pages
// import Jobs from "./pages/recruitment/Jobs";
import Candidates from "./pages/recruitment/Candidates";

// Time Off pages
import EmployeeRequests from "./pages/timeoff/MyTimeOff";
import TeamTimeOff from "./pages/timeoff/TeamTimeOff";
import EmployeeTimeOff from "./pages/timeoff/EmployeeTimeOff";

// Settings page
import Settings from "./pages/settings/Settings";
import useMantineThemeConfig from "./hooks/use-mantine-theme-config";

const queryClient = new QueryClient();


const App = () => {
  const {mantineTheme} = useMantineThemeConfig();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MantineProvider theme={mantineTheme} defaultColorScheme="light" >
          <Toaster />
          <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            {/* Time Off routes */}
            <Route path="/time-off/my-time-off" element={<EmployeeRequests />} />
            <Route path="/time-off/team-time-off" element={<TeamTimeOff />} />
            <Route path="/time-off/employee-time-off" element={<EmployeeTimeOff />} />
            <Route path="/time-off/settings" element={<Settings />} />
            
            {/* Recruitment routes */}
            <Route path="/recruitment/jobs" element={<Recruitment />} />
            <Route path="/recruitment/candidates" element={<Candidates />} />
            <Route path="/recruitment/settings" element={<Settings />} />
            
            {/* Other nav item settings routes */}
            <Route path="/employees/settings" element={<Settings />} />
            <Route path="/checklist/settings" element={<Settings />} />
            <Route path="/attendance/settings" element={<Settings />} />
            <Route path="/payroll/settings" element={<Settings />} />
            <Route path="/performance/settings" element={<Settings />} />
            
            {/* Bottom nav routes */}
            <Route path="/help" element={<Settings />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Legacy routes for compatibility */}
            {/* <Route path="/time-off" element={<EmployeeRequests />} /> */}
            <Route path="/recruitment" element={<Recruitment />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      </MantineProvider>
    </TooltipProvider>
  </QueryClientProvider>
);
}

export default App;
