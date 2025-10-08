import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { MantineProvider } from '@mantine/core';
import useMantineThemeConfig from "./hooks/use-mantine-theme-config";

// Lazy load page components
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Recruitment = lazy(() => import("./pages/recruitment/Recruitment"));
const Candidates = lazy(() => import("./pages/recruitment/Candidates"));
const EmployeeRequests = lazy(() => import("./pages/timeoff/MyTimeOff"));
const TeamTimeOff = lazy(() => import("./pages/timeoff/TeamTimeOff"));
const EmployeeTimeOff = lazy(() => import("./pages/timeoff/EmployeeTimeOff"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  const { mantineTheme } = useMantineThemeConfig();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MantineProvider theme={mantineTheme} defaultColorScheme="light">
            <Layout>
              <Suspense fallback={<LoadingFallback />}>
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
                  <Route path="/recruitment" element={<Recruitment />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </MantineProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;