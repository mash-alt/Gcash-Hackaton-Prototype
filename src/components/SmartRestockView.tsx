import { useState } from 'react';
import { Package, Sparkles, Search, Plus, DollarSign, BrainCircuit, CheckCircle2, Zap, ArrowDownToLine, Receipt, X } from 'lucide-react';

type Product = { id: number; name: string; price: number; stock: number; category: string; };

const INITIAL_INVENTORY: Product[] = [
  { id: 1, name: 'Brake Pad (Front)', price: 250, stock: 4, category: 'Parts' },
  { id: 2, name: 'Oil Filter', price: 150, stock: 36, category: 'Parts' },
  { id: 3, name: 'Spark Plug (NGK)', price: 120, stock: 40, category: 'Parts' },
  { id: 4, name: 'Motorcycle Chain', price: 600, stock: 10, category: 'Parts' },
  { id: 6, name: 'Motor Oil (1L)', price: 250, stock: 24, category: 'Oils & Fluids' },
  { id: 7, name: 'Helmet Visor', price: 450, stock: 8, category: 'Accessories' },
];

export function SmartRestockView() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'expenses'>('inventory');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiRestockComplete, setAiRestockComplete] = useState(false);

  // Inventory state
  const [inventory, setInventory] = useState<Product[]>(INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [manualRestockItem, setManualRestockItem] = useState<Product | null>(null);
  const [restockQty, setRestockQty] = useState('');
  const [restockCost, setRestockCost] = useState('');
  const [restockSupplier, setRestockSupplier] = useState('');
  const [restockPaymentMethod, setRestockPaymentMethod] = useState<'cash' | 'gcash' | 'card'>('cash');

  // Expense state
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expensePaymentMethod, setExpensePaymentMethod] = useState<'cash' | 'gcash' | 'card'>('cash');
  const [expenseSuccess, setExpenseSuccess] = useState(false);

  const categories = ['All', 'Parts', 'Oils & Fluids', 'Accessories'];
  const expenseCategories = ['Utilities', 'Rent', 'Salary', 'Marketing', 'Supplies', 'Other'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleManualRestock = () => {
    if (!manualRestockItem || !restockQty || !restockCost) return;
    const qty = parseInt(restockQty);
    if (qty > 0) {
      setInventory(prev => prev.map(p => p.id === manualRestockItem.id ? { ...p, stock: p.stock + qty } : p));
      setManualRestockItem(null);
      setRestockQty('');
      setRestockCost('');
      setRestockSupplier('');
      setRestockPaymentMethod('cash');
    }
  };

  const handleAiRestock = () => {
    setShowAiModal(false);
    setAiRestockComplete(true);
    setInventory(prev => prev.map(p => p.id === 1 ? { ...p, stock: p.stock + 20 } : p));
  };

  const handleRecordExpense = () => {
    if (expenseAmount && expenseCategory) {
      setExpenseSuccess(true);
      setTimeout(() => {
        setExpenseSuccess(false);
        setExpenseAmount('');
        setExpenseCategory('');
        setExpenseDesc('');
        setExpensePaymentMethod('cash');
      }, 3000);
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Restock & Expenses</h1>
        <p className="text-gray-600 font-medium">Manage your inventory restocking and log business expenses in one place.</p>
      </div>

      {/* AI Smart Insight Banner */}
      {!aiRestockComplete ? (
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-200 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-600"></div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-purple-50 rounded-full blur-[80px] -z-10 group-hover:bg-purple-100 transition-colors duration-700"></div>
          
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-purple-200 shadow-inner">
              <BrainCircuit className="text-purple-600" size={28} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} /> Smart Restock Recommendation
                </span>
                <span className="text-gray-400 text-xs font-semibold">Updated just now</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">High Demand Alert: Brake Pads (Front)</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl">
                Brake Pads are selling <strong>40% faster</strong> than last month. You only have {inventory.find(i => i.id === 1)?.stock || 4} units left. We recommend restocking <strong className="text-purple-700">20 units for ₱2,500</strong> today to avoid losing potential sales this weekend.
              </p>
            </div>
            <button 
              onClick={() => setShowAiModal(true)}
              className="shrink-0 bg-gray-900 text-white hover:bg-gray-800 px-6 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 w-full lg:w-auto justify-center group-hover:scale-105 duration-300"
            >
              <Zap size={18} className="text-yellow-400 fill-yellow-400" />
              1-Click Restock
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 rounded-3xl p-6 shadow-sm border border-green-200 mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="font-bold text-green-900">Restock Successful & Expense Recorded</h3>
            <p className="text-green-700 text-sm mt-1">20x Brake Pads (Front) added to inventory. ₱2,500 expense recorded to ledger.</p>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden flex flex-col">
        {/* Unified Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 p-2 gap-2">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-3 px-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'inventory' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            <Package size={18} /> Manage Inventory
          </button>
          <button 
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 py-3 px-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'expenses' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            <Receipt size={18} /> Other Expenses
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'inventory' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search stock..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-medium outline-none"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-bold">Product</th>
                      <th className="pb-3 font-bold text-right">In Stock</th>
                      <th className="pb-3 font-bold text-right">Status</th>
                      <th className="pb-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredInventory.map(item => (
                      <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-bold text-gray-900 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                            {item.category === 'Oils & Fluids' ? '🛢️' : item.category === 'Accessories' ? '🏍️' : '📦'}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate">{item.name}</div>
                            <div className="text-xs text-gray-400 font-medium">{item.category}</div>
                          </div>
                        </td>
                        <td className="py-4 font-bold text-gray-900 text-right">{item.stock}</td>
                        <td className="py-4 text-right">
                          {item.stock <= 10 ? (
                            <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-bold border border-red-100 whitespace-nowrap">
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold border border-green-100 whitespace-nowrap">
                              Healthy
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => setManualRestockItem(item)}
                            className="text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors text-xs flex items-center gap-1 ml-auto"
                          >
                            <ArrowDownToLine size={14} /> Restock
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredInventory.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-500 font-medium">No products found matching your criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Record a New Expense</h3>
                <p className="text-gray-500 text-sm mt-1">Log bills, salaries, rent, and other operational costs.</p>
              </div>

              {expenseSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="shrink-0" />
                  <span className="font-bold">Expense recorded successfully to your ledger.</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Amount (₱)</label>
                  <input 
                    type="number" 
                    value={expenseAmount}
                    onChange={e => setExpenseAmount(e.target.value)}
                    placeholder="0.00" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {expenseCategories.map(cat => (
                      <div 
                        key={cat}
                        onClick={() => setExpenseCategory(cat)}
                        className={`border-2 rounded-xl p-3 text-center cursor-pointer font-bold text-sm transition-colors ${expenseCategory === cat ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Description / Notes</label>
                  <textarea 
                    value={expenseDesc}
                    onChange={e => setExpenseDesc(e.target.value)}
                    placeholder="e.g. Meralco bill for August..." 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none h-24"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cash', label: 'Cash' },
                      { id: 'gcash', label: 'GCash' },
                      { id: 'card', label: 'Card' }
                    ].map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setExpensePaymentMethod(method.id as any)}
                        className={`py-3 text-center font-bold text-sm rounded-xl border transition-colors ${expensePaymentMethod === method.id ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleRecordExpense}
                  disabled={!expenseAmount || !expenseCategory}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2 mt-4"
                >
                  <CheckCircle2 size={20} /> Record Expense
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Manual Restock Modal */}
      {manualRestockItem && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Restock Item</h3>
              <button onClick={() => setManualRestockItem(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="font-bold text-gray-900">{manualRestockItem.name}</div>
                <div className="text-sm text-gray-500 font-medium mt-1">Current Stock: {manualRestockItem.stock}</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Quantity to Add</label>
                  <input 
                    type="number" 
                    value={restockQty}
                    onChange={e => setRestockQty(e.target.value)}
                    placeholder="e.g. 50" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Total Supplier Cost (₱)</label>
                  <input 
                    type="number" 
                    value={restockCost}
                    onChange={e => setRestockCost(e.target.value)}
                    placeholder="0.00" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Supplier Name (Optional)</label>
                  <input 
                    type="text" 
                    value={restockSupplier}
                    onChange={e => setRestockSupplier(e.target.value)}
                    placeholder="e.g. AutoParts Co." 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cash', label: 'Cash' },
                      { id: 'gcash', label: 'GCash' },
                      { id: 'card', label: 'Card' }
                    ].map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setRestockPaymentMethod(method.id as any)}
                        className={`py-3 text-center font-bold text-sm rounded-xl border transition-colors ${restockPaymentMethod === method.id ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => setManualRestockItem(null)}
                className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleManualRestock}
                disabled={!restockQty || !restockCost}
                className="flex-1 py-3.5 bg-blue-600 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Restock Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 text-white/10 -mt-4 -mr-4 pointer-events-none">
                <BrainCircuit size={120} />
              </div>
              <h3 className="text-xl font-bold relative z-10 flex items-center gap-2">
                <Zap className="fill-yellow-400 text-yellow-400" size={24} /> Confirm Smart Restock
              </h3>
              <p className="text-purple-100 text-sm mt-2 relative z-10">You're about to restock based on AI recommendations.</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-3">Order Details</div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900">Brake Pads (Front)</span>
                  <span className="font-black text-gray-900 text-lg">20x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Supplier: AutoParts Co.</span>
                  <span className="font-bold text-gray-500">@ ₱125.00/ea</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl border border-purple-100 text-purple-900">
                <span className="font-bold">Total Expense</span>
                <span className="font-black text-2xl">₱ 2,500.00</span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => setShowAiModal(false)}
                className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAiRestock}
                className="flex-1 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
