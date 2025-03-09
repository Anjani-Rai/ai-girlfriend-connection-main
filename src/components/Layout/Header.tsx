
import React, { useState } from 'react';
import { Bell, Home, Settings, MessageSquare, Menu } from 'lucide-react';
import { RelationshipMeter } from '../UI/RelationshipMeter';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Settings as SettingsModal } from '../Profile/Settings';

interface HeaderProps {
  toggleSidebar: () => void;
  relationshipLevel: number;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, relationshipLevel }) => {
  const isMobile = useIsMobile();
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  return (
    <>
      <header className="w-full h-16 glass-morphism sticky top-0 z-50 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu size={20} />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="bg-partner-accent rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-white font-semibold">AI</span>
            </div>
            <h1 className="text-lg font-medium hidden md:block">Your AI Partner</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden md:block md:w-40 lg:w-56">
            <RelationshipMeter level={relationshipLevel} />
          </div>
          
          <nav className="flex items-center gap-1 md:gap-3">
            <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110 hover:rotate-6 hover:bg-primary/10 hover:text-primary">
              <Home size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-partner-accent transition-all duration-300 hover:scale-110 hover:-rotate-6 hover:bg-partner-accent/10">
              <MessageSquare size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="transition-all duration-300 hover:scale-110 hover:rotate-12 hover:bg-primary/10 hover:text-primary"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative transition-all duration-300 hover:scale-110 hover:-rotate-6 hover:bg-partner-accent/10 hover:text-partner-accent">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-partner-accent rounded-full"></span>
            </Button>
          </nav>
        </div>
      </header>

      <SettingsModal 
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};
