import { useState, useEffect, useCallback } from 'react';

interface UseExitIntentOptions {
  minTimeOnPage?: number; // in milliseconds
  enabled?: boolean;
}

export const useExitIntent = ({ 
  minTimeOnPage = 10000, // 10 seconds default
  enabled = true 
}: UseExitIntentOptions = {}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Trigger popup when "8" key is pressed
    if (e.key === '8' && enabled && !hasShown) {
      setShowPopup(true);
      setHasShown(true);
    }
  }, [enabled, hasShown]);

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: NodeJS.Timeout;

    // Set a timer to enable the key press listener after minTimeOnPage
    timeoutId = setTimeout(() => {
      // Add event listener only after the minimum time has passed
      document.addEventListener('keydown', handleKeyPress);
    }, minTimeOnPage);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [enabled, minTimeOnPage, handleKeyPress]);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const resetPopup = useCallback(() => {
    setShowPopup(false);
    setHasShown(false);
  }, []);

  return {
    showPopup,
    closePopup,
    resetPopup,
    hasShown
  };
}; 