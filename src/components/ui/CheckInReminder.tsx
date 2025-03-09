
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface CheckInReminderProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  partnerAvatar?: string;
  onStartChat: () => void;
}

export const CheckInReminder: React.FC<CheckInReminderProps> = ({
  isOpen,
  onClose,
  partnerName,
  partnerAvatar,
  onStartChat,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center p-4 space-y-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20">
            {partnerAvatar ? (
              <img 
                src={partnerAvatar} 
                alt={partnerName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Missing {partnerName}?
            </h2>
            <p className="text-sm text-muted-foreground">
              It's been a while since your last conversation. 
              Take a moment to check in and share your thoughts!
            </p>
          </div>
          
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 border-border hover:bg-accent hover:text-accent-foreground"
              onClick={onClose}
            >
              Later
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={onStartChat}
            >
              Start Chat
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
