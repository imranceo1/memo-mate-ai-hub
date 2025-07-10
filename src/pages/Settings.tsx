
import React from 'react';
import { Settings as SettingsIcon, Palette, Globe, Shield, Bell, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import ThemeSelector from '@/components/ThemeSelector';
import Navbar from '@/components/Navbar';
import { useSettingsTranslation } from '@/hooks/useTranslation';

const Settings: React.FC = () => {
  const { t } = useSettingsTranslation();
  
  const integrations = [
    { name: 'Gmail', status: 'connected', icon: '📧' },
    { name: 'Google Calendar', status: 'connected', icon: '📅' },
    { name: 'WhatsApp', status: 'setup', icon: '💬' },
    { name: 'SMS (Twilio)', status: 'disabled', icon: '📱' },
    { name: 'Zoom', status: 'disabled', icon: '📹' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'setup': return 'text-yellow-600';
      default: return 'text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'connected': return t('connected');
      case 'setup': return t('setupRequired');
      default: return t('disabled');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 break-words">
            <SettingsIcon className="w-8 h-8 text-primary flex-shrink-0" />
            <span className="break-words">{t('settings')}</span>
          </h1>
          <p className="text-muted-foreground break-words">{t('customizeExperience')}</p>
        </div>

        {/* First Row - Appearance and Language */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg break-words">
                <Palette className="w-5 h-5 flex-shrink-0" />
                <span className="break-words">{t('appearance')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block break-words">{t('theme')}</label>
                <ThemeSelector />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg break-words">
                <Globe className="w-5 h-5 flex-shrink-0" />
                <span className="break-words">{t('languageRegion')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block break-words">{t('displayLanguage')}</label>
                <select className="w-full p-2 border rounded-md bg-background text-sm">
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                  <option value="te">Telugu (తెలుగు)</option>
                  <option value="ko">Korean (한국어)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block break-words">{t('timeZone')}</label>
                <select className="w-full p-2 border rounded-md bg-background text-sm">
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Asia/Kolkata">India Standard Time</option>
                  <option value="Asia/Seoul">Korea Standard Time</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row - Privacy and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg break-words">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span className="break-words">{t('privacySecurity')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm break-words">{t('localStorage')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('keepDataOnDevice')}</p>
                </div>
                <Switch defaultChecked className="flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm break-words">{t('cloudSync')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('syncDataAcrossDevices')}</p>
                </div>
                <Switch className="flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm break-words">{t('aesEncryption')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('encryptStoredData')}</p>
                </div>
                <Switch defaultChecked className="flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm break-words">{t('analytics')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('helpImprove')}</p>
                </div>
                <Switch className="flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg break-words">
                <Bell className="w-5 h-5 flex-shrink-0" />
                <span className="break-words">{t('notifications')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm break-words">{t('pushNotifications')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('browserNotifications')}</p>
                </div>
                <Switch defaultChecked className="flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm break-words">{t('emailReminders')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('emailAlerts')}</p>
                </div>
                <Switch defaultChecked className="flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm break-words">{t('soundNotifications')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('audioAlerts')}</p>
                </div>
                <Switch className="flex-shrink-0" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block break-words">{t('defaultReminderTime')}</label>
                <select className="w-full p-2 border rounded-md bg-background text-sm">
                  <option value="15">{t('fifteenMinutes')}</option>
                  <option value="30">{t('thirtyMinutes')}</option>
                  <option value="60">{t('oneHour')}</option>
                  <option value="120">{t('twoHours')}</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Third Row - Integrations */}
        <div className="mb-6">
          <Card className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg break-words">{t('integrations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-2xl flex-shrink-0">{integration.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm break-words">{integration.name}</p>
                        <p className={`text-xs ${getStatusColor(integration.status)} break-words`}>
                          {getStatusLabel(integration.status)}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={integration.status === 'connected' ? 'outline' : 'default'}
                      size="sm"
                      className="flex-shrink-0 text-xs"
                    >
                      {integration.status === 'connected' ? t('configure') : t('connect')}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fourth Row - Data Management */}
        <Card className="animate-slide-in border-destructive/20" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive text-base sm:text-lg break-words">
              <Trash2 className="w-5 h-5 flex-shrink-0" />
              <span className="break-words">{t('dataManagement')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-medium text-sm break-words">{t('exportData')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('downloadAllData')}</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">{t('export')}</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-medium text-sm break-words">{t('resetSettings')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('resetToDefault')}</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">{t('reset')}</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-medium text-destructive text-sm break-words">{t('deleteAllData')}</p>
                  <p className="text-xs text-muted-foreground break-words">{t('permanentlyDelete')}</p>
                </div>
                <Button variant="destructive" size="sm" className="flex-shrink-0">{t('delete')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
