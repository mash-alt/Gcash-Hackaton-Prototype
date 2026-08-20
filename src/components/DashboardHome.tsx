import { Sparkles, PlusSquare, FileText, Package, List, Wallet, Trophy, TrendingUp, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

export function DashboardHome({ onNavigate }: { onNavigate: (view: any) => void }) {
  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Good morning, Boss! 👋</h1>
        <p className="text-gray-600 font-medium text-sm md:text-base">Here's what's happening with your business today.</p>
      </div>

      {/* AI Daily Insight - Human Friendly */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/10 mb-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="absolute right-10 bottom-10 text-white/5 pointer-events-none">
          <Sparkles size={160} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shrink-0 border border-white/20">
            <Sparkles size={32} className="text-white" />
          </div>
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-blue-100 border border-white/20">
                Daily AI Insight
              </span>
              <span className="text-blue-200 text-sm font-medium">Just now</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
              You're doing great! You made <span className="text-green-300">₱4,500</span> today.
            </h2>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed max-w-3xl">
              That's <strong>20% higher</strong> than your usual Tuesday! Your expenses are low, meaning you get to keep most of your earnings. Your best seller today was the <strong>Brake Pad (Front)</strong>. We suggest moving ₱1,000 to your GSave buffer to keep growing your safety net.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('gsave')}
            className="shrink-0 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2 mt-4 md:mt-0"
          >
            Save ₱1,000 Now <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Shortcuts */}
        <div className="xl:col-span-2 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ShortcutCard 
                icon={<PlusSquare size={24} />} 
                title="Record a Sale" 
                desc="Punch in a new customer order." 
                color="blue" 
                onClick={() => onNavigate('sale')} 
              />
              <ShortcutCard 
                icon={<Package size={24} />} 
                title="Restock & Expenses" 
                desc="Manage inventory & business costs." 
                color="purple" 
                onClick={() => onNavigate('purchases')} 
              />
              <ShortcutCard 
                icon={<List size={24} />} 
                title="View Records" 
                desc="See all past transactions in one place." 
                color="slate" 
                onClick={() => onNavigate('records')} 
              />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <Trophy size={32} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-gray-900 mb-1">Your GScore is thriving!</h3>
              <p className="text-sm text-gray-500">You're currently a Pro Tier member with 820 points.</p>
            </div>
            <button 
              onClick={() => onNavigate('rewards')}
              className="px-6 py-2.5 bg-amber-50 text-amber-600 font-bold rounded-xl hover:bg-amber-100 transition-colors shrink-0 whitespace-nowrap"
            >
              View Rewards
            </button>
          </div>
        </div>

        {/* Right Column: Today's Snapshot */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Today's Simple Snapshot</h3>
            
            <div className="space-y-6 flex-1">
              <SnapshotRow 
                label="Money In (Sales)" 
                amount="₱ 4,500.00" 
                color="text-green-600" 
                indicator="bg-green-100" 
                trend="Up 20%" 
              />
              <div className="w-full h-px bg-gray-100"></div>
              <SnapshotRow 
                label="Money Out (Expenses)" 
                amount="₱ 850.00" 
                color="text-red-500" 
                indicator="bg-red-100" 
                trend="Normal" 
              />
              <div className="w-full h-px bg-gray-100"></div>
              
              <div className="pt-2">
                <div className="text-sm text-gray-500 font-medium mb-1">What you get to keep (Net)</div>
                <div className="text-3xl font-black text-gray-900 mb-3">₱ 3,650.00</div>
                <div className="flex items-center gap-2 text-sm font-bold text-green-700 bg-green-50 px-3 py-2 rounded-xl">
                  <CheckCircle2 size={18} /> Great profit margin today!
                </div>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('records')}
              className="w-full mt-6 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              See Detailed History <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function ShortcutCard({ icon, title, desc, color, onClick }: any) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100',
    red: 'bg-red-50 text-red-600 hover:bg-red-100 border-red-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-100',
    slate: 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-100',
  };

  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 transition-all cursor-pointer bg-white hover:shadow-md group ${colorMap[color].split(' ').filter(c => c.startsWith('border-')).join(' ')}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${colorMap[color]}`}>
        {icon}
      </div>
      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-sm text-gray-500 font-medium">{desc}</p>
    </div>
  )
}

function SnapshotRow({ label, amount, color, indicator, trend }: any) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${indicator}`}></div>
        <div>
          <div className="text-sm font-bold text-gray-900">{label}</div>
          <div className="text-xs text-gray-500">{trend}</div>
        </div>
      </div>
      <div className={`font-bold ${color}`}>{amount}</div>
    </div>
  )
}
