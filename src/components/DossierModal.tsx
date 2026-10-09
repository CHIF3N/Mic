import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Copy, Check, FileText, CheckCircle2 } from 'lucide-react';
import { PROFILE_INFO } from '../data/links';
import { useTheme } from '../context/ThemeContext';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';

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

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE_INFO.profileDocUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg rounded-2xl border shadow-2xl p-6 transition-colors ${
          isLight
            ? 'bg-white border-[#B89228] text-neutral-900 shadow-xl'
            : 'bg-[#0c0c0f] border-[#D4AF37]/60 text-white'
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

        {/* Modal Icon & Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
            isLight
              ? 'bg-[#FEF9E7] border-[#D4AF37] text-[#8C6F1E]'
              : 'bg-[#16161c] border-[#D4AF37]/50 text-[#D4AF37]'
          }`}>
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold ${
              isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'
            }`}>
              Executive Credentials
            </span>
            <h3 className="text-lg font-serif font-bold">
              Official Profile & Portfolio Dossier
            </h3>
          </div>
        </div>

        {/* Overview Box */}
        <div className={`p-4 rounded-xl border mb-5 space-y-3 ${
          isLight
            ? 'bg-[#FAF8F0] border-neutral-200'
            : 'bg-[#121217] border-neutral-800/80'
        }`}>
          <div className={`flex items-start gap-2.5 text-xs ${isLight ? 'text-neutral-800 font-medium' : 'text-neutral-300'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
            <span>Complete Curriculum Vitae & professional writing experience</span>
          </div>
          <div className={`flex items-start gap-2.5 text-xs ${isLight ? 'text-neutral-800 font-medium' : 'text-neutral-300'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
            <span>Published literature, editorial writing samples & spoken word credits</span>
          </div>
          <div className={`flex items-start gap-2.5 text-xs ${isLight ? 'text-neutral-800 font-medium' : 'text-neutral-300'}`}>
            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
            <span>Strategic communications, speechwriting & consultancy qualifications</span>
          </div>
        </div>

        {/* Direct Document Action Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <a
            href={PROFILE_INFO.profileDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:flex-1 py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer ${
              isLight
                ? 'bg-[#9A7B1C] hover:bg-[#826615] text-white'
                : 'bg-[#D4AF37] hover:bg-[#E0B45C] text-black'
            }`}
          >
            <span>Open Google Docs Dossier</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={handleCopy}
            className={`w-full sm:w-auto py-2.5 px-4 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-800 font-medium'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-200 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Link Copied</span>
              </>
            ) : (
              <>
                <Copy className={`w-3.5 h-3.5 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`} />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
