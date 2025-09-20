import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

export const ExplorePage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-3xl font-light text-gray-800 tracking-wide">{t('content.welcome')}</h1>
        <p className="text-gray-500 text-sm font-light tracking-wide max-w-2xl mx-auto">
          {t('content.portfolio_subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="text-center mt-16 max-w-2xl mx-auto">
        <p className="text-gray-600 text-sm font-light leading-relaxed">
          {t('content.about_text')}
        </p>
      </div>
    </div>
  );
};