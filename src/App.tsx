import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import LazyLoad from "./components/LazyLoad";

// Lazy load heavy components for better performance
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Videos = lazy(() => import("./pages/Videos"));
const Exams = lazy(() => import("./pages/Exams"));
const Quizzes = lazy(() => import("./pages/Quizzes"));
const Alumni = lazy(() => import("./pages/Alumni"));
const LearnAI = lazy(() => import("./pages/LearnAI"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={
                  <LazyLoad>
                    <AdminDashboard />
                  </LazyLoad>
                } />
                <Route path="/quizzes" element={
                  <LazyLoad>
                    <Quizzes />
                  </LazyLoad>
                } />
                <Route path="/exams" element={
                  <LazyLoad>
                    <Exams />
                  </LazyLoad>
                } />
                <Route path="/videos" element={  
                  <LazyLoad>
                    <Videos />
                  </LazyLoad>
                } />
                <Route path="/learn-ai" element={
                  <LazyLoad>
                    <LearnAI />
                  </LazyLoad>
                } />
                <Route path="/alumni" element={
                  <LazyLoad>
                    <Alumni />
                  </LazyLoad>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
