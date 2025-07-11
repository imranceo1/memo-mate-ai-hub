
import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Trash2, Mail, Calendar, MessageCircle, Smartphone, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Navbar from '@/components/Navbar';
import { useSettingsTranslation } from '@/hooks/useTranslation';

const Settings: React.FC = () => {
  const { t } = useSettingsTranslation();
  
  const integrations = [
    { name: 'Gmail', status: 'disabled', icon: Mail, color: 'text-red-600' },
    { name: 'Google Calendar', status: 'disabled', icon: Calendar, color: 'text-blue-600' },
    { name: 'WhatsApp', status: 'disabled', icon: MessageCircle, color: 'text-green-600' },
    { name: 'SMS (Twilio)', status: 'disabled', icon: Smartphone, color: 'text-purple-600' },
    { name: 'Zoom', status: 'disabled', icon: Video, color: 'text-blue-500' },
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
      
      <div className="lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 break-words">
              <SettingsIcon className="w-8 h-8 text-primary flex-shrink-0" />
              <span className="break-words">{t('settings')}</span>
            </h1>
            <p className="text-muted-foreground break-words">{t('customizeExperience')}</p>
          </div>

          {/* First Row - Privacy and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="animate-slide-in">
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

            <Card className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
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

          {/* Second Row - Integrations */}
          <div className="mb-6">
            <Card className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg break-words">{t('integrations')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {integrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <integration.icon className={`w-6 h-6 flex-shrink-0 ${integration.color}`} />
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
                        disabled
                      >
                        {integration.status === 'connected' ? t('configure') : t('connect')}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Row - Data Management */}
          <Card className="animate-slide-in border-destructive/20" style={{ animationDelay: '0.3s' }}>
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
    </div>
  );
};

export default Settings;
