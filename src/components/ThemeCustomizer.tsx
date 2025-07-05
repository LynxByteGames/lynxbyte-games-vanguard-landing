import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, X, Sun, Moon, Monitor } from 'lucide-react';

interface ThemeCustomizerProps {
  onThemeChange: (theme: {
    background: string;
    blogPost: string;
    accent: string;
  }) => void;
  currentTheme: {
    background: string;
    blogPost: string;
    accent: string;
  };
}

const ThemeCustomizer = ({ onThemeChange, currentTheme }: ThemeCustomizerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const backgroundOptions = [
    { name: 'Dark', value: 'bg-lynx-dark', preview: '#0f0f23' },
    { name: 'Light', value: 'bg-gray-50', preview: '#f9fafb' },
    { name: 'Blue', value: 'bg-blue-900', preview: '#1e3a8a' },
    { name: 'Purple', value: 'bg-purple-900', preview: '#581c87' },
    { name: 'Green', value: 'bg-green-900', preview: '#14532d' },
  ];

  const blogPostOptions = [
    { name: 'White', value: 'bg-white', preview: '#ffffff' },
    { name: 'Light Gray', value: 'bg-gray-50', preview: '#f9fafb' },
    { name: 'Light Blue', value: 'bg-blue-50', preview: '#eff6ff' },
    { name: 'Light Purple', value: 'bg-purple-50', preview: '#faf5ff' },
    { name: 'Light Green', value: 'bg-green-50', preview: '#f0fdf4' },
  ];

  const accentOptions = [
    { name: 'Pink', value: 'lynx-pink', preview: '#ec4899' },
    { name: 'Blue', value: 'blue-500', preview: '#3b82f6' },
    { name: 'Purple', value: 'purple-500', preview: '#8b5cf6' },
    { name: 'Green', value: 'green-500', preview: '#10b981' },
    { name: 'Orange', value: 'orange-500', preview: '#f97316' },
  ];

  const handleThemeChange = (type: 'background' | 'blogPost' | 'accent', value: string) => {
    onThemeChange({
      ...currentTheme,
      [type]: value,
    });
  };

  return (
    <>
      {/* Floating Theme Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-lynx-pink hover:bg-lynx-pink-hover text-white rounded-full p-3 shadow-lg transition-all duration-300"
        size="icon"
      >
        <Palette size={20} />
      </Button>

      {/* Theme Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute bottom-20 right-6 bg-white rounded-2xl shadow-xl p-6 w-80 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Customize Theme</h3>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Background Color */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Background Color</h4>
              <div className="grid grid-cols-5 gap-2">
                {backgroundOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange('background', option.value)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      currentTheme.background === option.value
                        ? 'border-lynx-pink scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: option.preview }}
                    title={option.name}
                  />
                ))}
              </div>
            </div>

            {/* Blog Post Color */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Blog Post Background</h4>
              <div className="grid grid-cols-5 gap-2">
                {blogPostOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange('blogPost', option.value)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      currentTheme.blogPost === option.value
                        ? 'border-lynx-pink scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: option.preview }}
                    title={option.name}
                  />
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Accent Color</h4>
              <div className="grid grid-cols-5 gap-2">
                {accentOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange('accent', option.value)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      currentTheme.accent === option.value
                        ? 'border-lynx-pink scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: option.preview }}
                    title={option.name}
                  />
                ))}
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Presets</h4>
              <div className="space-y-2">
                <Button
                  onClick={() => onThemeChange({
                    background: 'bg-lynx-dark',
                    blogPost: 'bg-white',
                    accent: 'lynx-pink'
                  })}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Moon size={16} className="mr-2" />
                  Dark Theme
                </Button>
                <Button
                  onClick={() => onThemeChange({
                    background: 'bg-gray-50',
                    blogPost: 'bg-white',
                    accent: 'blue-500'
                  })}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Sun size={16} className="mr-2" />
                  Light Theme
                </Button>
                <Button
                  onClick={() => onThemeChange({
                    background: 'bg-blue-900',
                    blogPost: 'bg-blue-50',
                    accent: 'blue-500'
                  })}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Monitor size={16} className="mr-2" />
                  Blue Theme
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeCustomizer; 