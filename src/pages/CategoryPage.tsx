// src/pages/CategoryPage.tsx
import { useParams } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useLanguage } from '../contexts/LanguageContext';

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const { t } = useLanguage();
  const filteredProjects = projects.filter(p => p.category === categoryName);

  // Get the translated category name
  const getCategoryTranslation = (category: string) => {
    switch(category) {
      case 'Ilustración': return t('portfolio.categories.illustration');
      case 'Pintura': return t('portfolio.categories.painting');
      case 'Diseño': return t('portfolio.categories.design');
      default: return category;
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-2xl font-light text-gray-800 tracking-wide uppercase">
          {getCategoryTranslation(categoryName || '')}
        </h1>
        <div className="w-12 h-px bg-gray-300 mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p className="font-light">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
};