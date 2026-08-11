import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HERO_SLIDES,
  SOLUTIONS_CARDS,
  PROPOS_STEPS,
  NARCY_OFFERS,
  PROJECTS,
  TESTIMONIALS,
  PROFILE_INFO
} from '../data/portfolioData';
import { TiltCard3D } from './TiltCard3D';
import {
  Globe,
  ShieldCheck,
  Smartphone,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  SearchCheck,
  PenTool,
  Cpu,
  Star,
  Send,
  Sparkles,
  CreditCard,
  Gamepad2,
  Building2,
  UtensilsCrossed,
  Hotel,
  HardHat,
  MessageSquare
} from 'lucide-react';
import { Project, SectionId } from '../types';

interface HeroProps {
  onNavigate: (id: SectionId) => void;
  onCopyEmail: () => void;
  onSelectProject?: (project: Project) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onCopyEmail, onSelectProject }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Quick form state for "Nous Joindre"
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Auto slide hero banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Auto slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getSolutionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-8 h-8 text-white" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-white" />;
      case 'Smartphone': return <Smartphone className="w-8 h-8 text-white" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-white" />;
      default: return <Globe className="w-8 h-8 text-white" />;
    }
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'SearchCheck': return <SearchCheck className="w-6 h-6 text-[#0D47A1]" />;
      case 'PenTool': return <PenTool className="w-6 h-6 text-[#0D47A1]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#0D47A1]" />;
      default: return <Sparkles className="w-6 h-6 text-[#0D47A1]" />;
    }
  };

  const getOfferIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-7 h-7 text-[#FFCC00]" />;
      case 'Globe': return <Globe className="w-7 h-7 text-[#FFCC00]" />;
      case 'CreditCard': return <CreditCard className="w-7 h-7 text-[#FFCC00]" />;
      case 'Gamepad2': return <Gamepad2 className="w-7 h-7 text-[#FFCC00]" />;
      default: return <Sparkles className="w-7 h-7 text-[#FFCC00]" />;
    }
  };

  const handleCardClick = (projectId: string) => {
    const foundProject = PROJECTS.find((p) => p.id === projectId);
    if (foundProject && onSelectProject) {
      onSelectProject(foundProject);
    } else {
      onNavigate('projects');
    }
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
      alert('Merci pour votre message ! Notre équipe vous contactera sous 24h.');
    }, 1000);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative bg-[#F8FAFC] text-[#0F172A] min-h-screen space-y-16 pb-16 overflow-hidden">
      
      {/* 1. HERO SLIDER BANNER WITH FULL BACKGROUND IMAGE (ROMASIG TECHNOLOGIE STYLE) */}
      <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:h-[620px] bg-slate-950 overflow-hidden shadow-2xl flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* FULL BACKGROUND IMAGE (ROMASIG TECHNOLOGIE STYLE) */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] contrast-[1.05]"
            />
            {/* Dark Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />

            {/* Overlaid Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col justify-center items-start text-left text-white space-y-3 sm:space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#0D47A1] text-[#FFCC00] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-blue-400/30 shadow-md">
                {slide.badge}
              </span>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-white drop-shadow-lg max-w-3xl">
                {slide.title}
              </h1>

              <h2 className="text-xs sm:text-base lg:text-lg font-bold font-mono text-[#FFCC00] tracking-wide max-w-2xl drop-shadow">
                {slide.subtitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200/90 max-w-lg leading-relaxed font-normal drop-shadow-sm">
                {slide.description}
              </p>

              <div className="pt-2 sm:pt-4 flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-5 sm:px-6 py-3 rounded-xl bg-[#0D47A1] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-blue-900/60 flex items-center space-x-2 border border-blue-400/40 group cursor-pointer"
                  id="hero-slide-cta"
                >
                  <span>En savoir Plus</span>
                  <ArrowRight className="w-4 h-4 text-[#FFCC00] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('estimator')}
                  className="px-4 sm:px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-700/80 backdrop-blur-md transition-colors flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <span>Demander un Devis</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Controls & Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
            }
            className="p-1.5 text-slate-300 hover:text-white transition-colors"
            title="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-[#FFCC00]' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-1.5 text-slate-300 hover:text-white transition-colors"
            title="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. INTERACTIVE 3D CARDS "NOS SOLUTIONS" (CIRCULAR BLUE ICONS AS IN VIDEO WITH 3D FLIP) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS_CARDS.map((sol) => (
            <TiltCard3D
              key={sol.id}
              id={`solution-card-${sol.id}`}
              maxTilt={15}
              backContent={
                <div className="flex flex-col items-center justify-center space-y-4 h-full p-6 text-white text-center bg-[#0D47A1] rounded-2xl w-full">
                  <div className="w-12 h-12 rounded-full bg-[#FFCC00] text-black flex items-center justify-center font-black shadow-md mb-2">
                    {getSolutionIcon(sol.icon)}
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                    {sol.title.replace('Nos ', '')}
                  </h3>
                  <div className="flex space-x-2 my-2">
                    <span className="w-2.5 h-2.5 bg-[#FFCC00] rounded-full animate-bounce" />
                    <span className="w-2.5 h-2.5 bg-[#FFCC00] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2.5 h-2.5 bg-[#FFCC00] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('estimator');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FFCC00] hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Estimer mon projet
                  </button>
                  <span className="text-[10px] text-blue-200 block font-mono">
                    Cliquez pour retourner
                  </span>
                </div>
              }
            >
              <div className="p-8 rounded-2xl bg-white border border-slate-200 flex flex-col items-center text-center space-y-4 h-full justify-between shadow-sm hover:border-[#0D47A1] transition-colors">
                <div className="w-16 h-16 rounded-full bg-[#0D47A1] flex items-center justify-center shadow-md shadow-blue-900/20">
                  {getSolutionIcon(sol.icon)}
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {sol.description}
                  </p>
                </div>

                <div className="pt-2 text-xs font-bold uppercase tracking-wider text-[#0D47A1] hover:text-blue-900 flex items-center space-x-1">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </motion.section>

      {/* 3. À PROPOS DE NARCYDEV (ROMAS STYLE SECTION) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="text-xs font-mono font-bold uppercase text-[#0D47A1] tracking-widest mb-2">
            ROYAL MAGNIFICAT SERVICES / NARCYDEV
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight mb-6">
            À Propos de <span className="text-[#0D47A1]">NarcyDev</span>.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mb-12">
            Leader dans la sphère du numérique, nous possédons plusieurs atouts dans la conception des solutions de nos clients : applications mobiles Flutter, progiciels de gestion d’entreprise et passerelles de paiement Mobile Money sécurisées.
          </p>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROPOS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-blue-50/50 hover:border-[#0D47A1] transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  {getStepIcon(step.icon)}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. SERVICES: QUELLES SONT NOS OFFRES ? (NARCY DEV CARDS IN 3D) */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFCC00] bg-blue-950 px-3.5 py-1.5 rounded-full border border-blue-800 inline-block mb-3">
              SERVICES & EXPERTISES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Quelles sont nos offres ?
            </h2>
            <p className="text-slate-300 text-sm mt-3">
              Solutions logicielles sur mesure, applications mobiles et passerelles de paiement sécurisées signées Narcy Dev.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NARCY_OFFERS.map((offer) => (
              <TiltCard3D key={offer.id} id={`offer-card-${offer.id}`} maxTilt={14}>
                <div className="relative rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-[#0D47A1] p-6 flex flex-col justify-between h-full overflow-hidden group transition-colors duration-300 shadow-xl">
                  {/* Top Header & Content */}
                  <div>
                    <div className="w-14 h-14 rounded-full bg-[#0D47A1] flex items-center justify-center mb-5 shadow-lg border border-blue-400/30">
                      {getOfferIcon(offer.iconName)}
                    </div>

                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#FFCC00] bg-slate-900 px-3 py-1 rounded-md border border-slate-700/80 mb-3 inline-block shadow-inner">
                      {offer.tag}
                    </span>

                    <h3 className="text-base sm:text-lg font-black text-white leading-snug mb-3 group-hover:text-[#FFCC00] transition-colors">
                      {offer.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-normal mb-5">
                      {offer.description}
                    </p>
                  </div>

                  {/* Bottom Example & Yellow CTA Button */}
                  <div className="pt-2 border-t border-slate-700/60">
                    <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700/80 mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                        Exemple mis en avant :
                      </span>
                      <span className="text-xs font-bold text-[#FFCC00]">
                        {offer.example}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCardClick(offer.projectId)}
                      className="w-full py-3 px-4 rounded-xl bg-[#FFCC00] hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-md transition-all border border-amber-300 flex items-center justify-center space-x-2 cursor-pointer group-hover:scale-[1.02]"
                      id={`btn-discover-${offer.projectId}`}
                    >
                      <span>Découvrir la solution</span>
                      <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TÉMOIGNAGE: LA JOIE DE NOS CLIENTS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
            TÉMOIGNAGES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-1">
            LA JOIE DE NOS CLIENTS
          </h2>
        </div>

        <div className="relative bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm text-center max-w-3xl mx-auto">
          <div className="flex justify-center space-x-1 mb-4 text-amber-400">
            {[...Array(TESTIMONIALS[currentTestimonial].stars)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>

          <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed mb-6 font-medium">
            "{TESTIMONIALS[currentTestimonial].text}"
          </p>

          <div className="font-bold text-[#0F172A] text-sm">
            {TESTIMONIALS[currentTestimonial].name}
          </div>
          <div className="text-xs font-mono text-[#0D47A1]">
            {TESTIMONIALS[currentTestimonial].role}
          </div>

          {/* Testimonial slider progress dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentTestimonial === idx ? 'w-6 bg-[#0D47A1]' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. NOUS JOINDRE: QUICK FORM BANNER (ROMAS BLUE FORM STYLE) */}
      <section className="bg-[#0D47A1] text-white py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFCC00] bg-blue-900/60 px-3.5 py-1.5 rounded-full border border-blue-400/30 inline-block mb-3">
            NOUS JOINDRE
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Pour plus d’informations sur nos programmes, veuillez remplir le formulaire.
          </h2>

          <p className="text-blue-100 text-sm mb-8 font-medium">
            Notre équipe vous répond sous moins de 2 heures ouvrées.
          </p>

          <form onSubmit={handleQuickSubmit} className="space-y-4 max-w-xl mx-auto">
            <input
              type="text"
              required
              placeholder="Nom complet"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 text-sm transition-all"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                required
                placeholder="Adresse Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 text-sm transition-all"
              />

              <input
                type="tel"
                placeholder="Téléphone"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 text-sm transition-all"
              />
            </div>

            <input
              type="text"
              placeholder="Sujet"
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 text-sm transition-all"
            />

            <textarea
              rows={3}
              required
              placeholder="Message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 text-sm transition-all resize-none"
            />

            <button
              type="submit"
              disabled={formSubmitted}
              className="w-full py-4 rounded-xl bg-[#FFCC00] hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all border border-amber-300 flex items-center justify-center space-x-2"
              id="quick-contact-home-btn"
            >
              <Send className="w-4 h-4 text-black" />
              <span>{formSubmitted ? 'Envoi...' : 'Envoyer le message'}</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
