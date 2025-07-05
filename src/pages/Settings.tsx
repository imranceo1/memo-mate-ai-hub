
import React from 'react';
import { Settings as SettingsIcon, Palette, Globe, Shield, Bell, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import ThemeSelector from '@/components/ThemeSelector';
import Navbar from '@/components/Navbar';

const Settings: React.FC = () => {
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
      case 'connected': return 'Connected';
      case 'setup': return 'Setup Required';
      default: return 'Disabled';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <SettingsIcon className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">Customize your MemoMate experience</p>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Theme</label>
                <ThemeSelector />
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Display Language</label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option value="en">English</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                  <option value="te">Telugu (తెలుగు)</option>
                  <option value="ko">Korean (한국어)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Time Zone</label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Asia/Kolkata">India Standard Time</option>
                  <option value="Asia/Seoul">Korea Standard Time</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Local Storage</p>
                  <p className="text-sm text-muted-foreground">Keep all data on your device</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cloud Sync</p>
                  <p className="text-sm text-muted-foreground">Sync data across devices</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AES-256 Encryption</p>
                  <p className="text-sm text-muted-foreground">Encrypt all stored data</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analytics</p>
                  <p className="text-sm text-muted-foreground">Help improve MemoMate</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Browser notifications for reminders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Reminders</p>
                  <p className="text-sm text-muted-foreground">Email alerts for important tasks</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sound Notifications</p>
                  <p className="text-sm text-muted-foreground">Audio alerts for reminders</p>
                </div>
                <Switch />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Default Reminder Time</label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option value="15">15 minutes before</option>
                  <option value="30">30 minutes before</option>
                  <option value="60">1 hour before</option>
                  <option value="120">2 hours before</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className={`text-sm ${getStatusColor(integration.status)}`}>
                          {getStatusLabel(integration.status)}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={integration.status === 'connected' ? 'outline' : 'default'}
                      size="sm"
                    >
                      {integration.status === 'connected' ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="animate-slide-in border-destructive/20" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-muted-foreground">Download all your tasks and settings</p>
                </div>
                <Button variant="outline">Export</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reset Settings</p>
                  <p className="text-sm text-muted-foreground">Reset all settings to default</p>
                </div>
                <Button variant="outline">Reset</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-destructive">Delete All Data</p>
                  <p className="text-sm text-muted-foreground">Permanently delete all tasks and data</p>
                </div>
                <Button variant="destructive">Delete</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
