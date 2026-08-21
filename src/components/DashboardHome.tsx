import { Search, Bell, HeadphonesIcon, QrCode, Calendar, Truck, FileText, ClipboardList, Wallet, Package, ChevronRight, Sparkles, PlusSquare, List, Trophy } from 'lucide-react';
import gcashLogo from '../../assets/gcash-logo-png_seeklogo-522261.png';

export function DashboardHome({ onNavigate }: { onNavigate: (view: any) => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-8 animate-in fade-in duration-300">
      {/* Mobile GCash Header / Desktop Banner */}
      <div className="bg-blue-600 px-4 pt-4 pb-20 lg:rounded-b-[2rem] lg:pb-16 relative overflow-hidden">
        {/* Subtle background pattern/gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 rounded-full blur-[50px] pointer-events-none"></div>

        {/* Top Bar (Mobile Only, or Desktop unified) */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm p-1.5">
              <img 
                src={gcashLogo} 
                alt="GCash logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <span className="font-semibold tracking-wide">GCash for Business</span>
          </div>
          <div className="flex items-center gap-5 text-white">
            <HeadphonesIcon size={22} className="opacity-90 hover:opacity-100 cursor-pointer transition-opacity" />
            <div className="relative cursor-pointer">
              <Bell size={22} className="opacity-90 hover:opacity-100 transition-opacity" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold border border-blue-600">3</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2 max-w-2xl mx-auto lg:mx-0 z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Business" 
            className="w-full pl-11 pr-12 py-3 bg-white rounded-xl text-sm font-medium outline-none text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-400 transition-shadow"
          />
          <QrCode className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" size={20} />
        </div>
      </div>

      {/* Overlapping Balance Card */}
      <div className="px-4 -mt-10 relative z-20 max-w-2xl mx-auto lg:max-w-none lg:mx-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex justify-between items-center relative overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-50/80 to-transparent -z-10 skew-x-12 transform origin-bottom"></div>
          <div>
            <div className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Kristine's Business</div>
            <div className="text-2xl lg:text-3xl font-black text-gray-900">₱ 4,500.00</div>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center relative z-10 shadow-sm border border-blue-100 group-hover:scale-105 transition-transform">
               <Wallet className="text-blue-600" size={30} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid (Today & Business) */}
      <div className="px-4 mt-8 max-w-2xl mx-auto lg:max-w-none lg:mx-8">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-900 text-lg">Today & Business</h3>
          <button className="text-sm text-blue-600 font-bold flex items-center hover:text-blue-800 transition-colors">See All <ChevronRight size={16} /></button>
        </div>
        
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-y-6 gap-x-2">
          <GridAction icon={<PlusSquare size={22} />} label="Record Sale" onClick={() => onNavigate('sale')} />
          <GridAction icon={<Package size={22} />} label="Restock" onClick={() => onNavigate('purchases')} />
          <GridAction icon={<List size={22} />} label="Records" onClick={() => onNavigate('records')} />
          <GridAction icon={<Wallet size={22} />} label="GSave" onClick={() => onNavigate('gsave')} />
          <GridAction icon={<Trophy size={22} />} label="Rewards" onClick={() => onNavigate('rewards')} />
          <GridAction icon={<Calendar size={22} />} label="Statement" onClick={() => {}} />
          <GridAction icon={<Truck size={22} />} label="Deliveries" onClick={() => {}} />
          <GridAction icon={<ClipboardList size={22} />} label="Reports" onClick={() => {}} />
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="px-4 mt-8 max-w-2xl mx-auto lg:max-w-none lg:mx-8 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Recent Transactions</h3>
          <button className="text-sm text-blue-600 font-bold flex items-center hover:text-blue-800 transition-colors">See All <ChevronRight size={16} /></button>
        </div>
        
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
          <ListItem 
            icon={<PlusSquare className="text-green-600" size={20} />} 
            iconBg="bg-green-100"
            title="Record a Sale"
            subtitle="Walk-in Customer"
            amount="+ ₱ 250.00"
            amountColor="text-green-600"
            onClick={() => onNavigate('sale')}
          />
          <div className="h-px w-full bg-gray-50 ml-[60px] max-w-[calc(100%-60px)]"></div>
          <ListItem 
            icon={<Package className="text-blue-600" size={20} />} 
            iconBg="bg-blue-100"
            title="Restock Inventory"
            subtitle="Brake Pads (Front)"
            amount="- ₱ 1,250.00"
            amountColor="text-gray-900"
            onClick={() => onNavigate('purchases')}
          />
          <div className="h-px w-full bg-gray-50 ml-[60px] max-w-[calc(100%-60px)]"></div>
          <ListItem 
            icon={<Wallet className="text-indigo-600" size={20} />} 
            iconBg="bg-indigo-100"
            title="GSave Deposit"
            subtitle="Buffer Savings"
            amount="- ₱ 500.00"
            amountColor="text-gray-900"
            onClick={() => onNavigate('gsave')}
          />
        </div>
      </div>
      
      {/* AI Insight */}
      <div className="px-4 mt-6 max-w-2xl mx-auto lg:max-w-none lg:mx-8 pb-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 shadow-md relative overflow-hidden flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate('purchases')}>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-white/20 transition-colors"></div>
          <div className="bg-white/20 p-3 rounded-2xl shrink-0 backdrop-blur-md border border-white/20">
            <Sparkles className="text-white" size={24} />
          </div>
          <div className="flex-1 text-white z-10">
            <h4 className="font-bold text-sm mb-0.5 flex items-center gap-2">Daily AI Insight <span className="bg-white/20 text-[9px] uppercase px-2 py-0.5 rounded-full font-black tracking-widest">New</span></h4>
            <p className="text-xs text-blue-100 leading-relaxed line-clamp-2">You made ₱4,500 today. Brake Pads are selling fast! Consider restocking soon.</p>
          </div>
          <button className="shrink-0 text-white z-10 p-2">
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}

function GridAction({ icon, label, onClick }: any) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform">
      <div className="w-[52px] h-[52px] rounded-2xl bg-blue-50/60 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] border border-blue-100/30">
        {icon}
      </div>
      <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight tracking-tight">{label}</span>
    </div>
  )
}

function ListItem({ icon, iconBg, title, subtitle, amount, amountColor, onClick }: any) {
  return (
    <div onClick={onClick} className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-gray-50 transition-colors rounded-2xl active:scale-[0.98] transform duration-200">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm mb-0.5">{title}</div>
          <div className="text-xs text-gray-500 font-medium">{subtitle}</div>
        </div>
      </div>
      <div className={`font-bold text-sm ${amountColor}`}>
        {amount}
      </div>
    </div>
  )
}
