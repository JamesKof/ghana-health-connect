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
import { ChatWidget } from "@/components/ChatWidget";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import MemberPortalPage from "./pages/MemberPortalPage";
import ClaimsPaymentPage from "./pages/ClaimsPaymentPage";
import ProvidersPage from "./pages/ProvidersPage";
import CredentialingPage from "./pages/CredentialingPage";
import PrivateInsurancePage from "./pages/PrivateInsurancePage";
import FAQsPage from "./pages/FAQsPage";
import DownloadsPage from "./pages/DownloadsPage";
import ContactPage from "./pages/ContactPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <LanguageProvider>
        <DemoAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <FloatingBackToTop />
            <ChatWidget />
            <BrowserRouter>
              <AnimatePresence mode="wait">
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
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </TooltipProvider>
        </DemoAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
