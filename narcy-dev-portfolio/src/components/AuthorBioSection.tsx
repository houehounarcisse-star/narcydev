import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Code, 
  Cpu, 
  Smartphone, 
  Globe, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

export const AuthorBioSection: React.FC = () => {
  const skillsBadges = [
    { name: 'Flutter', color: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100', icon: '📱' },
    { name: 'Dart', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', icon: '🎯' },
    { name: 'Python', color: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100', icon: '🐍' },
    { name: 'Supabase', color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100', icon: '⚡' },
    { name: 'Tailwind CSS', color: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100', icon: '🎨' },
    { name: 'Firestore / Firebase', color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100', icon: '🔥' },
    { name: 'Fintech (KKiaPay/FedaPay)', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100', icon: '💳' },
    { name: 'Agents IA & Robotique', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100', icon: '🤖' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: PROFILE_INFO.github,
      icon: <Github className="w-4 h-4" />,
      color: 'hover:bg-slate-900 hover:text-white hover:border-slate-900'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/houehounarcisse',
      icon: <Linkedin className="w-4 h-4" />,
      color: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]'
    },
    {
      name: 'Email Direct',
      url: `mailto:${PROFILE_INFO.email}`,
      icon: <Mail className="w-4 h-4" />,
      color: 'hover:bg-[#0D47A1] hover:text-white hover:border-[#0D47A1]'
    },
    {
      name: 'WhatsApp',
      url: PROFILE_INFO.whatsapp,
      icon: <MessageCircle className="w-4 h-4" />,
      color: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]'
    }
  ];

  return (
    <div className="mt-16 mb-20 relative" id="auteur">
      {/* Schema.org Person LD+JSON embedded specifically for the Author Bio Component */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "HOUEHOU Narcisse",
            "alternateName": "Narcy Dev",
            "jobTitle": "Développeur Full-Stack & Innovateur Tech",
            "image": "https://narcydev.com/src/assets/images/narcy_logo.jpg",
            "description": "HOUEHOU Narcisse (connu sous le nom de marque Narcy Dev) est un jeune développeur full-stack passionné par la création de solutions numériques, l'intelligence artificielle et l'ingénierie logicielle au Bénin.",
            "worksFor": {
              "@type": "Organization",
              "name": "Narcy Dev Studio"
            },
            "knowsAbout": [
              "Flutter",
              "Dart",
              "Python",
              "Supabase",
              "Tailwind CSS",
              "Fintech",
              "KKiaPay",
              "FedaPay",
              "Robotique & IA"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cotonou",
              "addressCountry": "Bénin"
            },
            "email": "mailto:houehounarcisse@gmail.com",
            "sameAs": [
              PROFILE_INFO.github,
              "https://www.linkedin.com/in/houehounarcisse",
              PROFILE_INFO.whatsapp
            ]
          })
        }}
      />

      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-slate-700/60 overflow-hidden">
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Header Row: Title, Name & Location */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Code className="w-3.5 h-3.5 text-sky-400" />
                <span>L'Auteur & Fondateur</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex flex-wrap items-center gap-2">
                <span>HOUEHOU Narcisse</span>
                <span className="text-sky-400 text-lg sm:text-2xl font-mono font-semibold">(Narcy Dev)</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#FFCC00]" />
                <span>Développeur Full-Stack & Innovateur Tech</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="inline-flex items-center space-x-1.5 text-xs text-slate-300 font-mono bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cotonou, Bénin</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-mono font-bold bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Bénin • Disponible</span>
              </div>
            </div>
          </div>

          {/* Main Bio Text */}
          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            <p className="text-slate-200 font-medium text-base sm:text-lg">
              <strong>HOUEHOU Narcisse</strong> (connu sous le nom de marque <strong>Narcy Dev</strong>) est un jeune développeur full-stack passionné par la création de solutions numériques, l'intelligence artificielle et l'ingénierie logicielle.
            </p>
            
            <p className="text-slate-300 text-xs sm:text-sm font-mono font-semibold text-sky-300">
              Ancré au Bénin, il se distingue par un profil polyvalent et autodidacte :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60">
                <div className="flex items-center space-x-2 text-sky-400 font-semibold mb-2 text-sm">
                  <Smartphone className="w-4 h-4 shrink-0" />
                  <span>Développement Web & Mobile</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Il conçoit des applications modernes et performantes en s'appuyant sur des technologies comme Flutter, Dart, Python, Tailwind CSS, ainsi que des backends comme Supabase ou Firestore.
                </p>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60">
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-2 text-sm">
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>Fintech & Solutions Locales</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Il travaille sur l'intégration de systèmes de paiement électroniques (KKiaPay, FedaPay, Stripe) et développe des projets d'applications adaptés aux réalités africaines (tels que des solutions de paiement P2P et des plateformes communautaires).
                </p>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60">
                <div className="flex items-center space-x-2 text-purple-400 font-semibold mb-2 text-sm">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>Innovation & Robotique</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  En plus du développement d'interfaces web et d'agents IA interactifs, il s'intéresse à l'assemblage de mécanismes robotiques et à l'exploitation des outils de génération IA (3D, image, voix).
                </p>
              </div>
            </div>

            <p className="text-slate-300 italic text-xs sm:text-sm pt-3 border-t border-slate-800">
              Entrepreneuriat, créativité et rigueur technique définissent sa démarche pour concevoir des projets complets et prêts pour la production.
            </p>
          </div>

          {/* Badges de Compétences */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Stack & Domaines d'Expertise</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillsBadges.map((badge) => (
                <span
                  key={badge.name}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all duration-200 cursor-default ${badge.color}`}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Boutons Réseaux Sociaux */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center space-x-2 transition-all duration-200 shadow-sm ${social.color}`}
                >
                  {social.icon}
                  <span>{social.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
