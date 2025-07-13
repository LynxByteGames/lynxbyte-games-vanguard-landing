import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useExitIntent } from '@/hooks/use-exit-intent';

interface ExitIntentPopupProps {
  onBookConsultation?: () => void;
  onClose?: () => void;
  minTimeOnPage?: number;
  enabled?: boolean;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  onBookConsultation,
  onClose,
  minTimeOnPage = 10000,
  enabled = true,
}) => {
  const { showPopup, closePopup } = useExitIntent({
    minTimeOnPage,
    enabled,
  });

  const handleClose = () => {
    closePopup();
    onClose?.();
  };

  const handleBookConsultation = () => {
    // Open Calendly in new window
    window.open('https://calendly.com/krystian-mlodziejewski-lynxbytegames/30min?back=1&month=2025-07', '_blank');
    
    // Close the popup
    onClose();
  };

  return (
    <Dialog open={showPopup} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-lynx-gray border-2 border-lynx-pink/30 shadow-2xl">
        <DialogHeader className="text-center relative pb-6">
          {/* Decorative top line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-lynx-pink to-transparent"></div>
          
          {/* Title with enhanced styling */}
          <div className="mt-6 mb-4 text-center">
            <DialogTitle className="text-3xl lg:text-4xl font-black text-white leading-tight">
              <span className="block">FREE ESTIMATION, TIMELINE & SALES ANALYTIC</span>
            </DialogTitle>
          </div>
          
          {/* Description with better layout */}
          <div className="max-w-xl mx-auto text-center">
            <DialogDescription className="text-lg text-white leading-relaxed">
              <span className="block mb-2">Hey, still not sure?</span>
              <span className="block">
                Book a consultation and we'll completely{' '}
                <span className="text-lynx-pink font-bold text-xl">FREE</span>{' '}
                estimate your project and perform a sales analysis!
              </span>
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="py-6">
          <div className="text-center space-y-6">
            {/* Market stats card */}
            <div className="relative bg-lynx-dark p-6 rounded-2xl border border-lynx-pink/20 shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-lynx-pink rounded-t-2xl"></div>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-2 h-2 bg-lynx-pink rounded-full animate-pulse"></div>
                <p className="text-lynx-pink font-bold text-xl">
                  $86.7B <span className="text-white">growing console market is waiting for you
                </span></p>
                <div className="w-2 h-2 bg-lynx-pink rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-300 text-base font-medium">
                The only question is: <span className="text-lynx-pink font-bold">when do we start?</span>
              </p>
            </div>
            
            {/* Contact section */}
            <div className="bg-lynx-dark/50 p-6 rounded-2xl border border-gray-600/30">
              <div className="flex items-center justify-center space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-lynx-pink/40 shadow-lg">
                    <img 
                      src="/lovable-uploads/km.png" 
                      alt="Business Director"
                      className="w-full h-full object-cover"
                    />
                  </div>
              
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-xl mb-1">Krystian Młodziejewski</p>
                  <p className="text-lynx-pink text-base font-semibold">Business & Relations Director</p>
                  <p className="text-gray-300">krsytian.mlodziejewski@lynxbytegames.eu</p>

                  <div className="flex items-center mt-2 space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm font-medium">Available for consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          
          <Button
            onClick={handleBookConsultation}
            className="flex-1 bg-lynx-pink hover:bg-lynx-pink-hover text-white font-bold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Book Free Consultation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup; 