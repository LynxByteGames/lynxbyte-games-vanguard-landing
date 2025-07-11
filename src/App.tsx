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
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate to home and scroll to contact
      window.location.href = '/#contact';
    }
    toast.success('Przewiń do sekcji kontaktowej, aby umówić konsultację!');
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
