
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  MessageSquare, 
  Bell, 
  Share2,
  Settings, 
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCommonTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const location = useLocation();
  const { t } = useCommonTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('timeline'), path: '/timeline', icon: Clock },
    { name: t('chat'), path: '/chat', icon: MessageSquare },
    { name: t('reminders'), path: '/reminders', icon: Bell },
    { name: t('taskSharing'), path: '/sharing', icon: Share2 },
    { name: t('settings'), path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ item, onClick }: { item: typeof navItems[0], onClick?: () => void }) => (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
        isActive(item.path)
          ? 'bg-primary text-primary-foreground shadow-lg scale-105'
          : 'text-foreground hover:bg-muted'
      } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
      title={isCollapsed ? item.name : ''}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && <span className="font-medium break-words">{item.name}</span>}
    </Link>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`hidden lg:flex fixed left-0 top-0 h-full bg-card border-r border-border flex-col z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/b3289de0-bc9f-4be4-9315-ffaa18fbb268.png" 
                alt="MemoMate Brain Logo" 
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-xl font-bold text-primary break-words">MemoMate</h1>
            </div>
          )}
          {isCollapsed && (
            <img 
              src="/lovable-uploads/b3289de0-bc9f-4be4-9315-ffaa18fbb268.png" 
              alt="MemoMate Brain Logo" 
              className="w-8 h-8 object-contain mx-auto"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 hover:bg-muted transition-colors flex-shrink-0"
            title={isCollapsed ? t('expandSidebar') : t('collapseSidebar')}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </div>

        {!isCollapsed && (
          <div className="p-4 border-t border-border space-y-3">
            <ThemeSelector />
            <LanguageSelector />
          </div>
        )}
      </nav>

      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 bg-background border border-border shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/lovable-uploads/b3289de0-bc9f-4be4-9315-ffaa18fbb268.png" 
                    alt="MemoMate Brain Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <h1 className="text-2xl font-bold text-primary break-words">MemoMate</h1>
                </div>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
              
              <div className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink key={item.path} item={item} onClick={() => setIsOpen(false)} />
                ))}
              </div>

              <div className="p-4 border-t border-border space-y-3">
                <ThemeSelector />
                <LanguageSelector />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content offset for desktop */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .main-content {
            margin-left: ${isCollapsed ? '4rem' : '16rem'};
            transition: margin-left 0.3s ease;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
