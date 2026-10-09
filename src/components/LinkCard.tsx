import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Phone, FileText } from 'lucide-react';
import { LinkItem } from '../types';
import { 
  LinkedInIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TikTokIcon, 
  WhatsAppIcon 
} from './Icons';
import { useTheme } from '../context/ThemeContext';

interface LinkCardProps {
  item: LinkItem;
  onOpenDossier?: () => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ item, onOpenDossier }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(item.copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.url.startsWith('tel:')) {
      window.location.href = item.url;
    } else {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Render appropriate domain icon
  const renderIcon = () => {
    const iconClass = `w-5 h-5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`;
    switch (item.iconType) {
      case 'linkedin':
        return <LinkedInIcon className={iconClass} />;
      case 'instagram':
        return <InstagramIcon className={iconClass} />;
      case 'facebook':
        return <FacebookIcon className={iconClass} />;
      case 'tiktok':
        return <TikTokIcon className={iconClass} />;
      case 'whatsapp':
        return <WhatsAppIcon className={iconClass} />;
      case 'phone':
        return <Phone className={iconClass} />;
      case 'document':
        return <FileText className={iconClass} />;
      default:
        return <ExternalLink className={iconClass} />;
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
      className={`group relative w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer select-none focus:outline-none ${
        isLight
          ? item.featured
            ? 'bg-white hover:bg-[#FAF8F2] border-[#B89228] shadow-[0_4px_18px_rgba(184,146,40,0.14)] focus:ring-2 focus:ring-[#8C6F1E]'
            : 'bg-white hover:bg-[#FAF9F5] border-neutral-200/90 hover:border-[#B89228]/70 shadow-xs hover:shadow-sm focus:ring-2 focus:ring-[#8C6F1E]'
          : item.featured 
            ? 'bg-[#0c0c0e] hover:bg-[#121216] border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.08)] hover:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]' 
            : 'bg-[#0c0c0e] hover:bg-[#121216] border-neutral-800/90 hover:border-[#D4AF37]/50 hover:shadow-[0_0_16px_rgba(212,175,55,0.05)] focus:ring-1 focus:ring-[#D4AF37]'
      }`}
    >
      {/* Featured gold accent corner indicator */}
      {item.highlightNote && (
        <div className={`absolute top-3 right-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
          isLight
            ? 'text-[#7C5E10] bg-[#FEF9E7] border-[#D4AF37]/60 font-semibold'
            : 'text-[#D4AF37] bg-neutral-900/90 border-[#D4AF37]/30'
        }`}>
          {item.highlightNote}
        </div>
      )}

      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Left Icon Emblem */}
        <div className={`shrink-0 w-11 h-11 rounded-lg border flex items-center justify-center transition-colors ${
          isLight
            ? 'bg-[#FAF5E6] border-[#D4AF37]/50 group-hover:border-[#8C6F1E] group-hover:bg-[#F5EDD3]'
            : 'bg-[#16161a] border-[#D4AF37]/30 group-hover:border-[#D4AF37] group-hover:bg-[#1a1a20]'
        }`}>
          {renderIcon()}
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 pr-6 sm:pr-8">
          {/* Category & Destination Identifier */}
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className={`font-semibold tracking-wide ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`}>
              {item.categoryLabel}
            </span>
            <span className={isLight ? 'text-neutral-400' : 'text-neutral-600'} aria-hidden="true">·</span>
            <span className={`font-mono truncate ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
              {item.targetName}
            </span>
          </div>

          {/* Primary Title */}
          <h2 className={`text-base font-semibold mb-1 truncate transition-colors ${
            isLight
              ? 'text-[#09090B] group-hover:text-[#8C6F1E]'
              : 'text-white group-hover:text-[#FFF1CA]'
          }`}>
            {item.title}
          </h2>

          {/* Brief Straight to the Point Description */}
          <p className={`text-xs line-clamp-2 leading-relaxed ${
            isLight ? 'text-neutral-700 font-normal' : 'text-neutral-300'
          }`}>
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Action Strip */}
      <div className={`mt-3.5 pt-3 border-t flex items-center justify-between text-xs ${
        isLight ? 'border-neutral-100' : 'border-neutral-900/80'
      }`}>
        {/* Direct Destination CTA */}
        <div className={`flex items-center gap-1.5 font-medium transition-colors ${
          isLight
            ? 'text-[#8C6F1E] group-hover:text-black font-semibold'
            : 'text-[#D4AF37] group-hover:text-white'
        }`}>
          <span>{item.actionLabel}</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Quick Copy Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] rounded border transition-colors active:scale-95 cursor-pointer ${
              isLight
                ? 'bg-neutral-100 text-neutral-800 hover:text-black hover:bg-neutral-200 border-neutral-300'
                : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border-neutral-800 hover:border-[#D4AF37]/40'
            }`}
            title={item.copyLabel}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className={`w-3 h-3 ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
