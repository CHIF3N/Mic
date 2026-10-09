import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Smartphone, QrCode } from 'lucide-react';
import { PROFILE_INFO } from '../data/links';
import { useTheme } from '../context/ThemeContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://micwrites.hub';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${PROFILE_INFO.fullName} (${PROFILE_INFO.brandName}) — Official Links`,
          text: `Connect with ${PROFILE_INFO.fullName}: Writer, Storyteller & Creative Strategist.`,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled share or not supported
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-sm rounded-2xl border shadow-2xl p-6 text-center transition-colors ${
          isLight
            ? 'bg-white border-[#B89228] text-neutral-900 shadow-xl'
            : 'bg-[#0d0d10] border-[#D4AF37]/50 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
            isLight
              ? 'text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200'
              : 'text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800'
          }`}
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className={`mx-auto w-10 h-10 rounded-full border flex items-center justify-center mb-3 ${
          isLight
            ? 'bg-[#FEF9E7] border-[#D4AF37] text-[#8C6F1E]'
            : 'bg-[#18181f] border-[#D4AF37]/40 text-[#D4AF37]'
        }`}>
          <QrCode className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-serif font-bold mb-1">
          Share Contact Hub
        </h3>
        <p className={`text-xs mb-5 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
          Scan QR code or copy the link to share Fonlon Hari Michel’s verified links.
        </p>

        {/* Crisp High-Contrast QR Code Display */}
        <div className="relative mx-auto w-48 h-48 p-3 rounded-xl bg-white border-2 border-[#D4AF37] flex items-center justify-center shadow-md mb-5">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&margin=0&color=050505`}
            alt={`QR Code for ${PROFILE_INFO.fullName} links hub`}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Link URL Box */}
        <div className={`flex items-center gap-2 p-2 rounded-lg border mb-4 text-xs ${
          isLight
            ? 'bg-neutral-50 border-neutral-200'
            : 'bg-neutral-950 border-neutral-800'
        }`}>
          <span className={`font-mono truncate text-left flex-1 pl-1 ${
            isLight ? 'text-neutral-700' : 'text-neutral-300'
          }`}>
            {currentUrl}
          </span>
          <button
            onClick={handleCopyLink}
            className={`px-2.5 py-1.5 rounded font-semibold transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
              isLight
                ? 'bg-[#9A7B1C] hover:bg-[#826615] text-white shadow-xs'
                : 'bg-[#D4AF37] hover:bg-[#E0B45C] text-black'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleNativeShare}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700/80'
            }`}
          >
            <Share2 className={`w-3.5 h-3.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
            <span>Share Sheet</span>
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Check out Fonlon Hari Michel (MicWrites) official links: ${currentUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700/80'
            }`}
          >
            <Smartphone className={`w-3.5 h-3.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
            <span>Send WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
