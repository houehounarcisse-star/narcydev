import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { Layers, ExternalLink, Eye, CheckCircle2, Share2, Link as LinkIcon } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onNavigateContact: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onShowToast
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'fintech', label: 'Fintech & Mobile' },
    { id: 'web', label: 'Web Corporate & Événements' },
    { id: 'game', label: 'Web Interactif & Jeux' }
  ];

  const handleShareProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    const slug = project.slug || project.id;
    const projectUrl = `${window.location.origin}/projets/${slug}`;
    navigator.clipboard.writeText(projectUrl);
    onShowToast('Lien du projet copié !', 'success');
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-[#0D47A1]" />
            <span>Portfolio & Projets Corporate</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Réalisations & <span className="text-[#0D47A1]">Inventions Logicielles</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Découvrez nos applications déployées : GbèPay, Festival FILA, Pierre Émeraude & The Volt.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0D47A1] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
                id={`filter-${cat.id}`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-[#0D47A1] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Project Image Header (Romas Sig Style) */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95] contrast-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[10px] font-mono uppercase font-extrabold px-3 py-1 rounded-full bg-[#0D47A1] text-white shadow-md border border-blue-400/30 backdrop-blur-md">
                          {project.categoryLabel}
                        </span>
                      </div>

                      {/* Quick Share Link Button */}
                      <button
                        onClick={(e) => handleShareProject(e, project)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-[#FFCC00] text-slate-200 hover:text-black border border-slate-700/80 backdrop-blur-md transition-all duration-200 shadow-md group/share cursor-pointer"
                        title="Copier le lien direct du projet"
                        id={`share-btn-${project.id}`}
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-extrabold text-[#0F172A] group-hover:text-[#0D47A1] transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#0D47A1] mb-4">
                        {project.subtitle}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Key Features Quick List */}
                      {project.keyFeatures && (
                        <div className="mb-6 space-y-1.5">
                          {project.keyFeatures.slice(0, 2).map((feat, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D47A1] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-6 pt-0 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#0D47A1] hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center space-x-2"
                      id={`project-details-${project.id}`}
                    >
                      <Eye className="w-4 h-4 text-[#FFCC00]" />
                      <span>Fiche Détaillée & Métriques</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-100 hover:bg-[#FFCC00] text-slate-700 hover:text-black border border-slate-200 transition-colors"
                        title="Visiter le site / l'application"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
