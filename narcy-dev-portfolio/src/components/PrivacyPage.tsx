import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Eye, Database, FileText, UserCheck, Server } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { NarcyDevLogo } from './NarcyDevLogo';

interface PrivacyPageProps {
  type: 'gbepay' | 'general';
  onBackToHome: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ type, onBackToHome }) => {
  const isGbepay = type === 'gbepay';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 selection:bg-[#FFCC00] selection:text-black">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="cursor-pointer" onClick={onBackToHome}>
            <NarcyDevLogo size="md" showSubtitle={true} />
          </div>

          {/* Back to Home CTA */}
          <button
            onClick={onBackToHome}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center space-x-2 border border-slate-200 shadow-sm"
            id="privacy-back-home-btn"
          >
            <ArrowLeft className="w-4 h-4 text-[#0D47A1]" />
            <span>Retour à l'accueil</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Document Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#0D47A1]" />
            <span>{isGbepay ? 'Politique de Confidentialité App Mobile' : 'Mentions Légales & Confidentialité'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isGbepay
              ? 'Politique de Confidentialité — GbèPay'
              : 'Mentions Légales & Politique de Confidentialité — NarcyDev'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isGbepay
              ? 'Transparence, sécurité financière et protection des données personnelles pour les utilisateurs de l’application mobile et web GbèPay (Tontine Digitale & Paiement).'
              : 'Informations réglementaires, conditions d’utilisation et engagements de protection des données personnelles du studio d’ingénierie logicielle NarcyDev.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 border-t border-slate-100">
            <span><strong>Dernière mise à jour :</strong> 11 Août 2026</span>
            <span>•</span>
            <span><strong>Éditeur :</strong> {PROFILE_INFO.name} ({PROFILE_INFO.brandName})</span>
            <span>•</span>
            <span><strong>Contact :</strong> {PROFILE_INFO.email}</span>
          </div>
        </div>

        {/* Structured Sections */}
        <div className="space-y-8">
          {/* Section 1: Collecte des Données */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-[#0D47A1]">
              <Database className="w-6 h-6" />
              <h2 className="text-xl font-bold text-slate-900">1. Collecte des Données Personnelles</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                Dans le cadre de l’utilisation de nos services {isGbepay ? 'GbèPay' : 'NarcyDev'}, nous collectons uniquement les données strictement nécessaires au bon fonctionnement des applications et de la relation client :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Données d'identification :</strong> Nom, prénom, numéro de téléphone mobile (utilisé pour les transactions Mobile Money), adresse email et photo de profil éventuelle.
                </li>
                <li>
                  <strong>Données financières & de transaction :</strong> Historique des cotisations tontinières, montants transférés, horodatage et identifiants uniques de transaction (IDs KKiaPay / FedaPay). <em>Aucune donnée bancaire sensible ni code PIN secret n’est stocké sur nos serveurs.</em>
                </li>
                <li>
                  <strong>Données techniques & de connexion :</strong> Adresse IP, type d’appareil (Android / iOS / Navigateur Web), jetons de notification push (FCM) et journaux d’audit sécurisés.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Utilisation des Informations */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-[#0D47A1]">
              <Eye className="w-6 h-6" />
              <h2 className="text-xl font-bold text-slate-900">2. Utilisation des Informations</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
              <p>Vos informations sont traitées de manière confidentielle aux fins exclusives suivantes :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Exécution et automatisation des cycles de tontine digitale, tirages au sort et versement des pots tontiniers.
                </li>
                <li>
                  Traitement et vérification instantanée des paiements et dépôts Mobile Money via les passerelles partenaires.
                </li>
                <li>
                  Envoi des notifications push et reçus de transaction au format PDF.
                </li>
                <li>
                  Lutte contre la fraude, le blanchiment de capitaux et respect des obligations réglementaires financières en vigueur au Bénin et dans la zone UEMOA.
                </li>
                <li>
                  Support client et amélioration continue des performances de l’application.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Intégration des Services Tiers */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-[#0D47A1]">
              <Server className="w-6 h-6" />
              <h2 className="text-xl font-bold text-slate-900">3. Intégration des Services Tiers</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                {isGbepay ? 'GbèPay' : 'Le studio NarcyDev'} intègre des infrastructures partenaires reconnues pour garantir un niveau de sécurité maximal :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">KKiaPay & FedaPay</h4>
                  <p className="text-xs text-slate-500">Passerelles de paiement Mobile Money (MTN, Moov) et Cartes. Transactions chiffrées de bout en bout via TLS 1.3.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Supabase & PostgreSQL</h4>
                  <p className="text-xs text-slate-500">Base de données cloud sécurisée avec politiques RLS (Row Level Security) et chiffrement des données au repos.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Services Push FCM</h4>
                  <p className="text-xs text-slate-500">Envoi de notifications en temps réel lors du rechargement de compte ou de la clôture d’une tontine.</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic pt-2">
                Aucune donnée personnelle n’est vendue, louée ou cédée à des tiers à des fins commerciales ou publicitaires.
              </p>
            </div>
          </section>

          {/* Section 4: Droits des Utilisateurs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-[#0D47A1]">
              <UserCheck className="w-6 h-6" />
              <h2 className="text-xl font-bold text-slate-900">4. Droits des Utilisateurs</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                Conformément à la législation relative à la protection des données à caractère personnel, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Droit d'accès & de rectification :</strong> Vous pouvez consulter et mettre à jour vos informations directement depuis votre profil.</li>
                <li><strong>Droit à l'effacement (Droit à l'oubli) :</strong> Vous pouvez demander la suppression complète de votre compte et de vos données personnelles associées.</li>
                <li><strong>Droit d’opposition & de portabilité :</strong> Vous pouvez demander l’exportation de vos transactions au format CSV/JSON.</li>
              </ul>
              <p className="pt-2 text-sm font-semibold text-slate-800">
                Pour exercer vos droits, contactez notre Délégué à la Protection des Données :{' '}
                <a href={`mailto:${PROFILE_INFO.email}`} className="text-[#0D47A1] underline hover:text-blue-800">
                  {PROFILE_INFO.email}
                </a>
              </p>
            </div>
          </section>

          {/* Section 5: Sécurité & Mentions Éditeur */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-[#0D47A1]">
              <Lock className="w-6 h-6" />
              <h2 className="text-xl font-bold text-slate-900">5. Sécurité des Données & Mentions Légales</h2>
            </div>
            <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                Nous appliquons les meilleures pratiques d’ingénierie logicielle : chiffrement AES-256, protocoles SSL/TLS stricts, tests d’intrusion réguliers et surveillance proactive des accès.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p><strong>Raison Sociale / Studio :</strong> NarcyDev Software & Mobile Studio</p>
                <p><strong>Fondateur & Lead Engineer :</strong> {PROFILE_INFO.name}</p>
                <p><strong>Siège / Localisation :</strong> {PROFILE_INFO.location}</p>
                <p><strong>Hébergement des Services :</strong> Cloud Run / Google Cloud Platform (EU / Global infrastructure)</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center pt-8 border-t border-slate-200">
          <button
            onClick={onBackToHome}
            className="px-8 py-3.5 rounded-xl bg-[#0D47A1] hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center space-x-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFCC00]" />
            <span>Retour au site principal NarcyDev</span>
          </button>
        </div>
      </main>
    </div>
  );
};
