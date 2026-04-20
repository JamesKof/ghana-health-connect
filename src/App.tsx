import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DemoAuthProvider } from "@/contexts/DemoAuthContext";
import { FloatingBackToTop } from "@/components/FloatingBackToTop";
import { Loader2 } from "lucide-react";

// Lightweight, eagerly-loaded landing route — keeps first paint snappy
import HomePage from "./pages/HomePage";

// All other routes are code-split. They only download when navigated to,
// dramatically reducing the initial JS bundle on mobile networks.
const MembershipPage = lazy(() => import("./pages/MembershipPage"));
const MemberPortalPage = lazy(() => import("./pages/MemberPortalPage"));
const ClaimsPaymentPage = lazy(() => import("./pages/ClaimsPaymentPage"));
const ProvidersPage = lazy(() => import("./pages/ProvidersPage"));
const CredentialingPage = lazy(() => import("./pages/CredentialingPage"));
const PrivateInsurancePage = lazy(() => import("./pages/PrivateInsurancePage"));
const FAQsPage = lazy(() => import("./pages/FAQsPage"));
const DownloadsPage = lazy(() => import("./pages/DownloadsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FacilitiesPage = lazy(() => import("./pages/FacilitiesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NHIAPage = lazy(() => import("./pages/NHIAPage"));
const ManagementPage = lazy(() => import("./pages/ManagementPage"));
const BoardPage = lazy(() => import("./pages/BoardPage"));
const MedicinesListPage = lazy(() => import("./pages/MedicinesListPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Chat widget defers loading the AI streaming code until after first paint
const ChatWidget = lazy(() =>
  import("@/components/ChatWidget").then((m) => ({ default: m.ChatWidget })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" aria-label="Loading page" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <DemoAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <FloatingBackToTop />
            <Suspense fallback={null}>
              <ChatWidget />
            </Suspense>
            <BrowserRouter>
              <AnimatePresence mode="wait">
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/member-portal" element={<MemberPortalPage />} />
                    <Route path="/claims-payment" element={<ClaimsPaymentPage />} />
                    <Route path="/providers" element={<ProvidersPage />} />
                    <Route path="/credentialing" element={<CredentialingPage />} />
                    <Route path="/private-insurance" element={<PrivateInsurancePage />} />
                    <Route path="/faqs" element={<FAQsPage />} />
                    <Route path="/downloads" element={<DownloadsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/facilities" element={<FacilitiesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/nhia" element={<NHIAPage />} />
                    <Route path="/management" element={<ManagementPage />} />
                    <Route path="/board" element={<BoardPage />} />
                    <Route path="/medlist" element={<MedicinesListPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </BrowserRouter>
          </TooltipProvider>
        </DemoAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
