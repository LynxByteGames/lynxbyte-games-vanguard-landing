import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PitchDeck: React.FC = () => {
  const navigate = useNavigate();
  const [fileExists, setFileExists] = useState<boolean | null>(null);

  useEffect(() => {
    // Sprawdź czy plik PDF istnieje
    fetch('/lovable-uploads/LYNXBYTE_GAMES_PITCHDECK.pdf', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          setFileExists(true);
        } else {
          setFileExists(false);
        }
      })
      .catch(() => {
        setFileExists(false);
      });
  }, []);

  if (fileExists === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  if (fileExists === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Plik nie został znaleziony
          </h1>
          <p className="text-muted-foreground mb-6">
            Plik pitchdeck.pdf nie został znaleziony.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-background">
      {/* Full Screen PDF */}
      <iframe
        src="/lovable-uploads/LYNXBYTE_GAMES_PITCHDECK.pdf"
        className="w-full h-full border-0"
        title="LynxByte Games Pitch Deck"
      />
    </div>
  );
};

export default PitchDeck; 