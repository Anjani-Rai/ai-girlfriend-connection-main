
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Moon, User, ArrowLeft, Palette } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useTheme, themePresets } from '@/contexts/ThemeContext';

interface SettingsProps {
  open: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { currentTheme, setTheme } = useTheme();
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 mr-1" 
              onClick={onClose}
            >
              <ArrowLeft size={16} />
            </Button>
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Notifications Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Bell size={16} />
              Notifications
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex flex-col gap-1">
                  <span>Notifications</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Receive notifications from your AI partner
                  </span>
                </Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-reminders" className="flex flex-col gap-1">
                  <span>Daily check-in reminders</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Get a reminder when you haven't checked in
                  </span>
                </Label>
                <Switch
                  id="daily-reminders"
                  checked={dailyReminders}
                  onCheckedChange={setDailyReminders}
                />
              </div>
            </div>
          </div>
          
          {/* Appearance Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Palette size={16} />
              Appearance
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                  <span>Dark mode</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Toggle dark mode theme
                  </span>
                </Label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm">Theme Presets</Label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(themePresets).map(([id, theme]) => (
                    <button
                      key={id}
                      onClick={() => setTheme(id)}
                      className={`
                        group relative overflow-hidden p-4 rounded-xl border transition-all duration-300
                        hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]
                        ${currentTheme === id 
                          ? 'border-primary ring-2 ring-primary/20 shadow-md' 
                          : 'border-border'
                        }
                      `}
                    >
                      <div className="space-y-3">
                        <div className="relative h-24 rounded-lg overflow-hidden">
                          <div 
                            className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, 
                                hsl(${theme.colors.primary}), 
                                hsl(${theme.colors.accent})
                              )`
                            }}
                          />
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center justify-center h-full">
                              <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium shadow-sm">
                                Select Theme
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-sm font-medium">{theme.name}</p>
                          <div className="flex gap-1.5">
                            {['primary', 'accent', 'background'].map((colorKey) => (
                              <div
                                key={colorKey}
                                className="w-4 h-4 rounded-full border border-border/50"
                                style={{
                                  background: `hsl(${theme.colors[colorKey]})`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <User size={16} />
              Account
            </h3>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                Delete All Conversations
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
