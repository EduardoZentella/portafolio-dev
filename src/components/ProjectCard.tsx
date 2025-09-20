import type { ArtProject } from '../data/projects';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps { project: ArtProject; }

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="group overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <img 
          src={project.imageUrl} 
          alt={t(`projects.${project.title}`)} 
          className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-sm font-light text-gray-800 tracking-wide">{t(`projects.${project.title}`)}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{project.medium}</p>
        <p className="text-xs text-gray-400">{project.year}</p>
      </div>
    </motion.div>
  );
};