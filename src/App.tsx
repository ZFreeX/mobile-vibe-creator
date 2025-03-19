
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserTypeProvider } from "@/context/UserTypeContext";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserTypeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/search" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </UserTypeProvider>
  </QueryClientProvider>
);

export default App;
