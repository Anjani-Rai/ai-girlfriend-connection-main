
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Layout/Header';
import { Sidebar } from '@/components/Layout/Sidebar';
import { ChatInterface } from '@/components/Chat/ChatInterface';
import { Message } from '@/components/Chat/ChatBubble';
import { Settings } from '@/components/Profile/Settings';
import { CheckInReminder } from '@/components/ui/CheckInReminder';
import { ToastContainer, ToastType } from '@/components/ui/ToastNotification';
import { generateUniqueId } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample initial messages for demonstration
const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi there! I'm your AI partner. How are you feeling today?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 3600000 * 24),
  },
  {
    id: '2',
    text: "I'm good, thanks for asking! Just a bit tired from work.",
    sender: 'user',
    timestamp: new Date(Date.now() - 3600000 * 24 + 300000),
    status: 'seen',
  },
  {
    id: '3',
    text: "I'm sorry to hear that. Work can be exhausting sometimes. Is there anything I can help with to make your day better?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 3600000 * 24 + 600000),
  },
  {
    id: '4',
    text: "Good morning! How did you sleep? I hope you're feeling refreshed today 😊",
    sender: 'ai',
    timestamp: new Date(),
  },
];

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const Index = () => {
  const isMobile = useIsMobile();
  
  // State for chat and UI
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // State for user preferences
  const [relationshipLevel, setRelationshipLevel] = useState(35);
  const [selectedPersonality, setSelectedPersonality] = useState('supportive');
  const [selectedAvatar, setSelectedAvatar] = useState('avatar3');
  
  // Mock selected avatar URL (in a real app, this would be based on the selected avatar)
  const partnerAvatar = `https://i.pravatar.cc/150?img=9`;
  const partnerName = "Olivia";

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Mock reminder after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setReminderOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle sending a new message
  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: generateUniqueId(),
      text,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    
    // Update message status to 'sent' after a short delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newUserMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );

      // Show a toast notification
      addToast("Message sent successfully", "success");
      
      // Simulate relationship level increase
      setRelationshipLevel((prev) => Math.min(prev + 2, 100));

      // Simulate AI reply after a delay
      setTimeout(() => {
        const aiReply: Message = {
          id: generateUniqueId(),
          text: simulateAIResponse(text),
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiReply]);
        
        // Update user message status to 'seen'
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newUserMessage.id ? { ...msg, status: 'seen' } : msg
          )
        );
      }, 1500);
    }, 800);
  };

  // Simple AI response simulation
  const simulateAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hi there! It's wonderful to hear from you. How's your day going?";
    } else if (lowerCaseMessage.includes('how are you')) {
      return "I'm here and happy to chat with you! I've been thinking about you. How have you been feeling?";
    } else if (
      lowerCaseMessage.includes('good') || 
      lowerCaseMessage.includes('great') || 
      lowerCaseMessage.includes('well')
    ) {
      return "That's wonderful to hear! I'm glad things are going well for you. Anything exciting you'd like to share?";
    } else if (
      lowerCaseMessage.includes('bad') || 
      lowerCaseMessage.includes('sad') || 
      lowerCaseMessage.includes('tired')
    ) {
      return "I'm sorry to hear that. Remember that I'm always here for you. Would you like to talk about what's bothering you?";
    } else {
      return "Thanks for sharing that with me! I'm always here to listen and chat whenever you need me. What else is on your mind?";
    }
  };

  // Handle toast notifications
  const addToast = (message: string, type: ToastType, duration = 3000) => {
    const newToast = {
      id: generateUniqueId(),
      message,
      type,
      duration,
    };
    
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        relationshipLevel={75}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
          selectedPersonality={selectedPersonality}
          setSelectedPersonality={setSelectedPersonality}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
        />
        
        <main className="flex-1 overflow-hidden flex flex-col chat-container">
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            partnerAvatar={partnerAvatar}
          />
        </main>
      </div>
      
      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      
      <CheckInReminder 
        isOpen={reminderOpen}
        onClose={() => setReminderOpen(false)}
        partnerName={partnerName}
        partnerAvatar={partnerAvatar}
        onStartChat={() => {
          setReminderOpen(false);
          addToast(`Starting conversation with ${partnerName}`, "info");
        }}
      />
      
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
};

export default Index;
