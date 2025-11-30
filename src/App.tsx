import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import HomePage from "./pages/HomePage";
import MembershipPage from "./pages/MembershipPage";
import ClaimsPaymentPage from "./pages/ClaimsPaymentPage";
import ProvidersPage from "./pages/ProvidersPage";
import CredentialingPage from "./pages/CredentialingPage";
import PrivateInsurancePage from "./pages/PrivateInsurancePage";
import FAQsPage from "./pages/FAQsPage";
import DownloadsPage from "./pages/DownloadsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/claims-payment" element={<ClaimsPaymentPage />} />
              <Route path="/providers" element={<ProvidersPage />} />
              <Route path="/credentialing" element={<CredentialingPage />} />
              <Route path="/private-insurance" element={<PrivateInsurancePage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
