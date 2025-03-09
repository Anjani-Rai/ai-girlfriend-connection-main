
import React, { useRef, useEffect, useState } from 'react';
import { ChatBubble, Message } from './ChatBubble';
import { ChatInput } from './ChatInput';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  partnerAvatar?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  onSendMessage,
  partnerAvatar 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dateMarkers, setDateMarkers] = useState<Map<string, Date>>(new Map());

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate date markers for the chat
  useEffect(() => {
    const newDateMarkers = new Map<string, Date>();
    
    messages.forEach((message) => {
      const dateString = message.timestamp.toDateString();
      if (!newDateMarkers.has(dateString)) {
        newDateMarkers.set(dateString, message.timestamp);
      }
    });
    
    setDateMarkers(newDateMarkers);
  }, [messages]);

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const dateString = message.timestamp.toDateString();
    if (!groups[dateString]) {
      groups[dateString] = [];
    }
    groups[dateString].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  // Format date for display
  const formatDate = (date: Date) => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Find consecutive messages from the same sender
  const shouldShowAvatar = (messages: Message[], index: number) => {
    if (index === messages.length - 1) return true;
    return messages[index].sender !== messages[index + 1].sender;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {Object.keys(groupedMessages).map((dateString) => (
            <div key={dateString} className="space-y-4">
              <div className="flex justify-center">
                <div className="py-1 px-3 bg-muted/50 rounded-full">
                  <span className="text-xs font-medium text-muted-foreground">
                    {formatDate(new Date(dateString))}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {groupedMessages[dateString].map((message, idx, arr) => (
                  <ChatBubble 
                    key={message.id} 
                    message={{
                      ...message,
                      avatar: message.sender === 'ai' ? partnerAvatar : undefined
                    }}
                    showAvatar={message.sender === 'ai' && shouldShowAvatar(arr, idx)}
                  />
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <ChatInput onSend={onSendMessage} />
    </div>
  );
};
