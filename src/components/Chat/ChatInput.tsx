
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea as content grows
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [message]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    onSend(trimmedMessage);
    setMessage('');
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t bg-white glass-morphism">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="w-full resize-none py-3 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-partner-accent"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 bottom-2.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Smile size={20} />
          </Button>
        </div>
        <Button 
          onClick={handleSend}
          disabled={!message.trim()}
          size="icon" 
          className="h-12 w-12 rounded-full bg-partner-accent hover:bg-partner-accent/90 transition-all hover:shadow-md"
        >
          <Send size={18} className="-mr-0.5" />
        </Button>
      </div>
    </div>
  );
};
