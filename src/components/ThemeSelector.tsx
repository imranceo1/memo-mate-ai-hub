
import React from 'react';
import { Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme, Theme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const themes: { value: Theme; label: string; colors: string[] }[] = [
    { value: 'light', label: t('light'), colors: ['bg-white', 'bg-gray-100', 'bg-blue-500'] },
    { value: 'dark', label: t('dark'), colors: ['bg-gray-900', 'bg-orange-500', 'bg-red-500'] },
    { value: 'blue', label: 'Blue', colors: ['bg-slate-800', 'bg-yellow-400', 'bg-red-500'] },
  ];

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Monitor className="w-4 h-4" />
          <span className="hidden sm:inline">{currentTheme?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-background border-border z-50">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`cursor-pointer hover:bg-muted flex items-center gap-3 ${
              theme === themeOption.value ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            <div className="flex gap-1">
              {themeOption.colors.map((color, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${color}`} />
              ))}
            </div>
            <span>{themeOption.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
