import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface SimpleThemeToggleProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const SimpleThemeToggle = ({ currentTheme, onThemeChange }: SimpleThemeToggleProps) => {
  const themes = [
    { name: 'Light', value: 'bg-white text-black', preview: '#ffffff' },
    { name: 'Dark', value: 'bg-black text-white', preview: '#000000' },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Small Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-32 right-6 z-50 bg-lynx-pink hover:bg-lynx-pink-hover text-white rounded-full p-2 shadow-lg transition-all duration-300"
        size="icon"
      >
        <Palette size={16} />
      </Button>

      {/* Theme Options Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute top-40 right-6 bg-white rounded-lg shadow-xl p-4 w-48"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Theme</h4>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => {
                    onThemeChange(theme.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-md transition-all ${
                    currentTheme === theme.value
                      ? 'bg-lynx-pink/10 border border-lynx-pink'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm text-gray-700">{theme.name}</span>
                  <div 
                    className="w-4 h-4 rounded border border-gray-300"
                    style={{ backgroundColor: theme.preview }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleThemeToggle; 