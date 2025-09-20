import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../services/translationService';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div className="flex gap-2 text-xs font-light tracking-wide">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 transition-colors uppercase ${
          language === 'en'
            ? 'text-gray-900 font-medium border-b-2 border-gray-900'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        ENG
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-2 py-1 transition-colors uppercase ${
          language === 'es'
            ? 'text-gray-900 font-medium border-b-2 border-gray-900'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        ESP
      </button>
    </div>
  );
};