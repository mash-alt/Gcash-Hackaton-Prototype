import { Wallet, TrendingUp, ShieldCheck, Target, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Now', value: 10500, label: 'Now\n₱10,500' },
  { name: '1 Month', value: 12500, label: '1 Month\n₱12,500' },
  { name: '3 Months', value: 16500, label: '3 Months\n₱16,500' },
  { name: '6 Months', value: 22500, label: '6 Months\n₱22,500' },
];

export function GSaveView() {
  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900">GSave / Buffer Wallet</h1>
        <p className="text-gray-500 mt-1">Save part of your sales for emergencies and future business needs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard icon={<Wallet className="text-white" size={24} />} iconBg="bg-blue-600" title="Current Buffer Wallet" amount="₱10,500.00" />
        <StatCard icon={<TrendingUp className="text-white" size={24} />} iconBg="bg-green-500" title="Saved This Month" amount="₱2,000.00" />
        <StatCard icon={<TrendingUp className="text-white" size={24} />} iconBg="bg-blue-500" title="Forecasted Savings (6 months)" amount="₱22,500.00" />
        <StatCard icon={<Target className="text-white" size={24} />} iconBg="bg-orange-400" title="Recommended Next Save" amount="₱2,000.00" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
        <div className="flex-1 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 relative min-w-0">
          <h2 className="font-bold text-blue-900 mb-6">Savings Forecast</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Forecast']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fill="url(#colorValue)" 
                  activeDot={{ r: 8, fill: '#2563eb', stroke: 'white', strokeWidth: 2 }}
                  dot={{ r: 6, fill: '#2563eb', stroke: 'white', strokeWidth: 2 }}
                  label={<CustomLabel />}
                />
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 md:absolute md:bottom-6 md:left-6 flex items-center gap-2 text-xs text-gray-500">
            <Info size={14} className="shrink-0" /> <span className="truncate">Forecast based on your current saving pattern. Estimate only.</span>
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="font-bold text-blue-900 mb-6">AI Recommendations</h2>
          <div className="space-y-6 flex-1">
            <RecommendationItem icon={<Wallet className="text-white" size={16} />} iconBg="bg-green-500" text="You can set aside ₱2,000 this week based on your recent sales." />
            <RecommendationItem icon={<TrendingUp className="text-white" size={16} />} iconBg="bg-blue-600" text="If you continue saving ₱2,000 each month, your buffer may reach ₱22,500 in 6 months." />
            <RecommendationItem icon={<ShieldCheck className="text-white" size={16} />} iconBg="bg-orange-400" text="Keep at least ₱10,000 in your Buffer Wallet for emergency restocking." />
            <RecommendationItem icon={<Target className="text-white" size={16} />} iconBg="bg-purple-500" text="Your sales were stronger this week, so this is a good time to save." />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
          <h2 className="font-bold text-blue-900 mb-6">Move Money to GSave</h2>
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Available Balance</div>
              <div className="text-xl font-bold text-gray-900">₱8,000.00</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Suggested Save</div>
              <div className="text-xl font-bold text-gray-900">₱2,000.00</div>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Move ₱2,000 to GSave
            </button>
            <button className="w-full bg-white text-blue-600 border border-blue-200 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Choose Another Amount
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-blue-900 mb-6">Savings Goal</h2>
          <div className="mb-4">
            <div className="text-sm font-bold text-gray-700 mb-2">Emergency Restock Fund</div>
            <div className="text-2xl font-bold text-blue-900"><span className="text-purple-600">₱10,500</span> <span className="text-base text-gray-500 font-medium">of ₱20,000 saved</span></div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full mb-3 overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full w-[53%]"></div>
          </div>
          <div className="text-sm text-gray-500">53% of goal reached</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2 lg:col-span-1">
          <h2 className="font-bold text-blue-900 mb-6">Recent Saves</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            <RecentSave date="May 20" amount="₱2,000.00" />
            <RecentSave date="May 13" amount="₱1,500.00" />
            <RecentSave date="May 06" amount="₱1,000.00" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
        <h2 className="text-sm font-bold text-blue-900 tracking-wider mb-6">WHY THIS HELPS YOU</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
           <HelpSection icon={<ShieldCheck size={24} className="text-white" />} iconBg="bg-blue-600" title="Build an emergency fund" desc="Be ready for unexpected expenses or stock needs." />
           <HelpSection icon={<TrendingUp size={24} className="text-white" />} iconBg="bg-green-500" title="See how your savings may grow" desc="Track your progress with a simple forecast you can understand." />
           <HelpSection icon={<Target size={24} className="text-white" />} iconBg="bg-orange-400" title="Get simple suggestions on what to save next" desc="Easy tips based on your recent sales." />
        </div>
      </div>
    </div>
  );
}

const CustomLabel = (props: any) => {
  const { x, y, value, index } = props;
  const dataPoints = ['Now\n₱10,500', '1 Month\n₱12,500', '3 Months\n₱16,500', '6 Months\n₱22,500'];
  return (
    <text x={x} y={y - 15} fill="#111827" fontSize={12} fontWeight={600} textAnchor="middle">
      {dataPoints[index].split('\n').map((line, i) => (
        <tspan x={x} dy={i === 0 ? 0 : 16} key={i}>{line}</tspan>
      ))}
    </text>
  );
};


function StatCard({ icon, iconBg, title, amount }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-bold text-gray-900">{amount}</div>
      </div>
    </div>
  )
}

function RecommendationItem({ icon, iconBg, text }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center shrink-0 mt-0.5`}>
        {icon}
      </div>
      <div className="text-sm text-gray-700 leading-relaxed font-medium">
        {text}
      </div>
    </div>
  )
}

function RecentSave({ date, amount }: { date: string, amount: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500" size={20} />
        <div>
          <div className="font-bold text-gray-900 text-sm">{date}</div>
          <div className="text-xs text-gray-500">Saved</div>
        </div>
      </div>
      <div className="font-semibold text-gray-900">{amount}</div>
    </div>
  )
}

function HelpSection({ icon, iconBg, title, desc }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-gray-900 mb-1 text-sm">{title}</div>
        <div className="text-sm text-gray-500 leading-relaxed">{desc}</div>
      </div>
    </div>
  )
}
