import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageCircle, Bot, ArrowRight, Wallet, Package, Trophy } from 'lucide-react';
import { ViewType } from './Sidebar';
import chatbotIcon from '../../assets/Gemini_Generated_Image_51vjbz51vjbz51vj.png';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  action?: {
    label: string;
    route: ViewType;
    icon: any;
  };
}

export function AIChatbot({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hi Boss! 👋 I'm your G-Assistant. How can I help you manage your business today?",
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('loan') || lowerText.includes('score') || lowerText.includes('reward')) {
        aiResponse = {
          id: Date.now().toString(),
          sender: 'ai',
          text: "Your GScore is currently 820 (Pro Tier), which makes you eligible for a ₱250k business loan! Would you like to check your rewards page for more details?",
          action: { label: "View Rewards", route: "rewards", icon: Trophy }
        };
      } else if (lowerText.includes('inventory') || lowerText.includes('stock')) {
        aiResponse = {
          id: Date.now().toString(),
          sender: 'ai',
          text: "I noticed your Brake Pads (Front) are running a bit low on stock. Want me to take you to the inventory page so you can restock?",
          action: { label: "Manage Inventory", route: "inventory", icon: Package }
        };
      } else if (lowerText.includes('save') || lowerText.includes('buffer') || lowerText.includes('deposit')) {
        aiResponse = {
          id: Date.now().toString(),
          sender: 'ai',
          text: "You had a great sales day today! Moving some profit to your GSave buffer is a smart move. Let's head over there.",
          action: { label: "Go to GSave", route: "gsave", icon: Wallet }
        };
      } else {
        aiResponse = {
          id: Date.now().toString(),
          sender: 'ai',
          text: "I can help you record sales, manage your inventory, or check your GScore. What would you like to focus on?",
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleActionClick = (route: ViewType) => {
    onNavigate(route);
    setIsOpen(false);
  };

  const suggestions = [
    "Check my GScore & loans",
    "Any low inventory?",
    "Move money to buffer"
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} bg-white border border-gray-100 overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
        <img 
          src={chatbotIcon} 
          alt="AI Bot" 
          className="w-full h-full object-cover relative z-10"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            e.currentTarget.parentElement?.classList.add('bg-blue-600');
          }}
        />
        {/* Fallback icon if image is missing/broken */}
        <Sparkles size={28} className="text-white absolute z-0" />
        
        {/* Notification dot */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-20"></div>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[380px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-t-3xl flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 overflow-hidden flex items-center justify-center relative">
               <img 
                src={chatbotIcon} 
                alt="AI Bot" 
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <Sparkles size={20} className="text-white absolute z-0" />
            </div>
            <div>
              <h3 className="font-bold text-white leading-tight">G-Assistant</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-blue-100 text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-blue-100 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3.5 ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm shadow-md shadow-blue-600/20' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                {msg.action && (
                  <button 
                    onClick={() => handleActionClick(msg.action!.route)}
                    className="mt-3 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-blue-100"
                  >
                    {msg.action.icon && <msg.action.icon size={16} />}
                    {msg.action.label}
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
            {suggestions.map((sug, i) => (
              <button 
                key={i}
                onClick={() => handleSend(sug)}
                className="whitespace-nowrap px-4 py-2 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 rounded-full text-xs font-medium text-gray-600 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100 rounded-b-3xl shrink-0">
          <div className="flex items-center gap-2 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
            />
            <button 
              onClick={() => handleSend(inputText)}
              disabled={!inputText.trim()}
              className="absolute right-1.5 w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
