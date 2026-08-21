import { useState, FormEvent } from 'react';
import { Package, Sparkles, Search, Plus, DollarSign, BrainCircuit, CheckCircle2, Zap, ArrowDownToLine, Receipt, X, Tag, AlertCircle, Layers } from 'lucide-react';
import { Product } from '../types';
import { useInventory } from '../lib/inventoryStore';

const BASE_CATEGORIES = ['All', 'Parts', 'Oils & Fluids', 'Accessories', 'Tires & Wheels', 'Tools'];

export function SmartRestockView() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'expenses'>('inventory');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiRestockComplete, setAiRestockComplete] = useState(false);

  // Shared reactive inventory from store
  const { inventory, addProduct, restockProduct } = useInventory();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Manual Restock modal state
  const [manualRestockItem, setManualRestockItem] = useState<Product | null>(null);
  const [restockQty, setRestockQty] = useState('');
  const [restockCost, setRestockCost] = useState('');
  const [restockSupplier, setRestockSupplier] = useState('');
  const [restockPaymentMethod, setRestockPaymentMethod] = useState<'cash' | 'gcash' | 'card'>('cash');

  // Add Product modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Parts');
  const [customCategory, setCustomCategory] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCost, setNewProductCost] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductSupplier, setNewProductSupplier] = useState('');
  const [newProductSku, setNewProductSku] = useState('');
  const [newProductMinStock, setNewProductMinStock] = useState('5');
  const [addProductSuccess, setAddProductSuccess] = useState<string | null>(null);
  const [addFormError, setAddFormError] = useState<string | null>(null);

  // Expense state
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expensePaymentMethod, setExpensePaymentMethod] = useState<'cash' | 'gcash' | 'card'>('cash');
  const [expenseSuccess, setExpenseSuccess] = useState(false);

  const expenseCategories = ['Utilities', 'Rent', 'Salary', 'Marketing', 'Supplies', 'Other'];

  // Dynamically extract all available categories in the current inventory
  const dynamicCategories = Array.from(
    new Set([...BASE_CATEGORIES, ...inventory.map(item => item.category)])
  );

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.sku && item.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleManualRestock = () => {
    if (!manualRestockItem || !restockQty || !restockCost) return;
    const qty = parseInt(restockQty);
    if (qty > 0) {
      restockProduct(manualRestockItem.id, qty);
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
    // Restock brake pad (Front) by 20 units
    restockProduct(1, 20);
  };

  const handleCreateProduct = (e?: FormEvent) => {
    if (e) e.preventDefault();
    setAddFormError(null);

    const name = newProductName.trim();
    const price = parseFloat(newProductPrice);
    const stock = parseInt(newProductStock, 10);
    const cost = newProductCost ? parseFloat(newProductCost) : undefined;
    const minStock = newProductMinStock ? parseInt(newProductMinStock, 10) : 5;
    const category = newProductCategory === 'Custom' ? customCategory.trim() || 'General' : newProductCategory;

    if (!name) {
      setAddFormError('Please enter a product name.');
      return;
    }
    if (isNaN(price) || price <= 0) {
      setAddFormError('Please enter a valid selling price greater than ₱0.');
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setAddFormError('Please enter an initial stock quantity (0 or more).');
      return;
    }

    const created = addProduct({
      name,
      price,
      stock,
      category,
      costPrice: cost,
      supplier: newProductSupplier.trim() || undefined,
      sku: newProductSku.trim() || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      minStock: minStock > 0 ? minStock : 5,
    });

    // Reset form
    setNewProductName('');
    setNewProductPrice('');
    setNewProductCost('');
    setNewProductStock('');
    setNewProductSupplier('');
    setNewProductSku('');
    setNewProductMinStock('5');
    setCustomCategory('');
    setAddFormError(null);
    setShowAddModal(false);

    // Show toast message
    setAddProductSuccess(`"${created.name}" was added to inventory!`);
    setTimeout(() => {
      setAddProductSuccess(null);
    }, 4000);
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

  const lowStockCount = inventory.filter(i => i.stock <= (i.minStock || 10)).length;

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
      <div className="mb-6 lg:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Restock & Expenses</h1>
          <p className="text-gray-600 font-medium text-sm md:text-base">Manage your inventory, add new products, and track supplier restocks in one place.</p>
        </div>

        {activeTab === 'inventory' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-5 py-3 rounded-2xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 shrink-0 text-sm"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add New Product
          </button>
        )}
      </div>

      {/* Success Notification Banner when product is added */}
      {addProductSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-5 py-3.5 rounded-2xl mb-6 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <span className="font-bold text-sm">Product Added! </span>
              <span className="text-sm font-medium">{addProductSuccess}</span>
            </div>
          </div>
          <button onClick={() => setAddProductSuccess(null)} className="text-green-700 hover:text-green-900 p-1 rounded-lg">
            <X size={16} />
          </button>
        </div>
      )}

      {/* AI Smart Insight Banner */}
      {!aiRestockComplete ? (
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-200 mb-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-indigo-600"></div>
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
                Brake Pads are selling <strong>40% faster</strong> than last month. You only have {inventory.find(i => i.id === 1)?.stock ?? 4} units left. We recommend restocking <strong className="text-purple-700">20 units for ₱2,500</strong> today to avoid losing potential sales this weekend.
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
            <Package size={18} /> Manage Inventory ({inventory.length})
            {lowStockCount > 0 && (
              <span className="bg-red-100 text-red-700 text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">
                {lowStockCount} low
              </span>
            )}
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
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by product name, SKU..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm font-medium outline-none"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X size={14} />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                  {dynamicCategories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
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
                      <th className="pb-3 font-bold">Product Details</th>
                      <th className="pb-3 font-bold text-right">Selling Price</th>
                      <th className="pb-3 font-bold text-right">In Stock</th>
                      <th className="pb-3 font-bold text-right">Status</th>
                      <th className="pb-3 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredInventory.map(item => {
                      const isLow = item.stock <= (item.minStock || 10);
                      return (
                        <tr key={item.id} className="group hover:bg-gray-50/80 transition-colors">
                          <td className="py-4 font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0 border border-gray-200/60 shadow-xs">
                              {item.category === 'Oils & Fluids' ? '🛢️' : item.category === 'Accessories' ? '🏍️' : item.category === 'Tires & Wheels' ? '🛞' : item.category === 'Tools' ? '🔧' : '📦'}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-gray-900 font-bold">{item.name}</div>
                              <div className="text-xs text-gray-400 font-medium flex items-center gap-2 mt-0.5">
                                <span>{item.category}</span>
                                {item.sku && (
                                  <>
                                    <span>•</span>
                                    <span className="font-mono text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded">{item.sku}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 font-bold text-gray-900 text-right whitespace-nowrap">
                            ₱ {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            {item.costPrice && (
                              <div className="text-[11px] text-gray-400 font-normal">Cost: ₱{item.costPrice}</div>
                            )}
                          </td>
                          <td className="py-4 font-bold text-gray-900 text-right whitespace-nowrap">
                            <span className={isLow ? 'text-red-600' : 'text-gray-900'}>{item.stock}</span>
                            <span className="text-xs text-gray-400 font-normal"> units</span>
                          </td>
                          <td className="py-4 text-right whitespace-nowrap">
                            {isLow ? (
                              <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2.5 py-1 rounded-lg text-xs font-bold border border-red-100">
                                Low Stock
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2.5 py-1 rounded-lg text-xs font-bold border border-green-100">
                                Healthy
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-right whitespace-nowrap">
                            <button 
                              onClick={() => setManualRestockItem(item)}
                              className="text-blue-600 font-bold hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-1.5 rounded-xl transition-colors text-xs inline-flex items-center gap-1.5 shadow-xs"
                            >
                              <ArrowDownToLine size={14} /> Restock
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredInventory.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-500 font-medium">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                            <Package size={24} />
                          </div>
                          <div className="font-bold text-gray-800 mb-1">No products found</div>
                          <div className="text-xs text-gray-400 mb-4">No inventory matches your search or selected filter.</div>
                          <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                          >
                            <Plus size={14} /> Add this as a new product
                          </button>
                        </td>
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

      {/* ADD NEW PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  <Plus size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Add New Product</h3>
                  <p className="text-xs text-gray-500 font-medium">Add an item to your inventory and point of sale.</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setAddFormError(null);
                }} 
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4 overflow-y-auto flex-1">
              {addFormError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{addFormError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  placeholder="e.g. Tubeless Tire 90/80-14, Chain Lube..." 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-gray-900" 
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['Parts', 'Oils & Fluids', 'Accessories', 'Tires & Wheels', 'Tools', 'Custom'].map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewProductCategory(cat)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${newProductCategory === cat ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {newProductCategory === 'Custom' && (
                  <input 
                    type="text" 
                    value={customCategory}
                    onChange={e => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category name..." 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-xs font-semibold text-gray-900 animate-in fade-in"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Selling Price (₱) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₱</span>
                    <input 
                      type="number" 
                      step="any"
                      value={newProductPrice}
                      onChange={e => setNewProductPrice(e.target.value)}
                      placeholder="0.00" 
                      className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-base font-bold text-gray-900" 
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Initial Stock <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    value={newProductStock}
                    onChange={e => setNewProductStock(e.target.value)}
                    placeholder="e.g. 20" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-base font-bold text-gray-900" 
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Cost / Supplier Price (₱) <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₱</span>
                    <input 
                      type="number" 
                      step="any"
                      value={newProductCost}
                      onChange={e => setNewProductCost(e.target.value)}
                      placeholder="0.00" 
                      className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Low Stock Alert Level <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input 
                    type="number" 
                    value={newProductMinStock}
                    onChange={e => setNewProductMinStock(e.target.value)}
                    placeholder="5" 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-900" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    SKU / Barcode <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input 
                    type="text" 
                    value={newProductSku}
                    onChange={e => setNewProductSku(e.target.value)}
                    placeholder="e.g. SKU-8841" 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-xs font-semibold text-gray-900" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Supplier Name <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input 
                    type="text" 
                    value={newProductSupplier}
                    onChange={e => setNewProductSupplier(e.target.value)}
                    placeholder="e.g. Apex Auto Hub" 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-xs font-semibold text-gray-900" 
                  />
                </div>
              </div>
            </form>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button 
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setAddFormError(null);
                }}
                className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={() => handleCreateProduct()}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Plus size={18} strokeWidth={2.5} />
                Save & Add to Stock
              </button>
            </div>
          </div>
        </div>
      )}

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
                <div className="text-sm text-gray-500 font-medium mt-1">Current Stock: {manualRestockItem.stock} units</div>
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
