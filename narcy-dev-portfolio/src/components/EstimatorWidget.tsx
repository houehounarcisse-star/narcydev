import React, { useState, useMemo } from 'react';
import { sendMailData } from '../utils/emailService';
import {
  ESTIMATOR_TYPES_EXACT,
  ESTIMATOR_OPTIONS_EXACT
} from '../data/portfolioData';
import {
  Calculator,
  Smartphone,
  Globe,
  CreditCard,
  Gamepad2,
  Server,
  LayoutDashboard,
  Sparkles,
  Zap,
  Check,
  Clock,
  Send,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

interface EstimatorWidgetProps {
  onPreFillContact: (specSummary: string) => void;
}

export const EstimatorWidget: React.FC<EstimatorWidgetProps> = ({
  onPreFillContact
}) => {
  // 1. Selection states
  const [selectedTypeId, setSelectedTypeId] = useState<string>('mobile-fintech');
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([
    'momo-api',
    'admin-panel'
  ]);
  const [isExpress, setIsExpress] = useState<boolean>(false);

  // Icons helper
  const getTypeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      default: return <Calculator className="w-5 h-5" />;
    }
  };

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-4 h-4 text-blue-600" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-amber-500" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-4 h-4 text-purple-600" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#0D47A1]" />;
      default: return <Zap className="w-4 h-4 text-amber-500" />;
    }
  };

  // Toggle option checkbox
  const toggleOption = (optionId: string) => {
    setSelectedOptionIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  // Current selected project type object
  const currentType = useMemo(() => {
    return (
      ESTIMATOR_TYPES_EXACT.find((t) => t.id === selectedTypeId) ||
      ESTIMATOR_TYPES_EXACT[0]
    );
  }, [selectedTypeId]);

  // Dynamic Calculation Algorithm
  const { subtotalFcfa, totalFcfa, totalDays, isExpressActive } = useMemo(() => {
    let price = currentType.baseFcfa;
    let days = currentType.baseDays;

    selectedOptionIds.forEach((optId) => {
      const opt = ESTIMATOR_OPTIONS_EXACT.find((o) => o.id === optId);
      if (opt) {
        price += opt.priceFcfa;
        days += opt.days;
      }
    });

    const subtotal = price;

    if (isExpress) {
      price = Math.round(price * 1.3); // +30% surcharge
      days = Math.max(2, Math.round(days * 0.6)); // 40% time reduction (min 2 days)
    }

    return {
      subtotalFcfa: subtotal,
      totalFcfa: price,
      totalDays: days,
      isExpressActive: isExpress
    };
  }, [currentType, selectedOptionIds, isExpress]);

  // Formatted string
  const formattedPrice = useMemo(() => {
    return `${totalFcfa.toLocaleString('fr-FR')} FCFA`;
  }, [totalFcfa]);

  // Generate pre-filled WhatsApp link
  const whatsappUrl = useMemo(() => {
    const selectedOptionsList = selectedOptionIds
      .map((id) => ESTIMATOR_OPTIONS_EXACT.find((o) => o.id === id)?.name)
      .filter(Boolean);

    if (isExpress) {
      selectedOptionsList.push('Livrable Express (+30%)');
    }

    const optionsStr =
      selectedOptionsList.length > 0
        ? selectedOptionsList.join('\n- ')
        : 'Aucune option';

    const text = `Bonjour Narcy Dev 👋,\n\nJe souhaite commander le projet suivant via l'estimateur de devis :\n\n📌 *Type de projet* : ${currentType.name}\n\n⚙️ *Options sélectionnées* :\n- ${optionsStr}\n\n💰 *Budget Estimé* : *${formattedPrice}*\n⏱️ *Délai Estimé* : ~${totalDays} jours ouvrés\n\nPouvons-nous échanger sur les détails de mise en œuvre ?`;

    return `https://wa.me/22944680551?text=${encodeURIComponent(text)}`;
  }, [currentType, selectedOptionIds, isExpress, formattedPrice, totalDays]);

  // Handle Form pre-fill
  const handlePreFillForm = () => {
    const selectedOptionsList = selectedOptionIds
      .map((id) => ESTIMATOR_OPTIONS_EXACT.find((o) => o.id === id)?.name)
      .filter(Boolean);

    if (isExpress) {
      selectedOptionsList.push('Livrable Express (+30%)');
    }

    const optionsText =
      selectedOptionsList.length > 0
        ? selectedOptionsList.join(', ')
        : 'Aucune option';

    const text = `Bonjour Narcy Dev, j'ai calculé mon devis en ligne:\n- Type de projet: ${currentType.name}\n- Options: ${optionsText}\n- Estimation: ${formattedPrice} (Délai: ~${totalDays} jours)\nJe souhaite passer commande.`;

    sendMailData({
      nom: 'Simulation Estimateur Web',
      email: 'houehounarcisse@gmail.com',
      projet: currentType.name,
      prix: formattedPrice,
      message: text
    }).catch((err) => console.error('EmailJS Estimator send error:', err));

    onPreFillContact(text);
  };

  return (
    <section
      id="estimator"
      className="py-16 sm:py-24 relative overflow-hidden bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#0D47A1] text-xs font-mono font-extrabold uppercase tracking-widest mb-4">
            <Calculator className="w-4 h-4 text-[#0D47A1]" />
            <span>ESTIMATEUR DE PROJET & DEVIS EN TEMPS RÉEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Calculateur de Devis <span className="text-[#0D47A1]">Dynamique</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Sélectionnez votre type de projet et vos options complémentaires pour évaluer instantanément votre budget en FCFA et votre délai de livraison.
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls & Options */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* STEP 1: TYPE DE PROJET (Radio / Button Selection) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-mono uppercase tracking-widest text-[#0D47A1] font-extrabold block">
                  1. Sélection du Type de Projet
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  Obligatoire
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ESTIMATOR_TYPES_EXACT.map((type) => {
                  const isSelected = selectedTypeId === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedTypeId(type.id)}
                      className={`p-4 rounded-2xl text-left border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 border-[#0D47A1] shadow-md ring-1 ring-[#0D47A1]/20'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                      }`}
                      id={`type-btn-${type.id}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`p-2.5 rounded-xl ${
                            isSelected
                              ? 'bg-[#0D47A1] text-white shadow-md'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {getTypeIcon(type.icon)}
                        </div>
                        <span className="text-xs font-mono font-extrabold text-[#0D47A1] bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                          {type.baseFcfa.toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-[#0F172A] mb-1">
                          {type.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {type.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: OPTIONS COMPLÉMENTAIRES (Checkboxes) */}
            <div className="pt-4 border-t border-slate-200">
              <label className="text-xs font-mono uppercase tracking-widest text-[#0D47A1] font-extrabold block mb-4">
                2. Options Complémentaires
              </label>

              <div className="space-y-3">
                {ESTIMATOR_OPTIONS_EXACT.map((opt) => {
                  const isChecked = selectedOptionIds.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      className={`p-3.5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-blue-50/60 border-[#0D47A1] shadow-2xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#0D47A1] border-[#0D47A1] text-white'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="p-2 rounded-lg bg-white border border-slate-200 hidden sm:block">
                          {getOptionIcon(opt.iconName)}
                        </div>

                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#0F172A]">
                            {opt.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {opt.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-right pl-3">
                        <span className="text-xs font-mono font-extrabold text-[#0D47A1]">
                          +{opt.priceFcfa.toLocaleString('fr-FR')} FCFA
                        </span>
                        <span className="block text-[10px] text-slate-400 font-mono">
                          +{opt.days} j
                        </span>
                      </div>
                    </label>
                  );
                })}

                {/* EXPRESS DELIVERY TOGGLE */}
                <label
                  onClick={() => setIsExpress(!isExpress)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isExpress
                      ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-400/30'
                      : 'bg-amber-50/50 border-amber-200 hover:bg-amber-100/60'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isExpress
                          ? 'bg-amber-500 border-amber-500 text-black'
                          : 'bg-white border-amber-300'
                      }`}
                    >
                      {isExpress && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-400 text-black shadow-sm">
                      <Zap className="w-4 h-4 fill-black" />
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-black text-slate-900 flex items-center space-x-2">
                        <span>Livrable Express / Urgence</span>
                        <span className="bg-amber-400 text-black text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Prioritaire
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Accélération du délai de livraison (-40% de temps de développement)
                      </div>
                    </div>
                  </div>

                  <div className="text-right pl-3">
                    <span className="text-xs font-mono font-extrabold text-amber-700">
                      +30% total
                    </span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Real-Time Quote Display & Action Buttons */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden lg:sticky lg:top-24">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFCC00]">
                  RÉSUMÉ DU DEVIS
                </span>
                <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-1 rounded-full uppercase font-bold">
                  En direct
                </span>
              </div>

              {/* Selected Project Summary */}
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Projet Sélectionné :
                </span>
                <h3 className="text-lg font-black text-white">
                  {currentType.name}
                </h3>
              </div>

              {/* Price & Timeline Display Box */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Prix Estimé (FCFA) :
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#FFCC00] tracking-tight">
                    {formattedPrice}
                  </div>
                  {isExpressActive && (
                    <div className="text-[11px] font-mono text-amber-400 mt-1 flex items-center space-x-1">
                      <Zap className="w-3 h-3 fill-amber-400" />
                      <span>Surcharge express +30% incluse</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-slate-300 text-xs">
                    <Clock className="w-4 h-4 text-[#FFCC00]" />
                    <span>Délai d'Exécution Estimé :</span>
                  </div>
                  <span className="text-sm font-mono font-extrabold text-white">
                    ~{totalDays} jours ouvrés
                  </span>
                </div>
              </div>

              {/* Selected Features Breakdown List */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Détail de la sélection ({selectedOptionIds.length} option{selectedOptionIds.length > 1 ? 's' : ''}) :
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
                    <span>Base : {currentType.name}</span>
                  </li>
                  {selectedOptionIds.map((optId) => {
                    const opt = ESTIMATOR_OPTIONS_EXACT.find((o) => o.id === optId);
                    if (!opt) return null;
                    return (
                      <li key={optId} className="flex items-center space-x-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{opt.name}</span>
                      </li>
                    );
                  })}
                  {isExpressActive && (
                    <li className="flex items-center space-x-2 text-amber-400 font-bold">
                      <Zap className="w-3.5 h-3.5 fill-amber-400 shrink-0" />
                      <span>Livraison Prioritaire Express</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 pt-2">
                {/* Yellow WhatsApp Button (MTN Style) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-[#FFCC00] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all border border-amber-300 flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02]"
                  id="btn-whatsapp-quote"
                >
                  <MessageCircle className="w-5 h-5 text-black fill-black" />
                  <span>Commander ce projet sur WhatsApp</span>
                </a>

                {/* Secondary Button for Form */}
                <button
                  type="button"
                  onClick={handlePreFillForm}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs uppercase tracking-wider border border-slate-700 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  id="btn-prefill-contact"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>Pré-remplir le formulaire de contact</span>
                </button>
              </div>

              <div className="text-center">
                <span className="text-[10px] text-slate-500 italic">
                  * Devis indicatif calculé instantanément. Facture normalisée (SFE) disponible sur demande.
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
