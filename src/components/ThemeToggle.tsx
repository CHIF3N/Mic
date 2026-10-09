import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'high-contrast light' : 'luxury dark'} theme`}
      className={`relative inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 cursor-pointer active:scale-95 border ${
        theme === 'dark'
          ? 'bg-neutral-900/90 text-[#D4AF37] border-neutral-800 hover:border-[#D4AF37]/60 hover:bg-neutral-800'
          : 'bg-white text-[#9A7B1C] border-[#D4AF37]/50 hover:border-[#9A7B1C] hover:bg-[#FAF6EC] shadow-sm'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};
