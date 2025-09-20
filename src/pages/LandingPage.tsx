// src/pages/LandingPage.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { StorySection } from '../components/StorySection';
import { CollageSection } from '../components/CollageSection';

export const LandingPage = () => {
  const { isLoading } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const storyRevealEnd = 0.25;
  const nameDwellTime = 0.15;
  const storyExitStart = storyRevealEnd + nameDwellTime;
  const storyExitEnd = storyExitStart + 0.25;
  const collageEnterStart = storyExitEnd - 0.1;
  const collageEnterEnd = collageEnterStart + 0.25;
  const collageSettlePoint = collageEnterEnd;
  const textInternalY = useTransform(scrollYProgress, [0, storyRevealEnd], ['25vh', '-60%']);

  const storyContainerY = useTransform(
    scrollYProgress,
    [storyRevealEnd, storyExitStart, storyExitEnd],
    ['0vh', '0vh', '-100vh']
  );
  
  const nameOpacity = useTransform(
    scrollYProgress,
    [storyRevealEnd - 0.1, storyRevealEnd],
    [0, 1]
  );
  
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, storyRevealEnd, storyExitStart], [1, 1, 0]);

  const collageOpacity = useTransform(scrollYProgress, [collageEnterStart, collageEnterEnd], [0, 1]);
  const collageScale = useTransform(scrollYProgress, [collageEnterStart, collageEnterEnd], [0.8, 1]);
  const collageY = useTransform(scrollYProgress, [storyExitStart, collageEnterEnd], ['100vh', '0vh']);
  const exploreOpacity = useTransform(scrollYProgress, [collageSettlePoint, collageSettlePoint + 0.05], [0, 1]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div ref={targetRef} className="relative bg-white" style={{ height: '350vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        
        <StorySection 
          y={storyContainerY}
          textInternalY={textInternalY}
          nameOpacity={nameOpacity}
          scrollIndicatorOpacity={scrollIndicatorOpacity}
        />
        
        <motion.div className="absolute inset-0" style={{ y: collageY }}>
            <CollageSection 
              opacity={collageOpacity} 
              scale={collageScale}
              exploreOpacity={exploreOpacity}
            />
        </motion.div>
        
      </div>
    </div>
  );
};