import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Automatycznie przewiń do góry strony przy każdej zmianie ścieżki
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ten komponent nie renderuje niczego
};

export default ScrollToTop; 