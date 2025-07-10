
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Bell, MessageCircle, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ThemeSelector from '@/components/ThemeSelector';
import LanguageSelector from '@/components/LanguageSelector';
import AnimatedBackground from '@/components/AnimatedBackground';
import FeatureCard from '@/components/FeatureCard';
import { useLandingTranslation } from '@/hooks/useTranslation';

const Landing: React.FC = () => {
  const { t } = useLandingTranslation();

  const features = useMemo(() => [
    {
      icon: MessageCircle,
      title: t('aiAssistantTitle'),
      description: t('aiAssistantDesc')
    },
    {
      icon: Calendar,
      title: t('smartExtractionTitle'),
      description: t('smartExtractionDesc')
    },
    {
      icon: Bell,
      title: t('intelligentRemindersTitle'),
      description: t('intelligentRemindersDesc')
    },
    {
      icon: Settings,
      title: t('privacyFirstTitle'),
      description: t('privacyFirstDesc')
    }
  ], [t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
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
              <Button variant="outline" className="btn-enhanced">{t('signIn')}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8 py-3 btn-enhanced button-ripple">
                {t('getStarted')}
                <ArrowUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 btn-enhanced">
              {t('watchDemo')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 card-enhanced">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <Link to="/login">
              <Button size="lg" className="text-lg px-8 py-3 btn-enhanced button-ripple">
                {t('ctaButton')}
                <ArrowUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded">
                <span className="text-white font-bold text-sm flex items-center justify-center h-full">M</span>
              </div>
              <span className="font-semibold">MemoMate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footerText')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(Landing);
