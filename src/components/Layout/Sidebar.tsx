
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart, Sparkles, Brain, Coffee, Smile } from 'lucide-react';

interface PersonalityPreset {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

interface Avatar {
  id: string;
  src: string;
  name: string;
}

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  selectedPersonality: string;
  setSelectedPersonality: (id: string) => void;
  selectedAvatar: string;
  setSelectedAvatar: (id: string) => void;
}

// Personality presets data
const personalityPresets: PersonalityPreset[] = [
  {
    id: 'playful',
    name: 'Playful',
    description: 'Fun, energetic, and always ready for a good laugh',
    icon: Smile,
  },
  {
    id: 'supportive',
    name: 'Supportive',
    description: 'Caring, understanding, and always there for you',
    icon: Heart,
  },
  {
    id: 'witty',
    name: 'Witty',
    description: 'Clever, quick with words, and intellectually stimulating',
    icon: Brain,
  },
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'Passionate, dreamy, and deeply affectionate',
    icon: Sparkles,
  },
  {
    id: 'chill',
    name: 'Chill',
    description: 'Relaxed, calm, and easy-going companion',
    icon: Coffee,
  },
];

// Avatar data (placeholders - in a real app these would be actual image paths)
const avatars: Avatar[] = [
  { id: 'avatar1', src: 'https://i.pravatar.cc/150?img=1', name: 'Emily' },
  { id: 'avatar2', src: 'https://i.pravatar.cc/150?img=5', name: 'Sophia' },
  { id: 'avatar3', src: 'https://i.pravatar.cc/150?img=9', name: 'Olivia' },
  { id: 'avatar4', src: 'https://i.pravatar.cc/150?img=11', name: 'Mia' },
  { id: 'avatar5', src: 'https://i.pravatar.cc/150?img=16', name: 'Ava' },
  { id: 'avatar6', src: 'https://i.pravatar.cc/150?img=18', name: 'Emma' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  closeSidebar,
  selectedPersonality,
  setSelectedPersonality,
  selectedAvatar,
  setSelectedAvatar,
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-80 bg-background border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'shadow-xl' : ''}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Customize Partner</h2>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={closeSidebar}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </Button>
          )}
        </div>

        <Tabs defaultValue="personality" className="h-[calc(100%-4rem)]">
          <TabsList className="w-full justify-start border-b border-border rounded-none p-0 h-12">
            <TabsTrigger 
              value="personality"
              className="flex-1 rounded-none border-b-2 border-transparent
                data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Personality
            </TabsTrigger>
            <TabsTrigger 
              value="appearance"
              className="flex-1 rounded-none border-b-2 border-transparent
                data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="p-4 space-y-4">
            {personalityPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPersonality(preset.id)}
                className={`
                  w-full p-4 rounded-lg border transition-all duration-200
                  hover:border-primary/50 hover:shadow-md
                  ${selectedPersonality === preset.id 
                    ? 'border-primary bg-accent/50' 
                    : 'border-border bg-background'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <preset.icon size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground">{preset.name}</h3>
                    <p className="text-sm text-muted-foreground">{preset.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </TabsContent>

          <TabsContent value="appearance" className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden transition-all duration-200
                    hover:ring-2 hover:ring-primary/50
                    ${selectedAvatar === avatar.id 
                      ? 'ring-2 ring-primary shadow-md' 
                      : 'ring-1 ring-border'}
                  `}
                >
                  <img 
                    src={avatar.src}
                    alt={avatar.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-sm font-medium text-white">
                    {avatar.name}
                  </span>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </aside>

      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};
