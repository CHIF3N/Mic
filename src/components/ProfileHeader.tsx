import React from 'react';
import { Share2, UserCheck, Phone, Check, Copy } from 'lucide-react';
import { PROFILE_INFO } from '../data/links';
import { QuillIcon, WhatsAppIcon } from './Icons';
import { downloadVCard } from '../utils/vcard';
import { useTheme } from '../context/ThemeContext';

interface ProfileHeaderProps {
  onOpenShare: () => void;
  onOpenDossier: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onOpenShare, onOpenDossier }) => {
  const { theme } = useTheme();
  const [downloaded, setDownloaded] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  const isLight = theme === 'light';

  const handleDownload = () => {
    downloadVCard();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <header className="relative w-full text-center pt-8 pb-6 px-4">
      {/* Decorative ambient gold radial light */}
      <div 
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 blur-[100px] rounded-full transition-opacity ${
          isLight ? 'bg-[#D4AF37]/20 opacity-80' : 'bg-[#D4AF37]/10 opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* Luxury Monogram Avatar Emblem */}
      <div className="relative mx-auto w-24 h-24 mb-5 group">
        <div 
          className={`absolute -inset-1 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFF1CA] to-[#8C6F1E] blur-sm transition-opacity duration-300 ${
            isLight ? 'opacity-80 group-hover:opacity-100' : 'opacity-70 group-hover:opacity-95'
          }`} 
          aria-hidden="true"
        />
        <div 
          className={`relative w-full h-full rounded-full border flex flex-col items-center justify-center shadow-xl p-2 overflow-hidden transition-colors ${
            isLight 
              ? 'bg-white border-[#B89228] shadow-amber-900/10' 
              : 'bg-[#0a0a0a] border-[#D4AF37]/80'
          }`}
        >
          {/* Subtle interior gold concentric ring */}
          <div 
            className={`absolute inset-1 rounded-full border pointer-events-none ${
              isLight ? 'border-[#D4AF37]/40' : 'border-[#D4AF37]/30'
            }`} 
          />
          
          <QuillIcon className={`w-5 h-5 mb-0.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
          <span className={`font-serif text-lg font-bold tracking-wider ${isLight ? 'text-black' : 'text-white'}`}>
            FHM
          </span>
          <span className={`text-[9px] tracking-widest uppercase font-semibold -mt-0.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]/90'}`}>
            MIC
          </span>
        </div>
      </div>

      {/* Main Identity */}
      <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 font-serif transition-colors ${
        isLight ? 'text-[#09090B]' : 'text-white'
      }`}>
        {PROFILE_INFO.fullName}
      </h1>

      {/* Brand & Creative Alias */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className={`text-xs uppercase tracking-widest font-semibold font-mono ${
          isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'
        }`}>
          {PROFILE_INFO.brandName}
        </span>
        <span className={`text-xs ${isLight ? 'text-neutral-400' : 'text-neutral-600'}`} aria-hidden="true">·</span>
        <span className={`text-xs tracking-wide ${isLight ? 'text-neutral-600 font-medium' : 'text-neutral-300'}`}>
          Official Links & Portfolio
        </span>
      </div>

      {/* Zero-Pill Clean Unboxed Metadata */}
      <div className={`flex flex-wrap items-center justify-center gap-2 text-xs mb-4 max-w-lg mx-auto ${
        isLight ? 'text-neutral-700' : 'text-neutral-400'
      }`}>
        <span>Writer & Storyteller</span>
        <span className={isLight ? 'text-neutral-400' : 'text-neutral-600'} aria-hidden="true">·</span>
        <span>Spoken Word & Content</span>
        <span className={isLight ? 'text-neutral-400' : 'text-neutral-600'} aria-hidden="true">·</span>
        <span>Cameroon (Central Africa)</span>
      </div>

      {/* Brief straight to the point bio */}
      <p className={`text-sm max-w-md mx-auto leading-relaxed mb-6 font-normal ${
        isLight ? 'text-neutral-800' : 'text-neutral-300'
      }`}>
        {PROFILE_INFO.bio}
      </p>

      {/* Quick Direct Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
        {/* WhatsApp Direct */}
        <a
          href={PROFILE_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-sm whitespace-nowrap active:scale-95 cursor-pointer ${
            isLight
              ? 'bg-[#9A7B1C] hover:bg-[#826615] text-white shadow-amber-900/10'
              : 'text-black bg-[#D4AF37] hover:bg-[#E0B45C]'
          }`}
          title="Direct WhatsApp Message"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Message WhatsApp</span>
        </a>

        {/* Direct Call */}
        <a
          href={`tel:${PROFILE_INFO.phone}`}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap active:scale-95 cursor-pointer border ${
            isLight
              ? 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-300 hover:border-[#8C6F1E] shadow-xs'
              : 'text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-700/80 hover:border-[#D4AF37]/60'
          }`}
          title="Direct Phone Call"
        >
          <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
          <span>Call Direct</span>
        </a>

        {/* Save vCard Contact */}
        <button
          onClick={handleDownload}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap active:scale-95 cursor-pointer border ${
            isLight
              ? 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-300 hover:border-[#8C6F1E] shadow-xs'
              : 'text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800 border-neutral-800 hover:border-[#D4AF37]/50'
          }`}
          title="Save Contact to Phone Book"
        >
          {downloaded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Card Saved</span>
            </>
          ) : (
            <>
              <UserCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
              <span>Save Contact</span>
            </>
          )}
        </button>

        {/* Share Hub */}
        <button
          onClick={onOpenShare}
          className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap active:scale-95 cursor-pointer border ${
            isLight
              ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300 hover:border-neutral-400 shadow-xs'
              : 'text-neutral-300 hover:text-white bg-neutral-950 hover:bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          }`}
          title="Share Link Hub & QR Code"
        >
          <Share2 className={`w-3.5 h-3.5 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`} />
          <span>Share</span>
        </button>
      </div>

      {/* Quick Phone Copy Bar */}
      <div className={`mt-3 flex items-center justify-center gap-2 text-xs ${
        isLight ? 'text-neutral-600' : 'text-neutral-400'
      }`}>
        <span className={`font-mono font-medium ${isLight ? 'text-neutral-900' : 'text-neutral-300'}`}>
          {PROFILE_INFO.formattedPhone}
        </span>
        <button 
          onClick={handleCopyPhone}
          className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer ${
            isLight ? 'text-[#8C6F1E] hover:text-[#6B4E0B]' : 'text-[#D4AF37] hover:text-[#FFF1CA]'
          }`}
        >
          {copiedPhone ? (
            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
