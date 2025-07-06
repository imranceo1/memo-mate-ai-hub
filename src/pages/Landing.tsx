
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Bell, MessageCircle, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ThemeSelector from '@/components/ThemeSelector';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const Landing: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Powered Assistant',
      description: 'Local AI chat that understands your productivity needs and helps manage tasks intelligently.'
    },
    {
      icon: Calendar,
      title: 'Smart Task Extraction',
      description: 'Automatically extract tasks from Gmail, WhatsApp, SMS, and calendar events.'
    },
    {
      icon: Bell,
      title: 'Intelligent Reminders',
      description: 'Never miss a deadline with smart notifications and priority-based alerts.'
    },
    {
      icon: Settings,
      title: 'Privacy First',
      description: 'AES-256 encryption with local storage option. Your data stays secure and private.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold">MemoMate</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeSelector />
            <Link to="/login">
              <Button variant="outline">{t('signIn')}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8 py-3">
                {t('getStarted')}
                <ArrowUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              {t('watchDemo')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to transform how you manage tasks and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to supercharge your productivity?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their task management with MemoMate's AI-powered assistance.
            </p>
            <Link to="/login">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Your Journey
                <ArrowUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded">
                <span className="text-white font-bold text-sm flex items-center justify-center h-full">M</span>
              </div>
              <span className="font-semibold">MemoMate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MemoMate. Built with privacy and productivity in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
