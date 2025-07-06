
import React, { useState } from 'react';
import { Send, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: t('aiWelcomeMessage'),
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    t('whatTasksDueToday'),
    t('howToSetReminder'),
    t('showProductivityStats'),
    t('howDataProtection'),
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAIResponse(message),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('due today')) {
      return t('aiResponseTasksDue');
    }
    
    if (lowerMessage.includes('reminder')) {
      return t('aiResponseReminder');
    }
    
    if (lowerMessage.includes('productivity') || lowerMessage.includes('stats')) {
      return t('aiResponseProductivity');
    }
    
    if (lowerMessage.includes('data') || lowerMessage.includes('privacy')) {
      return t('aiResponseDataProtection');
    }
    
    return t('aiResponseDefault') + userMessage + t('aiResponseDefaultEnd');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20 animate-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-24 h-24 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-accent/15 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
            <Sparkles className="w-8 h-8 text-primary" />
            {t('aiAssistant')}
          </h1>
          <p className="text-muted-foreground">{t('chatWithAI')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col animate-slide-in border-border bg-card/95 backdrop-blur">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <MessageCircle className="w-5 h-5" />
                  {t('chatWithMemoMate')}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-[80%] p-4 rounded-lg
                          ${message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground border border-border'
                          }
                        `}
                      >
                        <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground p-4 rounded-lg border border-border">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={t('askAnything')}
                      className="flex-1 bg-background text-foreground border-border"
                    />
                    <Button 
                      type="submit" 
                      disabled={!inputMessage.trim() || isTyping}
                      className="transform transition-all duration-150 hover:scale-105 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Questions Sidebar */}
          <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-card/95 backdrop-blur border-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">{t('quickQuestions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 text-sm bg-background hover:bg-muted text-foreground border-border hover:border-primary/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] leading-relaxed break-words whitespace-normal"
                    onClick={() => handleSendMessage(question)}
                  >
                    <span className="text-left block">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/95 backdrop-blur border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">{t('aiFeatures')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{t('aiFeature1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{t('aiFeature2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{t('aiFeature3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{t('aiFeature4')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
