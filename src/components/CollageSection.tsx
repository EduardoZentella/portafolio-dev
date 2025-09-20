// src/components/CollageSection.tsx
import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

interface CollageSectionProps {
  opacity: any;
  scale: any;
  exploreOpacity: any;
}

const collagePositions = [
  // Amontonado
  { x: '0%', y: '0%', rotate: -5, scale: 1 },   { x: '8%', y: '-3%', rotate: 3, scale: 1 },
  { x: '-5%', y: '8%', rotate: 2, scale: 1 },  { x: '3%', y: '-9%', rotate: 5, scale: 1 },
  { x: '-10%', y: '-5%', rotate: -3, scale: 1 }, { x: '-2%', y: '10%', rotate: -2, scale: 1 },
  // Expandido
  { x: '-150%', y: '-80%', rotate: -5, scale: 1.1 }, { x: '0%', y: '-90%', rotate: 2, scale: 1.1 },
  { x: '150%', y: '-80%', rotate: 5, scale: 1.1 }, { x: '-150%', y: '80%', rotate: 3, scale: 1.1 },
  { x: '0%', y: '90%', rotate: -2, scale: 1.1 }, { x: '150%', y: '80%', rotate: -3, scale: 1.1 },
];

const containerVariants: Variants = {
  initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  expanded: { transition: { staggerChildren: 0.08, staggerDirection: 1 } },
};

const imageVariants: Variants = {
  initial: (i: number) => ({
    ...collagePositions[i],
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  }),
  expanded: (i: number) => ({
    ...collagePositions[i + 6],
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  }),
};

export const CollageSection = ({ opacity, scale, exploreOpacity }: CollageSectionProps) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="h-screen w-full flex items-center justify-center relative"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vmin] h-[30vmin]"
        variants={containerVariants}
        initial="initial"
        animate={isExpanded ? "expanded" : "initial"}
      >
      {projects.slice(0, 6).map((project, index) => (
          <motion.div
            key={project.id}
            className="absolute top-1 left-0 w-full h-full"
            variants={imageVariants}
            custom={index}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img src={project.imageUrl} alt={project.title} className="object-cover rounded-lg shadow-xl" />
            </div>
          </motion.div>
      ))}
      </motion.div>
      
      <motion.div
        className="relative z-10"
        style={{ opacity: exploreOpacity }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Link
          to="/explore"
          className="bg-gray-800 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-center block"
        >
          <span className="font-medium tracking-wide uppercase">{t('content.explore')}</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};