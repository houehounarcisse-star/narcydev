import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SectionId } from '../types';
import { SECTION_ROUTES } from '../utils/router';
import { NarcyDevLogo } from './NarcyDevLogo';

interface NavbarProps {
  activeSection: SectionId;
  onNavigateSection: (id: SectionId) => void;
  onCopyEmail: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigateSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: SectionId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projets' },
    { id: 'estimator', label: 'Estimateur' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      {/* Scroll Progress Bar (Corporate Blue & MTN Yellow) */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#0D47A1] via-[#0284C7] to-[#FFCC00] transition-all duration-150 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href={SECTION_ROUTES.home.path}
          onClick={(e) => handleLinkClick(e, 'home')}
          className="group focus:outline-none cursor-pointer"
          id="nav-logo-button"
        >
          <NarcyDevLogo size="md" showSubtitle={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const route = SECTION_ROUTES[link.id];
            return (
              <a
                key={link.id}
                href={route.path}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                  isActive
                    ? 'text-black font-bold'
                    : 'text-slate-600 hover:text-[#0D47A1] hover:bg-white/60'
                }`}
                id={`nav-link-${link.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-[#FFCC00] rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                {link.badge && (
                  <span
                    className={`relative z-10 text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                      isActive ? 'bg-[#0D47A1] text-white' : 'bg-[#FFCC00]/30 text-[#0D47A1]'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* CTA Button */}
          <a
            href={SECTION_ROUTES.estimator.path}
            onClick={(e) => handleLinkClick(e, 'estimator')}
            className="group relative px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase overflow-hidden bg-[#FFCC00] text-[#0F172A] hover:bg-[#ebd300] transition-colors shadow-md shadow-amber-500/10 flex items-center space-x-1.5 border border-amber-300 cursor-pointer"
            id="start-project-cta"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0D47A1]" />
            <span>Devis Express</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0D47A1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#0D47A1] text-white hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
            aria-label="Ouvrir le menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-6"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Menu de Navigation
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const route = SECTION_ROUTES[link.id];
                return (
                  <a
                    key={link.id}
                    href={route.path}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FFCC00] text-black font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    id={`mobile-nav-${link.id}`}
                  >
                    <span className="flex items-center space-x-2">
                      {isActive && <CheckCircle2 className="w-4 h-4 text-[#0D47A1]" />}
                      <span>{link.label}</span>
                    </span>
                    {link.badge && (
                      <span className="text-[10px] bg-[#0D47A1] text-white px-2 py-0.5 rounded-full font-mono">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <a
                  href={SECTION_ROUTES.estimator.path}
                  onClick={(e) => handleLinkClick(e, 'estimator')}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-[#FFCC00] text-[#0F172A] border border-amber-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                  id="mobile-cta-button"
                >
                  <Sparkles className="w-4 h-4 text-[#0D47A1]" />
                  <span>Démarrer un projet (Estimateur)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
