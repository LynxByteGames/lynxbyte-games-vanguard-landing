import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Insights from "./pages/Insights";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import BlogPost from "./pages/BlogPost";
import PitchDeck from "./pages/PitchDeck";
import NotFound from "./pages/NotFound";
import ExitIntentPopup from "./components/ExitIntentPopup";
import ScrollToTop from "./components/ScrollToTop";
import { toast } from "sonner";
import { Analytics } from '@vercel/analytics/react';


const queryClient = new QueryClient();

const App = () => {
  const handleBookConsultation = () => {
    // Open Calendly in new window
    window.open('https://calendly.com/krystian-mlodziejewski-lynxbytegames/30min?back=1&month=2025-07', '_blank');
  };

  const handleClosePopup = () => {
    // Optional: Add any logic when user closes the popup
    console.log('Exit intent popup closed');
  };

  return (
    <QueryClientProvider client={queryClient}>
            <Analytics />

      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<BlogPost />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pitchdeck" element={<PitchDeck />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
        {/* Exit Intent Popup */}
        <ExitIntentPopup
          onBookConsultation={handleBookConsultation}
          onClose={handleClosePopup}
          minTimeOnPage={10000} // 10 seconds
          enabled={true}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
