import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translationService } from '../services/translationService';
import type { Language } from '../services/translationService';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getRaw: (key: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      await translationService.loadTranslations();
      setIsLoading(false);
    };

    loadTranslations();
  }, []);

  const t = (key: string): string => {
    if (!translationService.isTranslationsLoaded()) {
      return key;
    }
    return translationService.translate(key, language);
  };

  const getRaw = (key: string): any => {
    if (!translationService.isTranslationsLoaded()) {
      return key;
    }
    return translationService.getRaw(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getRaw, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};