import React, { useState } from 'react';
import { Sparkles, Package, AlertTriangle, TrendingUp, TrendingDown, ArrowDownToLine, Search, Filter, Plus, CheckCircle2, X } from 'lucide-react';

type Velocity = 'fast' | 'normal' | 'slow';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  soldToday: number;
  velocity: Velocity;
  suggestedRestock: number;
  reorderPoint: number;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Brake Pad (Front)', category: 'Parts', stock: 2, soldToday: 4, velocity: 'fast', suggestedRestock: 20, reorderPoint: 5 },
  { id: '2', name: 'Oil Filter', category: 'Parts', stock: 5, soldToday: 2, velocity: 'fast', suggestedRestock: 15, reorderPoint: 10 },
  { id: '3', name: 'Spark Plug (NGK)', category: 'Parts', stock: 40, soldToday: 1, velocity: 'normal', suggestedRestock: 0, reorderPoint: 15 },
  { id: '4', name: 'Motorcycle Chain', category: 'Parts', stock: 10, soldToday: 0, velocity: 'slow', suggestedRestock: 0, reorderPoint: 5 },
  { id: '5', name: 'Honda Beat Drive Belt', category: 'Parts', stock: 15, soldToday: 0, velocity: 'normal', suggestedRestock: 0, reorderPoint: 5 },
  { id: '6', name: 'Motor Oil (1L)', category: 'Oils & Fluids', stock: 24, soldToday: 6, velocity: 'fast', suggestedRestock: 0, reorderPoint: 10 },
  { id: '7', name: 'Helmet Visor', category: 'Accessories', stock: 8, soldToday: 0, velocity: 'slow', suggestedRestock: 5, reorderPoint: 5 },
];

