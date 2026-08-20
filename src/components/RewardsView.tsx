import { Trophy, Star, Zap, ShieldCheck, TrendingUp, Target, Unlock, Lock, ChevronRight, Award, Gift } from 'lucide-react';

export function RewardsView() {
  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-500 text-white p-2 rounded-xl"><Trophy size={24} /></div>
            <h1 className="text-xl md:text-2xl font-bold text-amber-900 uppercase tracking-wide">GScore & Rewards</h1>
          </div>
          <p className="text-gray-600 font-medium text-sm md:text-base">Unlock business loans, lower fees, and earn milestone badges.</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 mb-8">
        {/* Left Column: GScore Hero & Milestones */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8 min-w-0">
          
          {/* GScore Hero Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden border border-slate-700/50">
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-amber-500/20 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <h2 className="text-gray-300 font-bold tracking-widest uppercase text-sm">Your GScore</h2>
                  <div className="bg-gradient-to-r from-amber-200 to-yellow-500 text-yellow-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-amber-500/20">
                    <Star size={12} className="fill-yellow-950" /> Pro Tier
                  </div>
                </div>
                
                <div className="flex items-baseline justify-center md:justify-start gap-2 mb-2">
                  <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-500 tracking-tighter drop-shadow-sm">
                    820
                  </span>
                  <span className="text-gray-500 font-bold text-xl">/ 1000</span>
                </div>
                <p className="text-indigo-200 text-sm md:text-base font-medium max-w-sm">
                  Excellent! Your consistent sales and inventory tracking have boosted your score.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-full md:w-64 shrink-0 shadow-xl">
                <div className="flex items-center gap-2 text-amber-300 mb-2">
                  <Zap size={18} className="fill-amber-300" />
                  <span className="font-bold text-sm uppercase tracking-wider">Unlocked Perk</span>
                </div>
                <div className="text-white font-bold mb-1">Business Loan</div>
                <div className="text-2xl font-black text-white mb-3">₱ 250,000</div>
                <button className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-yellow-950 font-bold py-2.5 rounded-xl transition-all shadow-md">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Milestone Tracker */}
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Milestone Badges</h2>
                <p className="text-gray-500 text-sm">Complete challenges to boost your GScore.</p>
              </div>
              <button className="text-sm font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-4 py-2 rounded-xl transition-colors">View All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BadgeCard 
                title="Century Club" 
                desc="Record 100 sales in a single week." 
                icon={<Target size={24} />} 
                color="amber" 
                progress={100} 
                unlocked={true} 
              />
              <BadgeCard 
                title="Loyal Saver" 
                desc="Deposit to GSave for 3 consecutive weeks." 
                icon={<ShieldCheck size={24} />} 
                color="blue" 
                progress={66} 
                unlocked={false} 
                current="2"
                target="3"
              />
              <BadgeCard 
                title="Inventory Master" 
                desc="Accept stock via AI suggestion 5 times." 
                icon={<Award size={24} />} 
                color="purple" 
                progress={20} 
                unlocked={false} 
                current="1"
                target="5"
              />
              <BadgeCard 
                title="Volume King" 
                desc="Hit ₱50k revenue in a single day." 
                icon={<TrendingUp size={24} />} 
                color="green" 
                progress={0} 
                unlocked={false} 
                current="₱12k"
                target="₱50k"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Perks & History */}
        <div className="w-full xl:w-96 shrink-0 flex flex-col gap-6 lg:gap-8">
          
          {/* Pro Tier Perks */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2rem] p-6 shadow-sm border border-amber-200/50">
            <h2 className="text-sm font-bold text-amber-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Star size={16} className="fill-amber-500 text-amber-500" /> Pro Tier Benefits
            </h2>
            <div className="space-y-4">
              <PerkItem 
                icon={<Zap size={18} className="text-amber-600" />} 
                title="Lower QR Fees" 
                desc="Your transaction fee is reduced to 1.0%." 
                active={true}
              />
              <PerkItem 
                icon={<ShieldCheck size={18} className="text-amber-600" />} 
                title="Instant Loan Approval" 
                desc="Skip the line for loans up to ₱250k." 
                active={true}
              />
              <PerkItem 
                icon={<Gift size={18} className="text-amber-600" />} 
                title="Monthly Cash Drop" 
                desc="Get ₱500 bonus on 1st of the month." 
                active={true}
              />
              <PerkItem 
                icon={<Lock size={18} className="text-gray-400" />} 
                title="Free POS Terminal" 
                desc="Unlock at Elite Tier (900+ GScore)." 
                active={false}
              />
            </div>
          </div>

          {/* Points History */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              <HistoryItem points="+15" title="Century Club Badge Unlocked" time="Today, 2:30 PM" type="badge" />
              <HistoryItem points="+2" title="Daily Sales Goal Met" time="Today, 2:25 PM" type="task" />
              <HistoryItem points="+1" title="Inventory Updated" time="Yesterday, 5:00 PM" type="task" />
              <HistoryItem points="+5" title="Weekly GSave Deposit" time="May 18, 10:00 AM" type="task" />
            </div>
            <button className="w-full mt-6 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors py-2 flex items-center justify-center gap-1">
              View All History <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function BadgeCard({ title, desc, icon, color, progress, unlocked, current, target }: any) {
  const isComplete = progress === 100 || unlocked;
  
  return (
    <div className={`p-5 rounded-2xl border-2 transition-all flex flex-col h-full ${
      isComplete 
        ? `border-${color}-200 bg-${color}-50 shadow-sm shadow-${color}-100/50` 
        : 'border-gray-100 bg-white opacity-80 hover:opacity-100'
    }`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
          isComplete ? `bg-${color}-500 text-white shadow-md shadow-${color}-500/30` : 'bg-gray-100 text-gray-400'
        }`}>
          {isComplete ? icon : <Lock size={20} />}
        </div>
        <div>
          <div className={`font-bold ${isComplete ? 'text-gray-900' : 'text-gray-500'}`}>{title}</div>
          <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</div>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center text-xs font-bold mb-2">
          <span className={isComplete ? `text-${color}-700` : 'text-gray-500'}>
            {isComplete ? 'UNLOCKED' : 'IN PROGRESS'}
          </span>
          {!isComplete && current && target && <span className="text-gray-400">{current} / {target}</span>}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isComplete ? `bg-${color}-500` : 'bg-gray-400'}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function PerkItem({ icon, title, desc, active }: any) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${active ? 'bg-white shadow-sm border border-amber-100' : 'opacity-60 grayscale'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-amber-100' : 'bg-gray-100'}`}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-sm text-gray-900">{title}</div>
        <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
      </div>
    </div>
  )
}

function HistoryItem({ points, title, time, type }: any) {
  const isBadge = type === 'badge';
  return (
    <div className="relative flex items-center gap-4 py-3 z-10 bg-white">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm ${isBadge ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
        {isBadge ? <Trophy size={16} /> : <Zap size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-gray-900 truncate">{title}</div>
        <div className="text-xs text-gray-400">{time}</div>
      </div>
      <div className="font-black text-amber-500 shrink-0">{points}</div>
    </div>
  )
}
