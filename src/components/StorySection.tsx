// src/components/StorySection.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { hoverImages } from '../data/hoverImages';

interface StorySectionProps {
  y: any;
  textInternalY: any;
  nameOpacity: any;
  scrollIndicatorOpacity: any;
}

export const StorySection = ({ y, textInternalY, nameOpacity, scrollIndicatorOpacity }: StorySectionProps) => {
  const { t, getRaw } = useLanguage();
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  
  const getStoryLines = (): string[] => getRaw('content.story.lines') || [];
  
  const renderTextWithUnderlines = (text: string) => {
    const underlineData = getRaw('content.story.underlined_words') || {};
    const underlineKeys = Object.keys(underlineData);
    if (underlineKeys.length === 0) return text;

    const regex = new RegExp(`(\\b(?:${underlineKeys.join('|')})\\b)`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (!part) return null;
      const cleanWord = part.toLowerCase();
      if (underlineData.hasOwnProperty(cleanWord)) {
        return (
          <span key={index} className="relative inline-block"
            onMouseEnter={() => setHoveredWord(cleanWord)}
            onMouseLeave={() => setHoveredWord(null)}
          >
            {hoveredWord === cleanWord && (
              <motion.img
                src={hoverImages[cleanWord]} alt={cleanWord}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 h-32 object-cover rounded-lg shadow-lg z-10"
              />
            )}
            <span className="underline decoration-2 decoration-gray-400 cursor-pointer">{part}</span>
          </span>
        );
      }
      return part;
    });
  };

  return (
    <motion.div style={{ y }} className="relative h-full flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full mx-auto text-center p-8 relative">
        <div 
          className="h-[45vh] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <motion.div 
            className="relative text-4xl md:text-6xl font-light leading-tight text-gray-800"
            style={{ y: textInternalY }}
          >
            {getStoryLines().map((line, index) => (
              <p key={index} className="mb-6">{renderTextWithUnderlines(line)}</p>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          style={{ opacity: nameOpacity }}
          className="w-full mt-8 flex items-center justify-end gap-4 relative"
        >
          <Link 
            to="/explore" 
            className="text-2xl font-light text-gray-600 underline decoration-2 decoration-gray-400 hover:decoration-gray-800 transition-colors"
            onMouseEnter={() => setIsNameHovered(true)}
            onMouseLeave={() => setIsNameHovered(false)}
          >
            {t('content.instagram')}
          </Link>
          <motion.div animate={{ opacity: isNameHovered ? 1 : 0, x: isNameHovered ? 0 : -10 }} className="flex items-center gap-2">
              <svg width="40" height="10" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -scale-x-100">
                  <path d="M40 5L30 0.669873V9.33013L40 5ZM0 5.75H30.5V4.25H0V5.75Z" fill="#9CA3AF"/>
              </svg>
              <span className="text-lg font-light text-gray-500">{t('content.follow_me')}</span>
          </motion.div>
          {isNameHovered && (
              <motion.img
                  src={hoverImages['story']} 
                  alt="Instagram"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-full right-0 mb-2 w-48 h-32 object-cover rounded-lg shadow-lg z-10"
              />
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-gray-500 font-light tracking-widest uppercase">{t('content.scroll_down')}</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center relative">
              <motion.div
                className="w-1.5 h-3 bg-gray-500 rounded-full absolute top-2"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};