export function InventoryView() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [restockQty, setRestockQty] = useState<number | ''>('');

  const lowStockCount = items.filter(i => i.stock <= i.reorderPoint).length;
  const fastMovingCount = items.filter(i => i.velocity === 'fast').length;
  const toRestockCount = items.filter(i => i.suggestedRestock > 0).length;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    if (filter === 'Low Stock') return matchesSearch && item.stock <= item.reorderPoint;
    if (filter === 'Fast Moving') return matchesSearch && item.velocity === 'fast';
    if (filter === 'To Restock') return matchesSearch && item.suggestedRestock > 0;
    return matchesSearch;
  });

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem && typeof restockQty === 'number' && restockQty > 0) {
      setItems(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, stock: item.stock + restockQty, suggestedRestock: Math.max(0, item.suggestedRestock - restockQty) }
          : item
      ));
      setSelectedItem(null);
      setRestockQty('');
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-purple-600 text-white p-2 rounded-xl"><Package size={24} /></div>
            <h1 className="text-xl md:text-2xl font-bold text-purple-900 uppercase tracking-wide">Inventory & Restock</h1>
          </div>
          <p className="text-gray-600 font-medium text-sm md:text-base">Manage end-of-day stock and accept deliveries.</p>
        </div>
      </div>

      {/* AI Business Assistant Tip */}
      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200 p-5 md:p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 md:gap-5 shadow-sm relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-purple-200/50">
          <Sparkles size={120} />
        </div>
        <div className="bg-purple-100 text-purple-600 p-3 rounded-full shrink-0 h-min w-min relative z-10">
          <Sparkles size={24} />
        </div>
        <div className="relative z-10">
          <h3 className="font-bold text-purple-900 mb-1 text-sm md:text-base uppercase tracking-wider">AI Inventory Insights</h3>
          <p className="text-purple-800 text-sm md:text-base leading-relaxed max-w-4xl">
            <strong>Friendly tip:</strong> Your <span className="font-bold">Brake Pads</span> and <span className="font-bold">Oil Filters</span> are selling <strong>3x faster</strong> this week. We've updated your restock suggestions based on recent sales velocity. Consider restocking <strong>20 Brake Pads</strong> today to avoid stockouts before the weekend!
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard icon={<AlertTriangle className="text-white" size={24} />} iconBg="bg-red-500" title="Low Stock Items" amount={lowStockCount} subtext="Needs attention" amountColor="text-red-600" />
        <StatCard icon={<TrendingUp className="text-white" size={24} />} iconBg="bg-purple-500" title="Fast Moving" amount={fastMovingCount} subtext="High sales velocity" />
        <StatCard icon={<Package className="text-white" size={24} />} iconBg="bg-blue-500" title="Total Products" amount={items.length} subtext="Active catalog" />
        <StatCard icon={<ArrowDownToLine className="text-white" size={24} />} iconBg="bg-orange-500" title="To Restock" amount={toRestockCount} subtext="Suggested by AI" amountColor="text-orange-600" />
      </div>

      {/* Main Inventory Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden flex flex-col">
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search catalog..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all"
              />
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto scrollbar-hide">
              {['All', 'Low Stock', 'Fast Moving', 'To Restock'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${filter === f ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-sm shadow-purple-200 shrink-0 text-sm md:text-base">
            <Plus size={18} /> Add New Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px] w-full">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <div className="col-span-4">Item & Category</div>
              <div className="col-span-2 text-center">Status / Velocity</div>
              <div className="col-span-2 text-center">Sold Today</div>
              <div className="col-span-2 text-center">Current Stock</div>
              <div className="col-span-2 text-right">Action</div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredItems.map(item => {
                const isLowStock = item.stock <= item.reorderPoint;
                return (
                  <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-purple-50/30 transition-colors group">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <Package size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 truncate">{item.name}</div>
                        <div className="text-xs text-gray-500 truncate">{item.category}</div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 flex flex-col items-center justify-center gap-1">
                      {item.velocity === 'fast' && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 uppercase"><TrendingUp size={12} /> Fast Moving</span>}
                      {item.velocity === 'slow' && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 uppercase"><TrendingDown size={12} /> Slow Moving</span>}
                      {item.velocity === 'normal' && <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">Stable</span>}
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="font-bold text-gray-700">{item.soldToday}</div>
                      <div className="text-[10px] text-gray-400 font-medium">auto-deducted</div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className={`font-black text-lg ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>{item.stock}</div>
                      {isLowStock && <div className="text-[10px] font-bold text-red-600 uppercase">Low Stock</div>}
                    </div>

                    <div className="col-span-2 flex flex-col items-end gap-2">
                      <button 
                        onClick={() => setSelectedItem(item)}
                        className={`text-sm font-bold px-4 py-1.5 rounded-lg border-2 transition-all w-full text-center ${
                          item.suggestedRestock > 0 
                            ? 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100' 
                            : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50'
                        }`}
                      >
                        Accept Stock
                      </button>
                      {item.suggestedRestock > 0 && (
                        <div className="text-[10px] font-bold text-orange-600 flex items-center gap-1">
                          <Sparkles size={10} /> AI suggests: +{item.suggestedRestock}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              {filteredItems.length === 0 && (
                <div className="p-8 text-center text-gray-500 font-medium">
                  No items match your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Restock Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-purple-50/50">
              <h2 className="text-xl font-bold text-purple-900">Accept Inventory</h2>
              <button onClick={() => { setSelectedItem(null); setRestockQty(''); }} className="text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleRestockSubmit} className="p-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-purple-600">
                  <Package size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{selectedItem.name}</div>
                  <div className="text-sm text-gray-500">Current Stock: <span className="font-bold text-gray-700">{selectedItem.stock}</span></div>
                </div>
              </div>

              {selectedItem.suggestedRestock > 0 && (
                <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-start gap-3">
                  <Sparkles className="text-orange-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <div className="text-sm font-bold text-orange-900 mb-0.5">Sales-based Suggestion</div>
                    <div className="text-xs text-orange-800">Based on recent fast sales, we suggest accepting at least <strong>{selectedItem.suggestedRestock} units</strong>.</div>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">Quantity Received</label>
                <div className="relative">
                  <ArrowDownToLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="number" 
                    min="1"
                    autoFocus
                    required
                    value={restockQty}
                    onChange={(e) => setRestockQty(parseInt(e.target.value) || '')}
                    placeholder="Enter quantity"
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 font-bold text-lg text-gray-900 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => { setSelectedItem(null); setRestockQty(''); }} className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={!restockQty} className={`flex-1 py-3.5 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${restockQty ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md' : 'bg-purple-100 text-purple-400 cursor-not-allowed'}`}>
                  <CheckCircle2 size={20} /> Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, iconBg, title, amount, subtext, amountColor = "text-gray-900" }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-500 font-medium mb-1">{title}</div>
        <div className={`text-2xl font-bold ${amountColor} mb-1`}>{amount}</div>
        <div className="text-xs text-gray-400 font-medium">{subtext}</div>
      </div>
    </div>
  )
}
