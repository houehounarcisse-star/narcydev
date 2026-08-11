import React, { useState, useEffect } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';
import { ArrowUp, Github, ExternalLink, MessageSquare, Heart } from 'lucide-react';
import { SectionId } from '../types';
import { SECTION_ROUTES } from '../utils/router';
import { NarcyDevLogo } from './NarcyDevLogo';

interface FooterProps {
  onNavigate: (id: SectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, id: SectionId) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="relative bg-[#0F172A] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <NarcyDevLogo size="lg" showSubtitle={true} lightMode={true} />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Studio d'ingénierie logicielle : Applications mobiles Flutter, architectures Fintech sécurisées & plateformes web d'entreprise.
            </p>
            <p className="text-xs font-mono text-[#FFCC00] font-bold">
              {PROFILE_INFO.location}
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a
                  href={SECTION_ROUTES.home.path}
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-[#FFCC00] transition-colors cursor-pointer"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href={SECTION_ROUTES.about.path}
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-[#FFCC00] transition-colors cursor-pointer"
                >
                  À propos & Services
                </a>
              </li>
              <li>
                <a
                  href={SECTION_ROUTES.projects.path}
                  onClick={(e) => handleLinkClick(e, 'projects')}
                  className="hover:text-[#FFCC00] transition-colors cursor-pointer"
                >
                  Nos Projets
                </a>
              </li>
              <li>
                <a
                  href={SECTION_ROUTES.estimator.path}
                  onClick={(e) => handleLinkClick(e, 'estimator')}
                  className="hover:text-[#FFCC00] transition-colors cursor-pointer"
                >
                  Estimateur de Devis
                </a>
              </li>
              <li>
                <a
                  href={SECTION_ROUTES.contact.path}
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-[#FFCC00] transition-colors cursor-pointer"
                >
                  Nous Contacter
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-4">
              Contact & Liens
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_INFO.comeup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center space-x-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-sky-400" />
                  <span>ComeUp Verified</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] flex items-center space-x-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Direct</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs space-y-4 sm:space-y-0">
          <p className="font-mono">
            © {new Date().getFullYear()} <span className="text-[#FFCC00] font-bold">&lt;NarcyDev /&gt;</span> — Narcisse HOUEHOU. Tous droits réservés.
          </p>
          <p className="flex items-center space-x-1">
            <span>Développé avec</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>pour l'excellence Web & Mobile</span>
          </p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-xl bg-[#FFCC00] text-black shadow-lg hover:scale-110 transition-all border border-amber-300 font-bold"
          title="Retour en haut"
          id="back-to-top-btn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};
