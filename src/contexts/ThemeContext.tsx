import React, { createContext, useContext, useState, useEffect } from 'react';

export const themePresets = {
  etherealRose: {
    name: 'Ethereal Rose',
    colors: {
      background: '335 100% 98%',
      foreground: '335 50% 15%',
      primary: '335 90% 65%',
      'primary-foreground': '335 10% 100%',
      secondary: '335 30% 96%',
      'secondary-foreground': '335 50% 15%',
      accent: '335 85% 65%',
      'accent-foreground': '335 10% 100%',
      muted: '335 30% 96%',
      'muted-foreground': '335 40% 40%',
      border: '335 30% 92%',
      input: '335 30% 96%',
      ring: '335 85% 65%',
      destructive: '0 90% 60%',
      'destructive-foreground': '0 0% 100%',
      popover: '335 100% 98%',
      'popover-foreground': '335 50% 15%',
      card: '335 100% 98%',
      'card-foreground': '335 50% 15%',
      'partner-bubble': '335 100% 97%',
      'partner-accent': '335 85% 65%',
      'partner-progress': '335 85% 65%',
      'user-bubble': '335 90% 65%',
      'hover-overlay': '335 30% 96%',
      'hover-text': '335 50% 15%',
      'hover-border': '335 85% 65%'
    }
  },
  midnightStarlight: {
    name: 'Midnight Starlight',
    colors: {
      background: '240 50% 98%',
      foreground: '240 50% 15%',
      primary: '240 60% 60%',
      'primary-foreground': '240 10% 100%',
      secondary: '240 30% 96%',
      'secondary-foreground': '240 50% 15%',
      accent: '240 70% 65%',
      'accent-foreground': '240 10% 100%',
      muted: '240 30% 96%',
      'muted-foreground': '240 40% 40%',
      border: '240 30% 92%',
      input: '240 30% 96%',
      ring: '240 70% 65%',
      destructive: '0 90% 60%',
      'destructive-foreground': '0 0% 100%',
      popover: '240 50% 98%',
      'popover-foreground': '240 50% 15%',
      card: '240 50% 98%',
      'card-foreground': '240 50% 15%',
      'partner-bubble': '240 100% 97%',
      'partner-accent': '240 70% 65%',
      'partner-progress': '240 70% 65%',
      'user-bubble': '240 60% 60%',
      'hover-overlay': '240 30% 96%',
      'hover-text': '240 50% 15%',
      'hover-border': '240 70% 65%'
    }
  },
  sunsetGlow: {
    name: 'Sunset Glow',
    colors: {
      background: '25 100% 98%',
      foreground: '25 50% 15%',
      primary: '25 90% 65%',
      'primary-foreground': '25 10% 100%',
      secondary: '25 30% 96%',
      'secondary-foreground': '25 50% 15%',
      accent: '25 85% 65%',
      'accent-foreground': '25 10% 100%',
      muted: '25 30% 96%',
      'muted-foreground': '25 40% 40%',
      border: '25 30% 92%',
      input: '25 30% 96%',
      ring: '25 85% 65%',
      destructive: '0 90% 60%',
      'destructive-foreground': '0 0% 100%',
      popover: '25 100% 98%',
      'popover-foreground': '25 50% 15%',
      card: '25 100% 98%',
      'card-foreground': '25 50% 15%',
      'partner-bubble': '25 100% 97%',
      'partner-accent': '25 85% 65%',
      'partner-progress': '25 85% 65%',
      'user-bubble': '25 90% 65%',
      'hover-overlay': '25 30% 96%',
      'hover-text': '25 50% 15%',
      'hover-border': '25 85% 65%'
    }
  },
  neonCyberLove: {
    name: 'Neon Cyber Love',
    colors: {
      background: '300 100% 98%',
      foreground: '300 50% 15%',
      primary: '300 90% 65%',
      'primary-foreground': '300 10% 100%',
      secondary: '300 30% 96%',
      'secondary-foreground': '300 50% 15%',
      accent: '300 85% 65%',
      'accent-foreground': '300 10% 100%',
      muted: '300 30% 96%',
      'muted-foreground': '300 40% 40%',
      border: '300 30% 92%',
      input: '300 30% 96%',
      ring: '300 85% 65%',
      destructive: '0 90% 60%',
      'destructive-foreground': '0 0% 100%',
      popover: '300 100% 98%',
      'popover-foreground': '300 50% 15%',
      card: '300 100% 98%',
      'card-foreground': '300 50% 15%',
      'partner-bubble': '300 100% 97%',
      'partner-accent': '300 85% 65%',
      'partner-progress': '300 85% 65%',
      'user-bubble': '300 90% 65%',
      'hover-overlay': '300 30% 96%',
      'hover-text': '300 50% 15%',
      'hover-border': '300 85% 65%'
    }
  },
  pastelSerenity: {
    name: 'Pastel Serenity',
    colors: {
      background: '170 100% 98%',
      foreground: '170 50% 15%',
      primary: '170 90% 65%',
      'primary-foreground': '170 10% 100%',
      secondary: '170 30% 96%',
      'secondary-foreground': '170 50% 15%',
      accent: '170 85% 65%',
      'accent-foreground': '170 10% 100%',
      muted: '170 30% 96%',
      'muted-foreground': '170 40% 40%',
      border: '170 30% 92%',
      input: '170 30% 96%',
      ring: '170 85% 65%',
      destructive: '0 90% 60%',
      'destructive-foreground': '0 0% 100%',
      popover: '170 100% 98%',
      'popover-foreground': '170 50% 15%',
      card: '170 100% 98%',
      'card-foreground': '170 50% 15%',
      'partner-bubble': '170 100% 97%',
      'partner-accent': '170 85% 65%',
      'partner-progress': '170 85% 65%',
      'user-bubble': '170 90% 65%',
      'hover-overlay': '170 30% 96%',
      'hover-text': '170 50% 15%',
      'hover-border': '170 85% 65%'
    }
  }
};

type ThemeContextType = {
  currentTheme: string;
  setTheme: (themeId: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'etherealRose',
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('etherealRose');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themePresets[savedTheme as keyof typeof themePresets]) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themePresets[themeId as keyof typeof themePresets];
    if (!theme) return;
  
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Update dark mode class
    if (theme.colors.background.includes('dark')) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', themeId);
  };

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);