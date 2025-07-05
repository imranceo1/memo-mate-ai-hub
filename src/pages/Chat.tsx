
import React, { useState } from 'react';
import { Send, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your MemoMate AI assistant. I can help you manage tasks, set reminders, and answer questions about your productivity. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What tasks are due today?",
    "How do I set a reminder?",
    "Show my productivity stats",
    "How does MemoMate protect my data?",
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
      return "You have 3 tasks due today:\n\n1. Review quarterly reports (High priority) - Due in 2 hours\n2. Team standup meeting (Medium priority) - Due in 4 hours\n3. Update project documentation (Low priority) - Due by end of day\n\nWould you like me to set reminders for any of these?";
    }
    
    if (lowerMessage.includes('reminder')) {
      return "To set a reminder in MemoMate:\n\n1. Go to the Timeline page\n2. Click the '+ Add Task' button\n3. Fill in the task details and due time\n4. MemoMate will automatically remind you 1 hour before\n\nYou can also ask me to set reminders directly. Just say 'Remind me to [task] at [time]'";
    }
    
    if (lowerMessage.includes('productivity') || lowerMessage.includes('stats')) {
      return "Here are your productivity insights:\n\n📊 This week: 87% completion rate\n⚡ Best time: 9-11 AM (highest focus)\n🔥 Current streak: 15 days\n📈 Improvement: +12% from last week\n\nYou're doing great! Keep up the momentum! 🎯";
    }
    
    if (lowerMessage.includes('data') || lowerMessage.includes('privacy')) {
      return "MemoMate takes your privacy seriously:\n\n🔒 AES-256 encryption for all data\n💾 Local storage option available\n🤖 AI processing happens locally\n🔄 You control cloud sync settings\n🗑️ Easy data deletion from Settings\n\nYour personal information never leaves your device unless you explicitly choose cloud storage.";
    }
    
    return "I understand you're asking about: '" + userMessage + "'\n\nI can help you with:\n• Task management and reminders\n• Productivity insights and tips\n• MemoMate features and settings\n• Data privacy and security\n\nTry asking me something more specific, or use one of the quick questions below!";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-foreground">
            <Sparkles className="w-8 h-8 text-primary" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground">Chat with your personal productivity AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col animate-slide-in border-border bg-card">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <MessageCircle className="w-5 h-5" />
                  Chat with MemoMate AI
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-[80%] p-3 rounded-lg
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
                      <div className="bg-muted text-foreground p-3 rounded-lg border border-border">
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
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything about your tasks or MemoMate..."
                    className="flex-1 bg-background text-foreground border-border"
                  />
                  <Button type="submit" disabled={!inputMessage.trim() || isTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Quick Questions */}
          <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 text-sm bg-background hover:bg-muted text-foreground border-border hover:border-primary/50 transition-all duration-200"
                    onClick={() => handleSendMessage(question)}
                  >
                    <span className="leading-relaxed">{question}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">Local AI processing for privacy</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">Understands your tasks and schedule</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">Multilingual support</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">Productivity insights and tips</p>
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
