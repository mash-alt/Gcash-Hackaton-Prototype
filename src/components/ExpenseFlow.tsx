import { FileText, CheckCircle2, ChevronDown, Plus, Trash2, Receipt, Calendar, Store, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useState, type FormEvent } from 'react';

type ExpenseItem = { id: number; name: string; qty: number; price: number; };

export function ExpenseFlow() {
  const [category, setCategory] = useState('Inventory Purchase');
  const [supplier, setSupplier] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<ExpenseItem[]>([
    { id: 1, name: '', qty: 1, price: 0 }
  ]);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isSuccess, setIsSuccess] = useState(false);

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), name: '', qty: 1, price: 0 }]);
  };

  const updateItem = (id: number, field: keyof ExpenseItem, value: any) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const tax = 0;
  const total = subtotal + tax;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const resetForm = () => {
    setCategory('Inventory Purchase');
    setSupplier('');
    setItems([{ id: Date.now(), name: '', qty: 1, price: 0 }]);
    setNotes('');
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-20">
        <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl max-w-md w-full border border-gray-100 text-center animate-in fade-in zoom-in duration-300 mx-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Expense Logged</h2>
          <p className="text-gray-500 mb-8">Ref #EXP-{new Date().getTime().toString().slice(5)}</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex justify-between text-gray-600"><span className="font-medium">Amount Logged</span><span className="font-bold text-gray-900">₱{total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span></div>
            <div className="flex justify-between text-gray-600"><span className="font-medium">Category</span><span className="font-bold text-gray-900">{category}</span></div>
            <div className="flex justify-between text-gray-600"><span className="font-medium">Paid Via</span><span className="font-bold text-gray-900 capitalize">{paymentMethod}</span></div>
          </div>

          <div className="space-y-3">
            <button onClick={resetForm} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md shadow-green-200">Log Another Expense</button>
            <button className="w-full py-4 bg-white text-green-600 font-bold rounded-xl border-2 border-green-100 hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
              <FileText size={20} /> View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-green-600 text-white rounded-2xl shadow-md shadow-green-200">
          <Receipt size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Record Expense</h1>
          <p className="text-gray-500 font-medium mt-1">Log a new business expense or inventory purchase</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 items-start pb-24">
        {/* Left Column: Form Details */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="text-green-600" size={20}/> Expense Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 font-medium text-gray-900 transition-all outline-none"
                  >
                    <option>Inventory Purchase</option>
                    <option>Supplies</option>
                    <option>Utilities</option>
                    <option>Rent</option>
                    <option>Salaries / Labor</option>
                    <option>Delivery</option>
                    <option>Other Expense</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 font-medium text-gray-900 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Supplier / Vendor</label>
              <div className="relative">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="e.g. ABC Motor Parts Trading"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 font-medium text-gray-900 transition-all outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-bold text-gray-700">Itemized List</label>
                <button type="button" onClick={addItem} className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus size={16} /> Add Row
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center group bg-gray-50/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-gray-100 sm:border-transparent">
                    <div className="w-full sm:flex-1">
                      <input 
                        type="text" 
                        placeholder="Item description"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white sm:bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 font-medium text-sm transition-all outline-none"
                      />
                    </div>
                    <div className="flex w-full sm:w-auto gap-3 items-center">
                      <div className="w-1/3 sm:w-20">
                        <input 
                          type="number" 
                          min="1"
                          placeholder="Qty"
                          value={item.qty || ''}
                          onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2.5 bg-white sm:bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 font-medium text-sm text-center transition-all outline-none"
                        />
                      </div>
                      <div className="flex-1 sm:w-32 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₱</span>
                        <input 
                          type="number" 
                          min="0"
                          step="0.01"
                          placeholder="Price"
                          value={item.price || ''}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-full pl-8 pr-3 py-2.5 bg-white sm:bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 font-medium text-sm transition-all outline-none"
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeItem(item.id)}
                        className={`text-gray-400 hover:text-red-500 transition-colors shrink-0 p-2 sm:p-0 ${items.length === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                        disabled={items.length === 1}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Notes <span className="font-medium text-gray-400">(Optional)</span></label>
              <textarea 
                rows={3}
                placeholder="Add any additional context or reference numbers here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 font-medium text-gray-900 transition-all outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Summary & Payment */}
        <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard className="text-green-600" size={20}/> Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <PaymentButton type="cash" icon={<Banknote size={20}/>} label="Cash" active={paymentMethod === 'cash'} onClick={() => setPaymentMethod('cash')} />
              <PaymentButton type="gcash" icon={<QrCode size={20}/>} label="GCash" active={paymentMethod === 'gcash'} onClick={() => setPaymentMethod('gcash')} />
              <PaymentButton type="card" icon={<CreditCard size={20}/>} label="Card" active={paymentMethod === 'card'} onClick={() => setPaymentMethod('card')} />
              <PaymentButton type="transfer" icon={<Store size={20}/>} label="Transfer" active={paymentMethod === 'transfer'} onClick={() => setPaymentMethod('transfer')} />
            </div>
          </div>

          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 shadow-xl text-white sticky top-6">
            <h2 className="text-lg font-bold mb-6 text-gray-100 border-b border-gray-700 pb-4">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-medium"><span>Subtotal</span><span>₱{subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span></div>
              <div className="flex justify-between text-gray-400 font-medium"><span>Tax</span><span>₱{tax.toLocaleString('en-US', {minimumFractionDigits: 2})}</span></div>
            </div>

            <div className="flex justify-between items-end mb-8 pt-6 border-t border-gray-700">
              <span className="text-gray-300 font-bold">Total Expense</span>
              <span className="text-3xl font-black text-green-400 tracking-tight">₱{total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>

            <button 
              type="submit"
              disabled={total === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
                total > 0 ? 'bg-green-500 text-white hover:bg-green-400 shadow-green-500/20 hover:-translate-y-0.5' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Log ₱{total.toLocaleString('en-US', {minimumFractionDigits: 2})}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function PaymentButton({ icon, label, active, onClick }: any) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
        active ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-bold">{label}</span>
    </button>
  )
}
