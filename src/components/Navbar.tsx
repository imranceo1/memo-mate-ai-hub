
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Settings, User, Bell, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeSelector from './ThemeSelector';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: Calendar, label: 'Dashboard' },
    { path: '/timeline', icon: Calendar, label: 'Timeline' },
    { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
    { path: '/reminders', icon: Bell, label: 'Reminders' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold">MemoMate</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeSelector />
            <Button variant="outline" size="icon">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
