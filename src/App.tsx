/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Phone, 
  FileText
} from 'lucide-react';
import { ProfileHeader } from './components/ProfileHeader';
import { LinkCard } from './components/LinkCard';
import { ShareModal } from './components/ShareModal';
import { DossierModal } from './components/DossierModal';
import { ThemeToggle } from './components/ThemeToggle';
import { LINKS_DATA, PROFILE_INFO } from './data/links';
import { LinkCategory } from './types';
import { WhatsAppIcon } from './components/Icons';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeCategory, setActiveCategory] = useState<LinkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);

  // Filter links by category and search query
  const filteredLinks = useMemo(() => {
    return LINKS_DATA.filter((link) => {
      const matchesCategory = 
        activeCategory === 'all' || link.category === activeCategory;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        link.title.toLowerCase().includes(q) ||
        link.subtitle.toLowerCase().includes(q) ||
        link.targetName.toLowerCase().includes(q) ||
        link.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Counts for tabs
  const categoryCounts = useMemo(() => {
    return {
      all: LINKS_DATA.length,
      direct: LINKS_DATA.filter(l => l.category === 'direct').length,
      creative: LINKS_DATA.filter(l => l.category === 'creative').length,
      career: LINKS_DATA.filter(l => l.category === 'career').length,
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isLight 
        ? 'bg-[#F9FAFB] text-[#09090B] selection:bg-[#D4AF37]/40 selection:text-black' 
        : 'bg-[#050505] text-[#FAFAFA] selection:bg-[#D4AF37]/30 selection:text-white'
    }`}>
      {/* 3-Zone Top Bar Contract */}
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b px-4 sm:px-8 py-3.5 transition-colors ${
        isLight
          ? 'bg-white/95 border-neutral-200 shadow-xs'
          : 'bg-[#070709]/90 border-neutral-900/80'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="./" 
            className={`text-base sm:text-lg font-bold tracking-tight font-serif transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              isLight ? 'text-[#09090B] hover:text-[#8C6F1E]' : 'text-white hover:text-[#D4AF37]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-[#8C6F1E]' : 'bg-[#D4AF37]'}`} aria-hidden="true" />
            <span>Fonlon Hari Michel</span>
          </a>

          {/* Zone 2: 4 concise single-line text links */}
          <nav className={`hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold ${
            isLight ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isLight ? 'hover:text-black' : 'hover:text-white'
              }`}
            >
              All Links
            </button>
            <button 
              onClick={() => setActiveCategory('direct')} 
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isLight ? 'hover:text-black' : 'hover:text-white'
              }`}
            >
              Direct Reach
            </button>
            <button 
              onClick={() => setIsDossierOpen(true)} 
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isLight ? 'hover:text-[#8C6F1E] text-[#9A7B1C]' : 'hover:text-[#D4AF37]'
              }`}
            >
              Dossier & CV
            </button>
            <button 
              onClick={() => setShowBioModal(true)} 
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isLight ? 'hover:text-black' : 'hover:text-white'
              }`}
            >
              About MicWrites
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Theme Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Primary Action Button */}
            <a
              href={PROFILE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 ${
                isLight
                  ? 'bg-[#9A7B1C] hover:bg-[#826615] text-white shadow-amber-900/10'
                  : 'text-black bg-[#D4AF37] hover:bg-[#E0B45C]'
              }`}
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quick Chat</span>
              <span className="sm:hidden">Chat</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pb-20 pt-2">
        {/* Profile Identity & Header */}
        <ProfileHeader 
          onOpenShare={() => setIsShareOpen(true)} 
          onOpenDossier={() => setIsDossierOpen(true)} 
        />

        {/* Filter & Search Bar */}
        <section className="mt-4 mb-6 space-y-3">
          {/* Search Box */}
          <div className="relative w-full">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isLight ? 'text-neutral-400' : 'text-neutral-500'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search links, handles, or topics..."
              className={`w-full pl-10 pr-9 py-2.5 text-xs rounded-xl border transition-colors ${
                isLight
                  ? 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#8C6F1E] focus:ring-1 focus:ring-[#8C6F1E] shadow-2xs'
                  : 'bg-[#0c0c0f] border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isLight ? 'text-neutral-400 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Interactive Filter Tabs (Functional segmented controls) */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl border overflow-x-auto no-scrollbar ${
            isLight
              ? 'bg-neutral-100/90 border-neutral-200'
              : 'bg-[#0c0c0f] border-neutral-800/80'
          }`}>
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                activeCategory === 'all'
                  ? isLight
                    ? 'bg-[#9A7B1C] text-white font-semibold shadow-xs'
                    : 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                  : isLight
                    ? 'text-neutral-700 hover:text-black hover:bg-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              All ({categoryCounts.all})
            </button>
            <button
              onClick={() => setActiveCategory('direct')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                activeCategory === 'direct'
                  ? isLight
                    ? 'bg-[#9A7B1C] text-white font-semibold shadow-xs'
                    : 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                  : isLight
                    ? 'text-neutral-700 hover:text-black hover:bg-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Direct ({categoryCounts.direct})
            </button>
            <button
              onClick={() => setActiveCategory('creative')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                activeCategory === 'creative'
                  ? isLight
                    ? 'bg-[#9A7B1C] text-white font-semibold shadow-xs'
                    : 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                  : isLight
                    ? 'text-neutral-700 hover:text-black hover:bg-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Creative ({categoryCounts.creative})
            </button>
            <button
              onClick={() => setActiveCategory('career')}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap text-center cursor-pointer ${
                activeCategory === 'career'
                  ? isLight
                    ? 'bg-[#9A7B1C] text-white font-semibold shadow-xs'
                    : 'bg-[#D4AF37] text-black font-semibold shadow-sm'
                  : isLight
                    ? 'text-neutral-700 hover:text-black hover:bg-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Career & CV ({categoryCounts.career})
            </button>
          </div>
        </section>

        {/* Links Grid List */}
        <section className="space-y-3" aria-label="Official Links">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((item) => (
              <LinkCard 
                key={item.id} 
                item={item} 
                onOpenDossier={() => setIsDossierOpen(true)}
              />
            ))
          ) : (
            <div className={`text-center py-12 px-4 rounded-xl border border-dashed ${
              isLight
                ? 'border-neutral-300 bg-white text-neutral-600'
                : 'border-neutral-800 bg-[#0c0c0f] text-neutral-400'
            }`}>
              <p className="text-sm mb-2">No links found matching &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className={`text-xs hover:underline cursor-pointer font-semibold ${
                  isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'
                }`}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* Direct Call Quick Banner */}
        <section className={`mt-8 p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-colors ${
          isLight
            ? 'bg-gradient-to-r from-[#FFFDF5] via-[#FFF9E6] to-[#FFFDF5] border-[#D4AF37]/60 shadow-xs'
            : 'bg-gradient-to-r from-neutral-950 via-[#0e0e12] to-neutral-950 border-[#D4AF37]/30'
        }`}>
          <div>
            <div className={`text-xs font-serif font-bold mb-0.5 ${
              isLight ? 'text-black' : 'text-white'
            }`}>
              Urgent Enquiries & Bookings
            </div>
            <div className={`text-xs ${isLight ? 'text-neutral-700' : 'text-neutral-400'}`}>
              Reach Fonlon Hari Michel directly via phone: <span className={`font-mono font-medium ${isLight ? 'text-black' : 'text-neutral-200'}`}>{PROFILE_INFO.formattedPhone}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PROFILE_INFO.phone}`}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isLight
                  ? 'bg-white hover:bg-neutral-100 text-neutral-900 border-neutral-300 shadow-2xs'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700/80'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'}`} />
              <span>Call Now</span>
            </a>
            <a
              href={PROFILE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm ${
                isLight
                  ? 'bg-[#9A7B1C] hover:bg-[#826615] text-white shadow-amber-900/10'
                  : 'text-black bg-[#D4AF37] hover:bg-[#E0B45C]'
              }`}
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </section>

        {/* Brief About Summary */}
        <section className={`mt-10 pt-8 border-t text-center ${
          isLight ? 'border-neutral-200' : 'border-neutral-900'
        }`}>
          <h2 className={`text-sm font-serif font-bold uppercase tracking-widest mb-2 ${
            isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'
          }`}>
            About Fonlon Hari Michel
          </h2>
          <p className={`text-xs max-w-md mx-auto leading-relaxed mb-4 ${
            isLight ? 'text-neutral-700' : 'text-neutral-400'
          }`}>
            Fonlon Hari Michel, known creatively as <strong className={isLight ? 'text-black font-semibold' : 'text-neutral-200'}>MicWrites</strong>, is a dedicated writer, storyteller, and spoken word artist based in Cameroon. Specializing in poetic reflections, strategic communications, and written editorial commissions.
          </p>
          <div className={`flex items-center justify-center gap-4 text-xs ${
            isLight ? 'text-neutral-600' : 'text-neutral-500'
          }`}>
            <span>Direct: {PROFILE_INFO.formattedPhone}</span>
            <span aria-hidden="true">·</span>
            <button 
              onClick={() => setIsDossierOpen(true)}
              className={`hover:underline cursor-pointer font-semibold ${
                isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'
              }`}
            >
              View Document Dossier
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`w-full py-6 border-t text-center text-xs transition-colors ${
        isLight
          ? 'bg-white/70 border-neutral-200 text-neutral-600'
          : 'border-neutral-900/80 text-neutral-500'
      }`}>
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`font-serif font-semibold ${isLight ? 'text-neutral-900' : 'text-neutral-300'}`}>
              Fonlon Hari Michel
            </span>
            <span aria-hidden="true">·</span>
            <span>MicWrites Official</span>
          </div>
          <div>
            <span>© 2026 Fonlon Hari Michel · All Rights Reserved</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
      />
      <DossierModal 
        isOpen={isDossierOpen} 
        onClose={() => setIsDossierOpen(false)} 
      />

      {/* Bio Modal */}
      {showBioModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowBioModal(false)}
        >
          <div 
            className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 transition-colors ${
              isLight
                ? 'bg-white border-[#B89228] text-neutral-900'
                : 'bg-[#0c0c0f] border-[#D4AF37]/50 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBioModal(false)}
              className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight
                  ? 'text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200'
                  : 'text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center mb-4">
              <span className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${
                isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'
              }`}>
                Creative Biography
              </span>
              <h3 className="text-lg font-serif font-bold mt-1">
                Fonlon Hari Michel (MicWrites)
              </h3>
            </div>
            <div className={`space-y-3 text-xs leading-relaxed ${
              isLight ? 'text-neutral-700' : 'text-neutral-300'
            }`}>
              <p>
                Fonlon Hari Michel is an African author, storyteller, and creative voice operating under the creative moniker <strong>MicWrites</strong>.
              </p>
              <p>
                His work encompasses spoken word poetry, narrative prose, cultural commentaries, and freelance editorial writing. On social media, he has built an engaged following through resonant quotes, video performances, and literary dialogues.
              </p>
              <p>
                For speaking engagements, written features, voice performances, or consultation, reach out directly via WhatsApp or phone.
              </p>
            </div>
            <div className={`mt-5 pt-4 border-t flex items-center justify-between ${
              isLight ? 'border-neutral-200' : 'border-neutral-800'
            }`}>
              <a
                href={PROFILE_INFO.profileDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs hover:underline flex items-center gap-1 font-semibold ${
                  isLight ? 'text-[#8C6F1E]' : 'text-[#D4AF37]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Google Docs Dossier</span>
              </a>
              <button
                onClick={() => setShowBioModal(false)}
                className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer ${
                  isLight
                    ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
