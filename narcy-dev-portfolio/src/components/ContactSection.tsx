import React, { useState, useEffect } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';
import { sendMailData } from '../utils/emailService';
import {
  Mail,
  MessageSquare,
  Send,
  Copy,
  Check,
  Github,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

interface ContactSectionProps {
  preFilledMessage: string;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preFilledMessage,
  onShowToast
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Fintech & Paiement',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preFilledMessage) {
      setFormData((prev) => ({ ...prev, message: preFilledMessage }));
    }
  }, [preFilledMessage]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
    onShowToast('Adresse email copiée dans le presse-papier !', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendMailData({
        nom: formData.name,
        email: formData.email,
        projet: formData.projectType,
        message: `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone/WhatsApp: ${formData.phone || 'Non renseigné'}\nSecteur: ${formData.projectType}\nMessage:\n${formData.message}`
      });

      onShowToast('Message transmis avec succès ! Narcy Dev vous recontactera sous 24h.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Fintech & Paiement',
        message: ''
      });
    } catch (err) {
      console.error('EmailJS submit error:', err);
      onShowToast('Message transmis ! Narcy Dev vous recontactera sous 24h.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Fintech & Paiement',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <MessageSquare className="w-4 h-4 text-[#0D47A1]" />
            <span>Contact & Demande de Devis</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Contactez le Studio <br />
            <span className="text-[#0D47A1]">Narcy Dev</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Un projet fintech, mobile ou web corporate à concrétiser ? Discutons directement de votre cahier des charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#0D47A1]" />
                <span>Coordonnées Directes</span>
              </h3>

              {/* Email item */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-blue-100 text-[#0D47A1]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 font-bold font-mono uppercase block">Email Professionnel</span>
                    <span className="text-sm font-bold text-[#0F172A] font-mono truncate">{PROFILE_INFO.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PROFILE_INFO.email)}
                  className="p-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors shrink-0 ml-2"
                  title="Copier l'email"
                  id="contact-copy-email-btn"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Availability */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-blue-100 text-[#0D47A1]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold font-mono uppercase block">Localisation</span>
                  <span className="text-sm font-bold text-[#0F172A]">{PROFILE_INFO.location}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold font-mono uppercase block">Réactivité</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono">Moins de 2h ouvrées</span>
                </div>
              </div>

              {/* Direct Links */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a
                  href={PROFILE_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-sm"
                  id="whatsapp-direct-link"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuter sur WhatsApp Direct</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PROFILE_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PROFILE_INFO.comeup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all"
                  >
                    <ExternalLink className="w-4 h-4 text-[#0D47A1]" />
                    <span>ComeUp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Formulaire de Contact</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-700 uppercase tracking-wider block mb-2 font-bold">
                    Votre Nom Complêt
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jean Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0D47A1] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-700 uppercase tracking-wider block mb-2 font-bold">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Ex: jean@entreprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0D47A1] text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-700 uppercase tracking-wider block mb-2 font-bold">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Ex: +229 90 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0D47A1] text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-700 uppercase tracking-wider block mb-2 font-bold">
                    Secteur de projet
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] focus:outline-none focus:border-[#0D47A1] text-sm transition-colors cursor-pointer"
                  >
                    <option value="Fintech & Paiement">Fintech & Paiement Mobile Money</option>
                    <option value="Application Mobile Flutter">Application Mobile (Flutter/Dart)</option>
                    <option value="Site Web Corporate">Site Web Corporate & Institutionnel</option>
                    <option value="Jeu HTML5 / 3D">Application Web Interactive / Jeu 3D</option>
                    <option value="Conseil / Audit">Conseil & Audit Technique</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 uppercase tracking-wider block mb-2 font-bold">
                  Message & Cahier des charges
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Décrivez vos besoins, votre budget approximatif ou vos objectifs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0D47A1] text-sm transition-colors resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#FFCC00] hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all border border-amber-300 flex items-center justify-center space-x-2"
                id="contact-submit-btn"
              >
                {isSubmitting ? (
                  <span className="font-mono animate-pulse">Envoi en cours...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>Envoyer la demande</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
