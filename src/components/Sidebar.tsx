import { Home, PlusSquare, FileText, Package, List, Wallet, Trophy, X } from 'lucide-react';

export type ViewType = 'home' | 'sale' | 'expense' | 'inventory' | 'records' | 'gsave' | 'rewards';

export interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onClose?: () => void;
}

export function Sidebar({ currentView, onViewChange, onClose }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', sublabel: 'Go to overview' },
    { id: 'sale', icon: PlusSquare, label: 'Record a Sale', sublabel: 'Record your sales' },
    { id: 'expense', icon: FileText, label: 'Record an Expense', sublabel: 'Track your spending' },
    { id: 'inventory', icon: Package, label: 'Inventory & Restock', sublabel: 'Manage items & stock' },
    { id: 'records', icon: List, label: 'Records', sublabel: 'View all your records' },
    { id: 'gsave', icon: Wallet, label: 'GSave / Buffer Wallet', sublabel: 'Save & grow your funds' },
    { id: 'rewards', icon: Trophy, label: 'GScore & Rewards', sublabel: 'Score, loans & milestones' },
  ];

  return (
    <div className="w-72 bg-blue-700 text-white flex flex-col h-full shrink-0 shadow-xl relative">
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 lg:hidden text-blue-200 hover:text-white transition-colors">
          <X size={24} />
        </button>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-blue-700">G</div>
          <span className="text-xl font-bold tracking-tight">GCash</span>
        </div>
        <div className="text-xs text-blue-200 tracking-wider font-semibold">FOR BUSINESS</div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold leading-tight">Simple. Complete.</h2>
          <p className="text-sm text-blue-200 mt-1">Built for your business.</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 bg-white rounded-tr-[2.5rem] rounded-br-[2.5rem] overflow-hidden shadow-inner pt-6">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-start gap-4 px-6 py-4 text-left transition-colors ${
                isActive ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'hover:bg-gray-50 border-l-4 border-transparent'
              }`}
            >
              <div className={`mt-0.5 p-2 rounded-xl transition-colors ${isActive ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : 'text-gray-400 bg-gray-50'}`}>
                <item.icon size={20} />
              </div>
              <div>
                <div className={`font-semibold ${isActive ? 'text-blue-900' : 'text-gray-700'}`}>{item.label}</div>
                <div className={`text-[11px] mt-0.5 font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>{item.sublabel}</div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
