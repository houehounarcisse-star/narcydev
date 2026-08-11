import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Link as LinkIcon } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigateContact: () => void;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNavigateContact,
  onShowToast
}) => {
  if (!project) return null;

  const handleCopyLink = () => {
    const slug = project.slug || project.id;
    const projectUrl = `${window.location.origin}/projets/${slug}`;
    navigator.clipboard.writeText(projectUrl);
    if (onShowToast) {
      onShowToast('Lien du projet copié !', 'success');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar with close button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-mono font-semibold text-slate-500">
                narcydev://projects/{project.id}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
              aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Banner Image / Full Resolution Preview */}
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center min-h-[280px] sm:min-h-[360px] max-h-[520px] p-2 group">
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[480px] w-auto h-auto object-contain mx-auto rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-auto">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#0D47A1] text-white font-bold mb-2 inline-block shadow-md">
                    {project.categoryLabel}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-md">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Subtitle & Description */}
            <div>
              <p className="text-lg font-bold text-[#0D47A1] font-mono mb-3">
                {project.subtitle}
              </p>
              <p className="text-slate-700 text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                {project.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="text-xl sm:text-2xl font-black font-mono text-[#0D47A1]">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#0D47A1]" />
                <span>Fonctionnalités Clés & Architecture</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-sm text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0D47A1] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider mb-3">
                Technologies Employées
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-mono text-[#0D47A1] font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 border-t border-slate-200 bg-slate-50 shrink-0 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-sm cursor-pointer"
                title="Copier le lien direct du projet"
                id="modal-share-link-btn"
              >
                <LinkIcon className="w-4 h-4 text-[#FFCC00]" />
                <span>Copier le Lien</span>
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#0D47A1] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 text-[#FFCC00]" />
                  <span>Accéder au site</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 border border-slate-300 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>Code Source</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigateContact();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#FFCC00] hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm border border-amber-300"
            >
              Commander un projet similaire
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
