import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { AboutServices } from './components/AboutServices';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { EstimatorWidget } from './components/EstimatorWidget';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { PrivacyPage } from './components/PrivacyPage';
import { NarcyAiChatbot } from './components/NarcyAiChatbot';
import { Project, ToastMessage, SectionId } from './types';
import { PROFILE_INFO, PROJECTS } from './data/portfolioData';
import {
  getRouteStateFromUrl,
  updateUrlForSection,
  updateUrlForProject,
  RouteState
} from './utils/router';

export default function App() {
  const [routeState, setRouteState] = useState<RouteState>(() => getRouteStateFromUrl());
  const [activeSection, setActiveSection] = useState<SectionId>(() => routeState.sectionId);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [preFilledMessage, setPreFilledMessage] = useState<string>('');

  // Helper to resolve project from slug or ID
  const findProjectBySlug = (slug: string): Project | null => {
    const normalized = slug.toLowerCase().trim();
    return PROJECTS.find((p) => {
      if (p.id.toLowerCase() === normalized) return true;
      if (p.slug && p.slug.toLowerCase() === normalized) return true;
      if (normalized === 'gbepay' && p.id === 'gbepay') return true;
      if ((normalized === 'fila' || normalized === 'fila-festival') && p.id === 'fila-festival') return true;
      if ((normalized === 'pierre-emeraude' || normalized === 'pierreemeraude') && p.id === 'pierre-emeraude') return true;
      if ((normalized === 'the-volt' || normalized === 'volt' || normalized === 'volt-blackout') && p.id === 'volt-blackout') return true;
      return false;
    }) || null;
  };

  // Synchronize URL changes (popstate & hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      const state = getRouteStateFromUrl();
      setRouteState(state);
      setActiveSection(state.sectionId);

      if (state.projectSlug) {
        const proj = findProjectBySlug(state.projectSlug);
        setSelectedProject(proj);
      } else if (state.view !== 'privacy' && !window.location.pathname.includes('/projets/')) {
        setSelectedProject(null);
      }
    };

    // On initial mount, handle deep links or privacy views
    const initialRoute = getRouteStateFromUrl();
    if (initialRoute.projectSlug) {
      const proj = findProjectBySlug(initialRoute.projectSlug);
      if (proj) {
        setSelectedProject(proj);
      }
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const addToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigateSection = (sectionId: SectionId) => {
    setRouteState({ view: 'main', sectionId, projectSlug: null });
    setActiveSection(sectionId);
    updateUrlForSection(sectionId, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    const slug = project.slug || project.id;
    updateUrlForProject(slug, true);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    updateUrlForProject(null, true);
  };

  const handleBackHomeFromPrivacy = () => {
    setRouteState({ view: 'main', sectionId: 'home', projectSlug: null });
    setActiveSection('home');
    updateUrlForSection('home', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    addToast(`Adresse email ${PROFILE_INFO.email} copiée dans le presse-papier !`, 'success');
  };

  const handleApplySpec = (specSummary: string) => {
    setPreFilledMessage(specSummary);
    addToast('Spécification transmise ! Vous êtes redirigé vers le formulaire.', 'info');
    handleNavigateSection('contact');
  };

  // Render Privacy Standalone Page if route matches /privacy/*
  if (routeState.view === 'privacy') {
    return (
      <>
        <PrivacyPage
          type={routeState.privacyType || 'general'}
          onBackToHome={handleBackHomeFromPrivacy}
        />
        <ToastContainer
          toasts={toasts}
          onDismiss={removeToast}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#FFCC00] selection:text-black font-sans relative overflow-x-hidden">
      {/* Background Interactive Particle Canvas */}
      <BackgroundCanvas />

      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onCopyEmail={handleCopyEmail}
      />

      {/* Main Content View Switcher */}
      <main className="relative z-10 pt-12 min-h-[85vh]">
        {viewMode === 'all' ? (
          /* Continuous Scroll View Mode */
          <div className="space-y-4">
            <Hero
              onNavigate={handleNavigateSection}
              onCopyEmail={handleCopyEmail}
              onSelectProject={handleSelectProject}
            />
            <TechMarquee />
            <AboutServices
              onNavigate={handleNavigateSection}
            />
            <ProjectsSection
              onSelectProject={handleSelectProject}
              onNavigateContact={() => handleNavigateSection('contact')}
              onShowToast={addToast}
            />
            <EstimatorWidget
              onPreFillContact={handleApplySpec}
            />
            <ContactSection
              preFilledMessage={preFilledMessage}
              onShowToast={addToast}
            />
          </div>
        ) : (
          /* Single Dedicated Page Section View Mode with Smooth Transition */
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeSection === 'home' && (
                <div>
                  <Hero
                    onNavigate={handleNavigateSection}
                    onCopyEmail={handleCopyEmail}
                    onSelectProject={handleSelectProject}
                  />
                  <TechMarquee />
                </div>
              )}

              {activeSection === 'about' && (
                <div>
                  <AboutServices
                    onNavigate={handleNavigateSection}
                  />
                  <TechMarquee />
                </div>
              )}

              {activeSection === 'services' && (
                <div>
                  <AboutServices
                    onNavigate={handleNavigateSection}
                  />
                </div>
              )}

              {activeSection === 'projects' && (
                <div>
                  <ProjectsSection
                    onSelectProject={handleSelectProject}
                    onNavigateContact={() => handleNavigateSection('contact')}
                    onShowToast={addToast}
                  />
                </div>
              )}

              {activeSection === 'estimator' && (
                <div>
                  <EstimatorWidget
                    onPreFillContact={handleApplySpec}
                  />
                </div>
              )}

              {activeSection === 'contact' && (
                <div>
                  <ContactSection
                    preFilledMessage={preFilledMessage}
                    onShowToast={addToast}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigateSection} />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        onNavigateContact={() => handleNavigateSection('contact')}
        onShowToast={addToast}
      />

      {/* Floating Interactive AI Assistant Chatbot ("Narcy AI") */}
      <NarcyAiChatbot
        onSelectProject={handleSelectProject}
        onNavigateContact={() => handleNavigateSection('contact')}
        onShowToast={addToast}
      />

      {/* Global Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
      />
    </div>
  );
}
