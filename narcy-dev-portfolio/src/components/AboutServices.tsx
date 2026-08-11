import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES, PROFILE_INFO } from '../data/portfolioData';
import { AuthorBioSection } from './AuthorBioSection';
import {
  Smartphone,
  CreditCard,
  Gamepad2,
  Cpu,
  CheckCircle,
  Code2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Service, SectionId } from '../types';

interface AboutServicesProps {
  onNavigate: (id: SectionId) => void;
}

export const AboutServices: React.FC<AboutServicesProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos((prev) => ({ ...prev, [cardId]: { x, y } }));
  };

  const getServiceIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className={`w-8 h-8 ${colorClass}`} />;
      case 'CreditCard': return <CreditCard className={`w-8 h-8 ${colorClass}`} />;
      case 'Gamepad2': return <Gamepad2 className={`w-8 h-8 ${colorClass}`} />;
      case 'Cpu': return <Cpu className={`w-8 h-8 ${colorClass}`} />;
      default: return <Code2 className={`w-8 h-8 ${colorClass}`} />;
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0D47A1]" />
            <span>À Propos & Services Corporate</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Architecte d'Applications & <br className="hidden sm:inline" />
            <span className="text-[#0D47A1]">Ingénieur Fintech</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Un savoir-faire reconnu dans la conception de plateformes logicielles, la numérisation des paiements et la création d'expériences web interactives sur mesure.
          </p>
        </div>

        {/* Story / About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Main About Card */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 pointer-events-none font-mono text-9xl font-black select-none">
              &lt;/&gt;
            </div>

            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0D47A1] text-[#FFCC00] flex items-center justify-center font-bold text-xl shadow-sm">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F172A]">{PROFILE_INFO.name}</h3>
                  <p className="text-xs text-[#0D47A1] font-mono font-bold">{PROFILE_INFO.brandName} • {PROFILE_INFO.location}</p>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Mon approche associe la rigueur de l'ingénierie logicielle et de la sécurité des transactions à une maîtrise avancée des frameworks modernes (Flutter, Dart, React, Supabase, PostgreSQL). 
                J'aide les entreprises, institutions et startups à concevoir des solutions fiables, performantes et immédiatement déployables.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 font-semibold">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#0D47A1] shrink-0" />
                  <span>Architecture Mobile Flutter & Dart</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Passerelles KKiaPay / FedaPay / Stripe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Applications Web & Jeux HTML5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Systèmes Backend PostgreSQL & Supabase</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#0D47A1] hover:border-[#0D47A1] transition-all font-mono"
                >
                  GitHub @houehounarcisse
                </a>
                <a
                  href={PROFILE_INFO.comeup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#0D47A1] hover:border-[#0D47A1] transition-all font-mono"
                >
                  Profil ComeUp
                </a>
              </div>

              <button
                onClick={() => onNavigate('estimator')}
                className="text-xs font-bold uppercase tracking-wider text-[#0D47A1] hover:text-blue-900 flex items-center space-x-1 transition-colors"
              >
                <span>Calculer un devis de projet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Guarantees Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex-1 flex flex-col justify-center">
              <div className="text-xs font-mono uppercase text-[#0D47A1] mb-2 font-extrabold tracking-wider">
                ⚡ Performance & Réseau
              </div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Code Optimisé & Temps de Réponse Rapid</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Optimisation poussée des requêtes et du chargement des applications pour assurer un fonctionnement fluide même avec un réseau mobile à faible débit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex-1 flex flex-col justify-center">
              <div className="text-xs font-mono uppercase text-emerald-600 mb-2 font-extrabold tracking-wider">
                🛡️ Sécurité Fintech
              </div>
              <h4 className="text-xl font-bold text-[#0F172A] mb-2">Transactions & Webhooks Sécurisés</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mise en place de signatures HMAC, validation stricte côté serveur, chiffrement des données et respect des standards des télécoms et banques.
              </p>
            </div>
          </div>
        </div>

        {/* Section Auteur & Fondateur */}
        <AuthorBioSection />

        {/* Services Cards Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          id="services" 
          className="pt-8 mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] text-center">
            Pôles de Compétences & Services
          </h3>
          <p className="text-slate-500 text-center text-sm mt-2">
            Découvrez nos services d'ingénierie logicielle pour vos projets professionnels.
          </p>
        </motion.div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const pos = mousePos[service.id] || { x: 0, y: 0 };

            return (
              <div
                key={service.id}
                onMouseMove={(e) => handleMouseMove(e, service.id)}
                className="group relative rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                        {getServiceIcon(service.iconName, 'text-[#0D47A1]')}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0D47A1] px-3 py-1 rounded-full bg-amber-100 border border-amber-200">
                        Pôle d'Excellence
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-3 group-hover:text-[#0D47A1] transition-colors">
                      {service.title}
                    </h4>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mb-6">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono font-medium px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate('estimator')}
                      className="w-full py-3 rounded-xl bg-[#0D47A1] hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center space-x-2"
                    >
                      <span>Estimer un projet de ce pôle</span>
                      <ArrowRight className="w-4 h-4 text-[#FFCC00]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
