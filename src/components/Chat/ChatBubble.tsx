
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  avatar?: string;
  status?: 'sending' | 'sent' | 'seen';
}

interface ChatBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, showAvatar = true }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-end gap-2 max-w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && showAvatar && (
        <div className="flex-shrink-0 w-8 h-8 overflow-hidden rounded-full">
          {message.avatar ? (
            <img 
              src={message.avatar} 
              alt="AI Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-partner-accent flex items-center justify-center">
              <span className="text-white text-xs font-medium">AI</span>
            </div>
          )}
        </div>
      )}
      
      <div className={`
        group flex flex-col max-w-[85%] md:max-w-[75%]
        ${isUser ? 'items-end' : 'items-start'}
      `}>
        <div className={`
          p-3 rounded-2xl 
          ${isUser 
            ? 'bg-user-bubble text-white rounded-br-sm' 
            : 'bg-partner-bubble text-foreground rounded-bl-sm'}
        `}>
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        
        <div className={`
          flex items-center text-xs text-muted-foreground mt-1 px-1
          opacity-60 group-hover:opacity-100 transition-opacity
        `}>
          <span>{formatDistanceToNow(message.timestamp, { addSuffix: true })}</span>
          
          {isUser && message.status && (
            <span className="ml-2">
              {message.status === 'sending' && '•••'}
              {message.status === 'sent' && '✓'}
              {message.status === 'seen' && '✓✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
