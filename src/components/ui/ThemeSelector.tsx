import React from 'react';
import { useTheme, themePresets } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ThemeSelectorProps {
  open: boolean;
  onClose: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ open, onClose }) => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {Object.entries(themePresets).map(([id, theme]) => (
            <div
              key={id}
              className={`
                relative p-4 rounded-lg border cursor-pointer transition-all
                hover:border-partner-accent/50 hover:shadow-md
                ${currentTheme === id ? 'border-partner-accent ring-2 ring-partner-accent/20' : 'border-border'}
              `}
              onClick={() => {
                setTheme(id);
                onClose();
              }}
            >
              <div className="space-y-2">
                <div className="h-20 rounded-md overflow-hidden">
                  <div 
                    className="w-full h-full"
                    style={{
                      background: `hsl(${theme.colors.primary})`,
                      opacity: 0.8
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-medium">{theme.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};