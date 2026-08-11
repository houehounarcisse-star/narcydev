import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Phone,
  Mail,
  User,
  Smartphone,
  Globe,
  CreditCard,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { sendMailData } from '../utils/emailService';
import narcyLogoJpg from '../assets/images/narcy_logo.jpg';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: Array<{ label: string; value: string }>;
  recommendedProject?: Project;
  quoteSummary?: {
    type: string;
    features: string[];
    priceRange: string;
    timeFrame: string;
  };
  timestamp: string;
}

interface NarcyAiChatbotProps {
  onSelectProject?: (project: Project) => void;
  onNavigateContact?: () => void;
  onShowToast?: (msg: string, type?: 'success' | 'info') => void;
}

export const NarcyAiChatbot: React.FC<NarcyAiChatbotProps> = ({
  onSelectProject,
  onNavigateContact,
  onShowToast
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Conversation state machine
  const [step, setStep] = useState<
    'GREETING' | 'NAME' | 'PROJECT_TYPE' | 'FEATURES' | 'RECOMMENDATION' | 'CONTACT_INFO' | 'SUBMITTED'
  >('GREETING');

  const [userData, setUserData] = useState<{
    name: string;
    projectType: string;
    features: string[];
    contact: string;
    priceRange: string;
    timeFrame: string;
    recommendedProject: Project | null;
  }>({
    name: '',
    projectType: '',
    features: [],
    contact: '',
    priceRange: '',
    timeFrame: '',
    recommendedProject: null
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Initial welcome message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: '1',
            sender: 'bot',
            text: "Bonjour ! 👋 Je suis **Narcy AI**, l'assistant virtuel intelligent de Narcy Dev.\n\nJe vais enregistrer votre commande / demande de devis personnalisé.\n\n👤 **Pour commencer votre enregistrement, quel est votre Nom & Prénom ?**",
            options: [
              { label: "👤 Démarrer ma Commande / Devis", value: "ASK_NAME" },
              { label: "📱 Découvrir vos Réalisations", value: "PORTFOLIO" },
              { label: "💬 Discuter avec Narcy Dev", value: "TALK" }
            ],
            timestamp: getTimestamp()
          }
        ]);
        setStep('NAME');
      }, 600);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (hasUnread) setHasUnread(false);
  };

  const addBotMessage = (
    text: string,
    options?: Array<{ label: string; value: string }>,
    recommendedProject?: Project,
    quoteSummary?: any,
    delay = 600
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text,
          options,
          recommendedProject,
          quoteSummary,
          timestamp: getTimestamp()
        }
      ]);
    }, delay);
  };

  const handleOptionClick = (option: { label: string; value: string }) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: option.label,
      timestamp: getTimestamp()
    };
    setMessages((prev) => [...prev, userMsg]);

    processStepInput(option.value, option.label);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: getTimestamp()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    processStepInput(text, text);
  };

  const processStepInput = (inputVal: string, displayLabel: string) => {
    if (step === 'GREETING' || step === 'NAME') {
      // If user clicked one of the menu option buttons before entering a real name
      if (inputVal === 'ASK_NAME' || inputVal === 'PORTFOLIO' || inputVal === 'TALK') {
        addBotMessage(
          `C'est noté ! Afin de préparer l'enregistrement officiel de votre commande / devis chez **Narcy Dev Studio**, merci de taper votre **Nom & Prénom** :`
        );
        return;
      }

      // User typed their real name
      const clientName = displayLabel.trim();
      setUserData((prev) => ({ ...prev, name: clientName }));
      setStep('PROJECT_TYPE');

      addBotMessage(
        `Enchanté **${clientName}** ! Votre dossier de commande est créé. 🚀\n\nDe quel type de solution logicielle avez-vous besoin pour votre projet ?`,
        [
          { label: '📱 App Mobile Flutter (iOS & Android)', value: 'MOBILE' },
          { label: '💳 Solution Fintech & Tontine Digitale', value: 'FINTECH' },
          { label: '🌐 Site Web Corporate & SaaS React', value: 'WEB' },
          { label: '⚙️ Progiciel de Gestion & Caisse SIG-COM', value: 'SIG' },
          { label: '🎮 Web Interactif 3D & Gaming HTML5', value: '3D' }
        ]
      );
      return;
    }

    if (step === 'PROJECT_TYPE') {
      let typeName = displayLabel;
      let recProj: Project | null = PROJECTS[0]; // GbèPay default
      let price = '350.000 FCFA – 750.000 FCFA';
      let duration = '3 à 5 semaines';

      if (inputVal === 'MOBILE' || inputVal === 'FINTECH' || displayLabel.toLowerCase().includes('fintech') || displayLabel.toLowerCase().includes('mobile') || displayLabel.toLowerCase().includes('tontine')) {
        typeName = 'Application Mobile & Fintech (KKiaPay / FedaPay)';
        recProj = PROJECTS.find((p) => p.id === 'gbepay') || PROJECTS[0];
        price = '350.000 FCFA – 750.000 FCFA';
        duration = '3 à 5 semaines';
      } else if (inputVal === 'WEB' || displayLabel.toLowerCase().includes('web') || displayLabel.toLowerCase().includes('saas') || displayLabel.toLowerCase().includes('site')) {
        typeName = 'Plateforme Web & SaaS React sur-mesure';
        recProj = PROJECTS.find((p) => p.id === 'fila-festival') || PROJECTS[1] || PROJECTS[0];
        price = '200.000 FCFA – 500.000 FCFA';
        duration = '2 à 4 semaines';
      } else if (inputVal === 'SIG' || displayLabel.toLowerCase().includes('gestion') || displayLabel.toLowerCase().includes('caisse')) {
        typeName = 'Progiciel de Gestion Commerciale SIG-COM';
        recProj = PROJECTS.find((p) => p.id === 'pierre-emeraude') || PROJECTS[2] || PROJECTS[0];
        price = '250.000 FCFA – 600.000 FCFA';
        duration = '2 à 4 semaines';
      } else if (inputVal === '3D' || displayLabel.toLowerCase().includes('3d') || displayLabel.toLowerCase().includes('game') || displayLabel.toLowerCase().includes('jeu')) {
        typeName = 'Expérience Web 3D & Gaming HTML5';
        recProj = PROJECTS.find((p) => p.id === 'volt-blackout') || PROJECTS[3] || PROJECTS[0];
        price = '300.000 FCFA – 650.000 FCFA';
        duration = '3 à 4 semaines';
      }

      setUserData((prev) => ({
        ...prev,
        projectType: typeName,
        recommendedProject: recProj,
        priceRange: price,
        timeFrame: duration
      }));

      setStep('FEATURES');

      addBotMessage(
        `Parfait **${userData.name || ''}** ! Quels sont les modules principaux que vous souhaitez intégrer dans **${typeName}** ?`,
        [
          { label: '💳 Paiement Mobile Money & QR Code', value: 'PAIEMENT' },
          { label: '🔐 Authentification & Espace Client', value: 'AUTH' },
          { label: '🗄️ Base de données Cloud & Mode Offline', value: 'OFFLINE' },
          { label: '🔔 Notifications Push & Reçus PDF', value: 'PUSH' },
          { label: '📊 Pack Complet (Toutes fonctionnalités)', value: 'ALL' }
        ]
      );
      return;
    }

    if (step === 'FEATURES') {
      const selectedFeature = displayLabel;
      const featList = userData.features.includes(selectedFeature)
        ? userData.features
        : [...userData.features, selectedFeature];

      setUserData((prev) => ({ ...prev, features: featList }));
      setStep('RECOMMENDATION');

      const recProj = userData.recommendedProject || PROJECTS[0];

      addBotMessage(
        `Merci **${userData.name || 'Cher Client'}** ! Voici l'étude de cas de notre portfolio qui correspond exactement à la vision de votre commande :`,
        [
          { label: '📩 Valider & Recevoir mon Devis', value: 'GET_QUOTE' },
          { label: '🔄 Modifier mes choix', value: 'RESTART' }
        ],
        recProj,
        {
          type: userData.projectType,
          features: featList.length > 0 ? featList : ['Paiement Mobile Money', 'Espace Client', 'Base de données Cloud'],
          priceRange: userData.priceRange || '300.000 FCFA – 650.000 FCFA',
          timeFrame: userData.timeFrame || '3 à 4 semaines'
        }
      );
      return;
    }

    if (step === 'RECOMMENDATION') {
      if (inputVal === 'RESTART') {
        setStep('PROJECT_TYPE');
        addBotMessage(
          `Pas de souci ! Quel type de projet souhaitez-vous évaluer ?`,
          [
            { label: '📱 App Mobile Flutter', value: 'MOBILE' },
            { label: '💳 Solution Fintech & Tontine', value: 'FINTECH' },
            { label: '🌐 Site Web / SaaS React', value: 'WEB' }
          ]
        );
        return;
      }

      setStep('CONTACT_INFO');
      addBotMessage(
        `Pour valider l'enregistrement de votre commande et échanger directement avec **Narcisse HOUEHOU**, veuillez entrer votre **adresse email** ou votre **numéro WhatsApp** :`
      );
      return;
    }

    if (step === 'CONTACT_INFO') {
      const contactText = displayLabel.trim();
      if (contactText.length < 5) {
        addBotMessage(`Veuillez saisir un numéro WhatsApp valide (ex: 0144680551) ou un email.`);
        return;
      }

      setUserData((prev) => ({ ...prev, contact: contactText }));
      sendQuoteEmail(contactText);
    }
  };

  const sendQuoteEmail = async (contactInfo: string) => {
    setIsSubmitting(true);

    const summaryData = {
      client_name: userData.name || 'Client Narcy Dev',
      client_contact: contactInfo,
      project_type: userData.projectType || 'Fintech & Mobile',
      features: userData.features.join(', ') || 'Paiement Mobile Money, Base Cloud, UI/UX',
      recommended_project: userData.recommendedProject?.title || 'GbèPay',
      estimated_price: userData.priceRange || '350.000 FCFA – 750.000 FCFA',
      estimated_time: userData.timeFrame || '3 à 5 semaines'
    };

    const formattedMessage = `Nouveau devis / commande généré via Chatbot Narcy AI:
------------------------------------------------
• Nom du Client : ${summaryData.client_name}
• Contact (Email/WhatsApp) : ${summaryData.client_contact}
• Type de Projet : ${summaryData.project_type}
• Fonctionnalités : ${summaryData.features}
• Projet Recommandé : ${summaryData.recommended_project}
• Estimation Tarifaire : ${summaryData.estimated_price}
• Délai d'Exécution : ${summaryData.estimated_time}
------------------------------------------------
Destinataire principal : houehounarcisse@gmail.com`;

    try {
      // Primary transmission via EmailJS API
      await sendMailData({
        nom: summaryData.client_name,
        email: contactInfo.includes('@') ? contactInfo : 'houehounarcisse@gmail.com',
        projet: summaryData.project_type,
        prix: summaryData.estimated_price,
        message: formattedMessage
      });
    } catch (e) {
      console.error('EmailJS Chatbot send error:', e);
    } finally {
      setIsSubmitting(false);
      setStep('SUBMITTED');

      if (onShowToast) {
        onShowToast(`Commande de ${summaryData.client_name} transmise à Narcy Dev !`, 'success');
      }

      addBotMessage(
        `🎉 **Commande & Devis enregistrés au nom de ${summaryData.client_name} !**\n\nUn récapitulatif structuré de votre projet (${userData.priceRange}) a été transmis directement à l'équipe technique de **Narcy Dev**.\n\nVous pouvez également démarrer un échange direct sur WhatsApp pour valider votre dossier :`,
        [
          { label: '📱 Ouvrir le Chat WhatsApp Direct', value: 'WHATSAPP' },
          { label: '🔄 Passer une autre commande', value: 'RESTART_ALL' }
        ]
      );
    }
  };

  const handleFinalAction = (val: string) => {
    if (val === 'WHATSAPP') {
      const nameStr = userData.name || 'Client';
      const projStr = userData.projectType || 'Projet Software';
      const priceStr = userData.priceRange || '';
      const textMessage = `Bonjour Narcy Dev, je m'appelle ${nameStr}. Je viens de valider une commande pour le projet "${projStr}" (${priceStr}). Pouvons-nous finaliser les détails du contrat ?`;
      window.open(`https://wa.me/2290144680551?text=${encodeURIComponent(textMessage)}`, '_blank');
    } else if (val === 'RESTART_ALL') {
      setStep('NAME');
      setMessages([]);
      setUserData({
        name: '',
        projectType: '',
        features: [],
        contact: '',
        priceRange: '',
        timeFrame: '',
        recommendedProject: null
      });
    }
  };

  return (
    <>
      {/* Floating Yellow Toggle Button with NARCY DEV Logo */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2">
        {/* Unread Pulsing Tooltip Pill */}
        {!isOpen && hasUnread && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold border border-slate-700 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-ping" />
            <span>Besoin d'un Devis ? Discutez avec Narcy AI</span>
          </motion.div>
        )}

        <button
          onClick={toggleChat}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0D47A1] text-white p-1 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 border-2 border-[#FFCC00] cursor-pointer group transition-all duration-300"
          aria-label="Assistant virtuel Narcy AI"
          id="narcy-ai-chatbot-toggle"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white p-1 flex items-center justify-center">
              <img
                src={narcyLogoJpg}
                alt="Narcy AI Logo"
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[560px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans"
            id="narcy-ai-chatbot-drawer"
          >
            {/* Header in Corporate Blue with Official Logo */}
            <div className="bg-gradient-to-r from-[#0D47A1] via-[#0D47A1] to-[#012d6a] text-white p-4 flex items-center justify-between border-b border-blue-900 shadow-md shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white p-1 shadow-md border border-white/20 overflow-hidden flex items-center justify-center">
                    <img
                      src={narcyLogoJpg}
                      alt="Logo Narcy Dev Studio"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0D47A1] rounded-full" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white flex items-center space-x-1.5">
                    <span>Narcy AI</span>
                    <span className="text-[10px] font-mono font-bold bg-[#FFCC00] text-slate-950 px-1.5 py-0.2 rounded-full uppercase">
                      Studio
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-200 font-mono flex items-center space-x-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    <span>Assistant Devis & Projets • En Ligne</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setStep('NAME');
                    setMessages([]);
                    setUserData({
                      name: '',
                      projectType: '',
                      features: [],
                      contact: '',
                      priceRange: '',
                      timeFrame: '',
                      recommendedProject: null
                    });
                  }}
                  className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-800/60 transition-colors cursor-pointer"
                  title="Recommencer la discussion"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-800/60 transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/70">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2.5 max-w-[90%] ${
                      msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <div className="w-8 h-8 rounded-xl bg-white border border-blue-200 p-0.5 shrink-0 mt-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                        <img
                          src={narcyLogoJpg}
                          alt="Bot Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0D47A1] to-[#012d6a] p-1 text-white shrink-0 mt-0.5 shadow-sm flex items-center justify-center border border-white/30">
                        <User className="w-4 h-4 text-[#FFCC00]" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#0D47A1] via-[#0D47A1] to-[#012d6a] text-white rounded-tr-none border-l-2 border-[#FFCC00]'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line font-medium">
                        {msg.text.split('**').map((part, i) =>
                          i % 2 === 1 ? (
                            <strong
                              key={i}
                              className={msg.sender === 'user' ? 'font-bold text-[#FFCC00]' : 'font-bold text-[#0D47A1]'}
                            >
                              {part}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </div>

                      {/* Recommended Project Miniature Card inside Chat */}
                      {msg.recommendedProject && (
                        <div className="mt-3 p-3 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-md space-y-2.5">
                          <div className="relative h-28 w-full overflow-hidden rounded-xl bg-black">
                            <img
                              src={msg.recommendedProject.image}
                              alt={msg.recommendedProject.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0D47A1] text-white">
                              {msg.recommendedProject.categoryLabel}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-xs text-white">
                              {msg.recommendedProject.title}
                            </h4>
                            <p className="text-[11px] text-slate-300 truncate">
                              {msg.recommendedProject.subtitle}
                            </p>
                          </div>
                          {onSelectProject && (
                            <button
                              onClick={() => {
                                onSelectProject(msg.recommendedProject!);
                                toggleChat();
                              }}
                              className="w-full py-2 rounded-xl bg-[#FFCC00] hover:bg-yellow-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer transition-colors"
                            >
                              <span>Voir le Projet Détaillé</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Quote Estimation Summary Card */}
                      {msg.quoteSummary && (
                        <div className="mt-3 p-3 rounded-xl bg-blue-50/90 border border-blue-200 space-y-1.5 text-slate-800">
                          <div className="flex items-center justify-between text-xs font-bold text-[#0D47A1]">
                            <span>Estimation Tarifaire</span>
                            <span className="font-mono bg-[#0D47A1] text-[#FFCC00] px-2 py-0.5 rounded text-[10px] font-bold">
                              {msg.quoteSummary.priceRange}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            <strong>Délai d'exécution :</strong> {msg.quoteSummary.timeFrame}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Options Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-2.5 ml-10 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.options.map((opt, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            if (msg.text.includes('enregistrés au nom de') || msg.text.includes('transmise à Narcy Dev')) {
                              handleFinalAction(opt.value);
                            } else {
                              handleOptionClick(opt);
                            }
                          }}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#0D47A1] text-[#0D47A1] hover:text-[#FFCC00] border border-blue-200 text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center space-x-1.5 active:scale-95"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center space-x-2 text-slate-400 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-white border border-blue-200 p-0.5 shrink-0 shadow-sm overflow-hidden flex items-center justify-center">
                    <img
                      src={narcyLogoJpg}
                      alt="Typing..."
                      className="w-full h-full object-contain animate-pulse"
                    />
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-[#0D47A1] rounded-full animate-ping"></span>
                    <span className="w-2 h-2 bg-[#0D47A1] rounded-full animate-ping delay-100"></span>
                    <span className="w-2 h-2 bg-[#0D47A1] rounded-full animate-ping delay-200"></span>
                    <span className="text-slate-600 font-mono text-xs pl-1">Narcy AI analyse votre demande...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-1.5">
              {/* Dynamic Helper Pill depending on step */}
              {step === 'NAME' && (
                <div className="flex items-center space-x-1.5 text-[10px] text-[#0D47A1] bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1 font-mono font-semibold">
                  <User className="w-3 h-3 text-[#0D47A1]" />
                  <span>Entrez votre Nom & Prénom pour la commande :</span>
                </div>
              )}
              {step === 'CONTACT_INFO' && (
                <div className="flex items-center space-x-1.5 text-[10px] text-[#0D47A1] bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1 font-mono font-semibold">
                  <Phone className="w-3 h-3 text-[#0D47A1]" />
                  <span>Saisissez votre WhatsApp ou E-mail pour valider :</span>
                </div>
              )}

              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2 relative"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      step === 'NAME'
                        ? "Ex: Narcisse HOUEHOU..."
                        : step === 'CONTACT_INFO'
                        ? "Ex: WhatsApp 0144680551 ou email..."
                        : "Tapez votre message ici..."
                    }
                    disabled={isSubmitting}
                    className="w-full bg-slate-100 border border-slate-200 rounded-2xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:bg-white transition-all shadow-inner"
                    id="narcy-ai-chat-input"
                  />
                  <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  type="submit"
                  disabled={!inputValue.trim() || isSubmitting}
                  className="p-3 rounded-2xl bg-gradient-to-r from-[#0D47A1] via-[#0D47A1] to-[#012d6a] hover:from-[#0D47A1] hover:to-[#0D47A1] disabled:opacity-40 text-[#FFCC00] font-bold border border-[#FFCC00]/40 transition-all cursor-pointer shadow-md flex items-center justify-center shrink-0"
                  aria-label="Envoyer"
                  id="narcy-ai-chat-send-btn"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4.5 h-4.5 animate-spin text-[#FFCC00]" />
                  ) : (
                    <motion.div
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Send className="w-4.5 h-4.5" />
                    </motion.div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
