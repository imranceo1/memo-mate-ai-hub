
import React from 'react';
import { useTheme, Theme } from '@/contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; colors: string[] }[] = [
    { value: 'light', label: 'Light', colors: ['bg-white', 'bg-gray-100', 'bg-blue-500'] },
    { value: 'dark', label: 'Dark', colors: ['bg-gray-900', 'bg-orange-500', 'bg-red-500'] },
    { value: 'blue', label: 'Blue', colors: ['bg-slate-800', 'bg-yellow-400', 'bg-red-500'] },
  ];

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200
            ${theme === t.value 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50'
            }
          `}
          title={`Switch to ${t.label} theme`}
        >
          <div className="flex gap-1">
            {t.colors.map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${color}`} />
            ))}
          </div>
          <span className="text-sm font-medium">{t.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
