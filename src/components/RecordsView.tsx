import { ShoppingCart, LayoutList, Search, ChevronRight, Edit2, Download, ArrowUpRight, ArrowDownRight, FileText, CheckCircle2, Info } from 'lucide-react';
import { ReactNode } from 'react';

export function RecordsView() {
  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">VIEW RECORDS <span className="text-blue-600 block md:inline text-lg md:text-2xl mt-1 md:mt-0">(Simple Overview)</span></h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">See all your sales and expenses in one place.</p>
        </div>
        <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg flex items-start gap-3 w-full md:max-w-sm border border-blue-100">
          <InfoIcon className="shrink-0 mt-0.5 text-blue-600" />
          <p className="text-sm"><strong>All recorded sales and expenses appear here.</strong> Use filters to view only what you need.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard icon={<ShoppingCart className="text-white" size={24} />} iconBg="bg-green-500" title="Today's Sales" amount="₱ 2,510.00" subtext="3 transactions" />
        <StatCard icon={<LayoutList className="text-white" size={24} />} iconBg="bg-blue-500" title="Today's Expenses" amount="₱ 5,500.00" subtext="2 transactions" />
        <StatCard icon={<ArrowUpRight className="text-white" size={24} />} iconBg="bg-red-500" title="Net Today" amount="-₱ 2,990.00" subtext="Expenses higher" amountColor="text-red-500" />
        <StatCard icon={<FileText className="text-white" size={24} />} iconBg="bg-purple-500" title="Total Records" amount="126" subtext="All time" amountSize="text-3xl" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full xl:w-auto">
                <div className="w-full sm:w-auto">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Record Type</div>
                  <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto scrollbar-hide">
                    <FilterButton active>All</FilterButton>
                    <FilterButton>Sales</FilterButton>
                    <FilterButton>Expenses</FilterButton>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Time</div>
                  <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto scrollbar-hide">
                    <FilterButton active>Today</FilterButton>
                    <FilterButton>This Week</FilterButton>
                    <FilterButton>This Month</FilterButton>
                  </div>
                </div>
              </div>
              <div className="relative w-full xl:w-72 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search item, supplier, or amount" 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">Today – May 20, 2024</h3>
                <div className="space-y-2">
                  <RecordRow type="sale" item="Brake Pad (Front)" method="Cash" amount="₱ 2,200.00" time="10:30 AM" />
                  <RecordRow type="sale" item="Oil Filter" method="GCash / QR" amount="₱ 190.00" time="11:05 AM" />
                  <RecordRow type="sale" item="Spark Plug (NGK)" method="Card" amount="₱ 120.00" time="1:15 PM" />
                  <RecordRow type="expense" item="Inventory Purchase" detail="ABC Motor Parts Trading" amount="₱ 4,300.00" time="2:00 PM" />
                  <RecordRow type="expense" item="Utilities" detail="Electric Bill" amount="₱ 1,200.00" time="4:10 PM" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">Yesterday – May 19, 2024</h3>
                <div className="space-y-2">
                  <RecordRow type="sale" item="Motor Oil (1L)" method="Cash" amount="₱ 350.00" time="9:20 AM" />
                  <RecordRow type="expense" item="Inventory Purchase" detail="XYZ Auto Supply" amount="₱ 6,200.00" time="3:30 PM" />
                  <RecordRow type="sale" item="Brake Shoe Set" method="GCash / QR" amount="₱ 1,800.00" time="6:45 PM" />
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="text-blue-600 font-semibold text-sm px-6 py-2 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                Load More Records <ChevronRight size={16} className="rotate-90" />
              </button>
            </div>
          </div>
          <div className="flex items-start md:items-center gap-2 justify-center text-sm text-green-700 bg-green-50 p-3 md:py-3 rounded-xl">
             <CheckCircle2 size={16} className="shrink-0 mt-0.5 md:mt-0" /> <span className="flex-1 text-left md:text-center">Your records are safe and secure with GCash for Business.</span>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-blue-900 tracking-widest mb-4 uppercase">Why this helps you</h3>
            <div className="space-y-4">
              <HelpItem icon={<CheckCircle2 className="text-green-500" size={20} />} title="One place for all records" desc="Sales and expenses are together." />
              <HelpItem icon={<Search className="text-blue-500" size={20} />} title="Easy to find past transactions" desc="Use filters and search to save time." />
              <HelpItem icon={<LayoutList className="text-yellow-500" size={20} />} title="Less manual tracking" desc="Everything is recorded and organized." />
              <HelpItem icon={<FileText className="text-purple-500" size={20} />} title="Clear daily history" desc="See what happened each day." />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-gray-700 tracking-wider uppercase">Record Details</h3>
              <button className="text-gray-400 hover:text-gray-600"><Search size={18} /></button>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                <ShoppingCart size={24} />
              </div>
              <div>
                <div className="font-bold text-gray-900">Brake Pad (Front)</div>
                <div className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-md inline-block mt-1">Sale</div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Type</span><span className="font-medium text-gray-900">Sale</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Item</span><span className="font-medium text-gray-900">Brake Pad (Front)</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Payment Method</span><span className="font-medium text-gray-900">Cash</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Amount</span><span className="font-bold text-gray-900">₱ 2,200.00</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Date & Time</span><span className="font-medium text-gray-900 text-right">May 20, 2024 • 10:30 AM</span></div>
              <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Note</span><span className="font-medium text-gray-900">-</span></div>
              <div className="flex justify-between items-center pt-1"><span className="text-gray-500">Status</span><span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">Recorded</span></div>
            </div>

            <button className="w-full mt-6 py-2.5 border border-blue-600 text-blue-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
              <Edit2 size={16} /> Edit Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, iconBg, title, amount, subtext, amountColor = "text-gray-900", amountSize = "text-2xl" }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500 font-medium mb-1">{title}</div>
        <div className={`${amountSize} font-bold ${amountColor} mb-1`}>{amount}</div>
        <div className="text-xs text-gray-400 font-medium">{subtext}</div>
      </div>
    </div>
  )
}

function FilterButton({ active, children }: { active?: boolean, children: ReactNode }) {
  return (
    <button className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${active ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
      {children}
    </button>
  )
}

function RecordRow({ type, item, method, detail, amount, time }: any) {
  const isSale = type === 'sale';
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100 group cursor-pointer items-start md:items-center">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSale ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
          {isSale ? <ShoppingCart size={20} /> : <LayoutList size={20} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-gray-900 truncate">{item}</div>
          <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase inline-block mt-1 ${isSale ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {type}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-gray-600 text-sm pl-14 md:pl-0">
        {method && (
          <>
            <span className="p-1.5 bg-gray-100 rounded-md shrink-0"><CreditCardIcon /></span> <span className="truncate">{method}</span>
          </>
        )}
        {detail && <span className="truncate">{detail}</span>}
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 pl-14 md:pl-0">
        <div className="text-sm text-gray-500">{time}</div>
        <div className="font-bold text-gray-900">{amount}</div>
        <ChevronRight className="text-gray-300 group-hover:text-gray-500 transition-colors hidden md:block shrink-0" size={20} />
      </div>
    </div>
  )
}

function HelpItem({ icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-blue-100/50">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <div className="font-semibold text-sm text-gray-900">{title}</div>
        <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
      </div>
    </div>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return <Info className={className} size={20} />
}

function CreditCardIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
}
