import { useState } from 'react';
import { Menu, Search, Bell, User, Settings, LogOut, Package, Trophy, Sparkles, ShieldCheck, Home, List, QrCode, X } from 'lucide-react';
import { Sidebar, ViewType } from './components/Sidebar';
import { RecordsView } from './components/RecordsView';
import { GSaveView } from './components/GSaveView';
import { SmartRestockView } from './components/SmartRestockView';
import { SaleFlow } from './components/SaleFlow';
import { RewardsView } from './components/RewardsView';
import { DashboardHome } from './components/DashboardHome';
import { AIChatbot } from './components/AIChatbot';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome onNavigate={setCurrentView} />;
      case 'records':
        return <RecordsView />;
      case 'gsave':
        return <GSaveView />;
      case 'purchases':
        return <SmartRestockView />;
      case 'rewards':
        return <RewardsView />;
      case 'sale':
        return <SaleFlow />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
            <h2 className="text-2xl font-bold">{currentView} view coming soon</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          currentView={currentView} 
          onViewChange={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
          }}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Desktop Top Header (Hidden on Mobile) */}
        <header className="hidden lg:flex bg-white h-16 border-b border-gray-200 items-center justify-between px-8 shrink-0 z-40 shadow-sm relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all w-64 text-sm outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 relative">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false);
                  setHasUnreadNotifs(false);
                }}
                className={`p-2 rounded-full text-gray-500 hover:bg-gray-100 relative transition-colors ${isNotifOpen ? 'bg-gray-100' : ''}`}
              >
                <Bell size={20} />
                {hasUnreadNotifs && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <button className="text-xs text-blue-600 font-semibold hover:text-blue-800">Mark all read</button>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-50">
                    <NotifItem icon={<Package size={16} className="text-red-500"/>} title="Low Stock Alert" desc="Brake Pads (Front) is running low." time="10 min ago" unread={true} />
                    <NotifItem icon={<Trophy size={16} className="text-amber-500"/>} title="GScore Increased" desc="You earned +15 points for hitting 100 sales!" time="2 hrs ago" unread={true} />
                    <NotifItem icon={<Sparkles size={16} className="text-purple-500"/>} title="New AI Insights" desc="Check your dashboard for today's summary." time="Yesterday" unread={false} />
                  </div>
                  <div className="p-3 text-center border-t border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setIsNotifOpen(false)}>
                    <span className="text-sm font-semibold text-gray-600">Close</span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <div 
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className={`h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer transition-shadow border-2 ${isProfileOpen ? 'ring-2 ring-blue-200 border-white' : 'border-transparent'}`}
              >
                M
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="font-bold text-gray-900">Kristine</div>
                    <div className="text-xs text-gray-500 truncate">moseszachfsabido@gmail.com</div>
                    <div className="mt-2 inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Trophy size={10} /> Pro Tier
                    </div>
                  </div>
                  <div className="p-2">
                    <ProfileMenuItem icon={<User size={16}/>} label="My Account" onClick={() => setIsProfileOpen(false)} />
                    <ProfileMenuItem icon={<Settings size={16}/>} label="Business Settings" onClick={() => setIsProfileOpen(false)} />
                    <ProfileMenuItem icon={<ShieldCheck size={16}/>} label="Privacy & Security" onClick={() => setIsProfileOpen(false)} />
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <ProfileMenuItem icon={<LogOut size={16}/>} label="Log Out" color="text-red-600 hover:bg-red-50" onClick={() => setIsProfileOpen(false)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto relative pb-20 lg:pb-0">
          {renderView()}
        </main>
        
        {/* Mobile Bottom Navigation (GCash Style) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 flex justify-between items-end pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 ${currentView === 'home' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Home size={22} strokeWidth={currentView === 'home' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('records')} 
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 ${currentView === 'records' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List size={22} strokeWidth={currentView === 'records' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">Records</span>
          </button>
          
          {/* Floating Center Action Button */}
          <div className="flex-1 flex flex-col items-center justify-center relative h-full">
            <button 
              onClick={() => setCurrentView('sale')} 
              className="absolute bottom-4 w-16 h-16 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white border-4 border-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] transform transition-transform active:scale-95"
            >
              <QrCode size={26} strokeWidth={2.5} />
            </button>
          </div>
          
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
              setHasUnreadNotifs(false);
            }} 
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 relative ${isNotifOpen ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Bell size={22} strokeWidth={isNotifOpen ? 2.5 : 2} />
            {hasUnreadNotifs && <span className="absolute top-3 right-1/4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
            <span className="text-[10px] font-bold tracking-wide">Inbox</span>
          </button>
          
          <button 
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }} 
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 ${isProfileOpen ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <User size={22} strokeWidth={isProfileOpen ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">Profile</span>
          </button>
        </div>
        
        {/* Mobile Modals for Nav Items */}
        {isNotifOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-opacity">
            <div className="bg-white w-full sm:w-80 sm:rounded-3xl rounded-t-3xl max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
                <button onClick={() => setIsNotifOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-y-auto divide-y divide-gray-50 flex-1">
                <NotifItem icon={<Package size={16} className="text-red-500"/>} title="Low Stock Alert" desc="Brake Pads (Front) is running low." time="10 min ago" unread={true} />
                <NotifItem icon={<Trophy size={16} className="text-amber-500"/>} title="GScore Increased" desc="You earned +15 points for hitting 100 sales!" time="2 hrs ago" unread={true} />
                <NotifItem icon={<Sparkles size={16} className="text-purple-500"/>} title="New AI Insights" desc="Check your dashboard for today's summary." time="Yesterday" unread={false} />
              </div>
            </div>
          </div>
        )}
        
        {isProfileOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-opacity">
            <div className="bg-white w-full sm:w-80 sm:rounded-3xl rounded-t-3xl max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex justify-between items-start">
                <div>
                  <div className="font-bold text-xl">Kristine</div>
                  <div className="text-sm text-blue-100 mt-1">moseszachfsabido@gmail.com</div>
                  <div className="mt-3 inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    <Trophy size={12} /> Pro Tier
                  </div>
                </div>
                <button onClick={() => setIsProfileOpen(false)} className="p-2 -mr-2 text-white/70 hover:text-white rounded-full bg-white/10">
                  <X size={20} />
                </button>
              </div>
              <div className="p-3">
                <ProfileMenuItem icon={<User size={18}/>} label="My Account" onClick={() => setIsProfileOpen(false)} />
                <ProfileMenuItem icon={<Settings size={18}/>} label="Business Settings" onClick={() => setIsProfileOpen(false)} />
                <ProfileMenuItem icon={<ShieldCheck size={18}/>} label="Privacy & Security" onClick={() => setIsProfileOpen(false)} />
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <ProfileMenuItem icon={<LogOut size={18}/>} label="Log Out" color="text-red-600 hover:bg-red-50" onClick={() => setIsProfileOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global AI Chatbot */}
      <AIChatbot onNavigate={setCurrentView} />
    </div>
  );
}

function NotifItem({ icon, title, desc, time, unread }: any) {
  return (
    <div className={`p-4 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer ${unread ? 'bg-blue-50/30' : ''}`}>
      <div className="mt-0.5 shrink-0 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-sm border border-gray-100">{icon}</div>
      <div>
        <div className={`text-sm ${unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{title}</div>
        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{desc}</div>
        <div className="text-[10px] text-gray-400 mt-1">{time}</div>
      </div>
    </div>
  )
}

function ProfileMenuItem({ icon, label, color = "text-gray-700 hover:bg-gray-100 hover:text-blue-600", onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${color}`}>
      {icon}
      {label}
    </button>
  )
}
