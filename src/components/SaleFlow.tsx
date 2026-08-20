import { ArrowLeft, Search, CheckCircle2, ShoppingCart, Lightbulb, Package, QrCode, CreditCard, Banknote, ShieldCheck, SmartphoneNfc } from 'lucide-react';
import { useState } from 'react';

type Step = 1 | 2 | 3 | 4;

type Product = { id: number; name: string; price: number; stock: number; category: string; };
type CartItem = Product & { qty: number };

const INVENTORY: Product[] = [
  { id: 1, name: 'Brake Pad (Front)', price: 250, stock: 12, category: 'Parts' },
  { id: 2, name: 'Oil Filter', price: 150, stock: 36, category: 'Parts' },
  { id: 3, name: 'Spark Plug (NGK)', price: 120, stock: 40, category: 'Parts' },
  { id: 4, name: 'Motorcycle Chain', price: 600, stock: 10, category: 'Parts' },
  { id: 5, name: 'Honda Beat Drive Belt', price: 350, stock: 15, category: 'Parts' },
  { id: 6, name: 'Motor Oil (1L)', price: 250, stock: 24, category: 'Oils & Fluids' },
  { id: 7, name: 'Helmet Visor', price: 450, stock: 8, category: 'Accessories' },
];

export function SaleFlow() {
  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'gcash' | 'card'>('cash');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleNext = () => {
    if (step < 4) setStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => (prev - 1) as Step);
  };

  const resetSale = () => {
    setStep(1);
    setCart([]);
    setPaymentMethod('cash');
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50 flex flex-col items-center min-h-full">
      <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <div className="bg-blue-600 text-white p-2 rounded-xl"><ShoppingCart size={24} /></div>
             <h1 className="text-xl md:text-2xl font-bold text-blue-700 uppercase tracking-wide">RECORD A SALE</h1>
           </div>
           <p className="text-gray-600 font-medium text-sm md:text-base">Step-by-step Point of Sale</p>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="w-full max-w-5xl flex gap-2 md:gap-4 justify-between mb-8 overflow-x-auto pb-4 scrollbar-hide shrink-0">
        <StepIndicator num={1} title="Payment Method" desc="Select how they pay." active={step >= 1} current={step === 1} color="blue" />
        <StepIndicator num={2} title="Select Items" desc="Choose from inventory." active={step >= 2} current={step === 2} color="blue" />
        <StepIndicator num={3} title="Review Sale" desc="Verify & collect payment." active={step >= 3} current={step === 3} color="blue" />
        <StepIndicator num={4} title="Sale Recorded" desc="Receipt generated." active={step === 4} current={step === 4} color="blue" />
      </div>

      <div className="w-full max-w-3xl flex justify-center flex-1">
        {step === 1 && <PaymentStep paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onNext={handleNext} />}
        {step === 2 && <ItemsStep cart={cart} setCart={setCart} onBack={handleBack} onNext={handleNext} />}
        {step === 3 && <ReviewStep cart={cart} paymentMethod={paymentMethod} onBack={handleBack} onNext={handleNext} />}
        {step === 4 && <SuccessStep cart={cart} paymentMethod={paymentMethod} onReset={resetSale} />}
      </div>
      
      {step < 4 && (
        <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 shrink-0">
          <div className="bg-white border border-gray-100 shadow-sm p-4 md:p-6 rounded-2xl flex items-center gap-4">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0"><Lightbulb size={20} className="md:w-6 md:h-6" /></div>
             <div className="text-gray-700 font-medium text-xs md:text-sm"><strong>Tip:</strong> Use barcode scan to add items faster and reduce errors.</div>
          </div>
          <div className="bg-blue-50/50 border border-blue-100 p-4 md:p-6 rounded-2xl flex items-center gap-4 text-blue-900">
             <div className="shrink-0"><Package className="text-blue-600 w-8 h-8 md:w-10 md:h-10" /></div>
             <div>
               <div className="font-bold text-sm md:text-lg mb-0.5 md:mb-1 text-blue-700">Inventory is updated automatically</div>
               <div className="text-gray-600 text-xs md:text-sm">Stock levels are reduced based on items sold.</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ num, title, desc, active, current, color }: any) {
  return (
    <div className={`flex flex-col min-w-[140px] md:min-w-0 md:flex-1 ${!active && 'opacity-40'}`}>
      <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm shrink-0 transition-colors ${current ? `bg-${color}-600 text-white shadow-md` : active ? `bg-${color}-100 text-${color}-600` : 'bg-gray-200 text-gray-500'}`}>
          {num}
        </div>
        <div className={`font-bold text-xs md:text-base whitespace-nowrap md:whitespace-normal transition-colors ${current ? `text-${color}-600` : active ? 'text-gray-900' : 'text-gray-500'}`}>{title}</div>
      </div>
      <div className="hidden md:block text-xs text-gray-500 pl-11">{desc}</div>
    </div>
  )
}

function CardWrapper({ title, children, onNext, onBack, nextLabel = "Next", nextDisabled = false, hideFooter }: any) {
  return (
    <div className="w-full bg-white rounded-[2rem] border border-blue-100 shadow-xl shadow-blue-900/5 flex flex-col relative overflow-hidden min-h-[500px] max-h-full">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4 shrink-0 bg-white z-10">
        {onBack ? (
          <button onClick={onBack} className="text-gray-400 hover:text-blue-600 transition-colors p-2 -ml-2 rounded-lg hover:bg-blue-50"><ArrowLeft size={20} /></button>
        ) : (
          <div className="w-6" />
        )}
        <h2 className="font-bold text-gray-900 text-lg md:text-xl">{title}</h2>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto bg-gray-50/30">
        {children}
      </div>

      {!hideFooter && (
        <div className="p-6 border-t border-gray-100 flex gap-3 shrink-0 bg-white z-10">
          {onBack && <button onClick={onBack} className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Back</button>}
          <button 
            onClick={onNext} 
            disabled={nextDisabled}
            className={`w-full py-3.5 font-bold rounded-xl transition-all shadow-sm ${nextDisabled ? 'bg-blue-100 text-blue-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5'}`}
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  )
}

function PaymentStep({ paymentMethod, setPaymentMethod, onNext }: any) {
  return (
    <CardWrapper title="Choose Payment Method" onNext={onNext}>
      <h3 className="font-bold text-gray-700 mb-4">How will the customer pay?</h3>
      <div className="space-y-3">
         <PaymentOption 
            icon={<Banknote size={24} />} 
            label="Cash" 
            selected={paymentMethod === 'cash'} 
            onClick={() => setPaymentMethod('cash')} 
         />
         <PaymentOption 
            icon={<QrCode size={24} />} 
            label="GCash / QR" 
            selected={paymentMethod === 'gcash'} 
            onClick={() => setPaymentMethod('gcash')} 
         />
         <PaymentOption 
            icon={<CreditCard size={24} />} 
            label="Card (Terminal)" 
            subtext="Accepts debit/credit cards" 
            selected={paymentMethod === 'card'} 
            onClick={() => setPaymentMethod('card')} 
         />
      </div>
    </CardWrapper>
  )
}

function ItemsStep({ cart, setCart, onBack, onNext }: any) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Parts', 'Accessories', 'Oils & Fluids'];
  
  const filteredInventory = INVENTORY.filter(item => 
    (filter === 'All' || item.category === filter) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdateQty = (product: Product, delta: number) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(item => item.id !== product.id);
        return prev.map(item => item.id === product.id ? { ...item, qty: newQty } : item);
      }
      if (delta > 0) {
        return [...prev, { ...product, qty: 1 }];
      }
      return prev;
    });
  };

  const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.qty), 0);
  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.qty, 0);

  return (
    <CardWrapper title="Select Items" onBack={onBack} onNext={onNext} nextDisabled={cart.length === 0}>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search parts or scan barcode" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-100 text-sm shadow-sm transition-all" 
        />
      </div>
      
      <div className="flex gap-2 mb-6 text-sm overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 font-bold rounded-full whitespace-nowrap transition-colors ${filter === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-6 flex-1 overflow-y-auto min-h-[250px]">
         <div className="flex text-xs font-bold text-gray-400 mb-3 border-b border-gray-200 pb-2 uppercase tracking-wider px-2">
            <div className="flex-1">Item</div>
            <div className="w-16 text-right hidden sm:block">Price</div>
            <div className="w-12 text-center hidden sm:block">Stock</div>
            <div className="w-24 text-center">Qty</div>
         </div>
         <div className="space-y-2">
            {filteredInventory.map(product => {
               const cartItem = cart.find((i: CartItem) => i.id === product.id);
               const qty = cartItem ? cartItem.qty : 0;
               return (
                 <ItemRow 
                   key={product.id} 
                   product={product} 
                   qty={qty} 
                   onUpdate={(delta: number) => handleUpdateQty(product, delta)} 
                 />
               )
            })}
            {filteredInventory.length === 0 && (
              <div className="text-center py-8 text-gray-400 font-medium">No items found.</div>
            )}
         </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-auto bg-blue-50/50 p-4 -mx-6 -mb-6">
         <div className="text-sm font-semibold text-gray-600">{totalItems} items selected</div>
         <div className="font-black text-blue-600 text-xl tracking-tight">₱ {total.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
      </div>
    </CardWrapper>
  )
}

function ReviewStep({ cart, paymentMethod, onBack, onNext }: any) {
  const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.qty), 0);

  return (
    <CardWrapper title="Review Sale" onBack={onBack} onNext={onNext} nextLabel="Confirm & Record Sale">
      <div className="flex justify-between items-center mb-6 border border-gray-200 bg-white p-4 rounded-xl shadow-sm">
         <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
             {paymentMethod === 'cash' && <Banknote size={20} />}
             {paymentMethod === 'gcash' && <QrCode size={20} />}
             {paymentMethod === 'card' && <CreditCard size={20} />}
           </div>
           <div>
             <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Method</div>
             <div className="font-bold text-gray-900 capitalize">{paymentMethod === 'gcash' ? 'GCash / QR' : paymentMethod === 'card' ? 'Card Terminal' : 'Cash'}</div>
           </div>
         </div>
         <button onClick={onBack} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Change</button>
      </div>

      {paymentMethod === 'gcash' && (
        <div className="mb-6 bg-white border-2 border-blue-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          <h3 className="font-bold text-gray-900 mb-1">Awaiting Payment</h3>
          <p className="text-sm text-gray-500 mb-4">Ask customer to scan the QR code to pay.</p>
          <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm mb-3">
             <QrCode size={120} className="text-gray-800" strokeWidth={1.5} />
          </div>
          <div className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full animate-pulse">Scanning for payment...</div>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="mb-6 bg-white border-2 border-blue-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          <h3 className="font-bold text-gray-900 mb-1">Awaiting Card</h3>
          <p className="text-sm text-gray-500 mb-4">Please insert or tap card on terminal.</p>
          <div className="w-32 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg mb-4 relative overflow-hidden border border-gray-700 flex flex-col justify-between p-3 animate-pulse">
             <div className="w-6 h-4 bg-yellow-400/80 rounded border border-yellow-500/50"></div>
             <div className="flex justify-end"><SmartphoneNfc className="text-white/50" size={20} /></div>
          </div>
          <div className="text-xs font-bold text-gray-500 flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div> Terminal active</div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Order Items</span>
          <span className="text-sm font-bold text-gray-900">{cart.reduce((a:number,b:CartItem)=>a+b.qty,0)}</span>
        </div>
        <div className="p-4 space-y-3 max-h-48 overflow-y-auto">
           {cart.map((item: CartItem) => (
             <div key={item.id} className="flex items-center justify-between text-sm">
               <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                 <span className="font-bold text-gray-500 w-4">{item.qty}x</span>
                 <span className="font-medium text-gray-900 truncate">{item.name}</span>
               </div>
               <div className="font-bold text-gray-700 shrink-0">₱ {(item.price * item.qty).toFixed(2)}</div>
             </div>
           ))}
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-2xl p-5 text-white shadow-xl shadow-gray-900/10">
        <div className="flex justify-between text-gray-400 text-sm font-medium mb-1"><span>Subtotal</span><span>₱ {total.toFixed(2)}</span></div>
        <div className="flex justify-between text-gray-400 text-sm font-medium mb-3"><span>Tax</span><span>₱ 0.00</span></div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-700">
          <span className="font-bold text-gray-300">Total Amount</span>
          <span className="font-black text-2xl tracking-tight text-white">₱ {total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
        </div>
      </div>
    </CardWrapper>
  )
}

function SuccessStep({ cart, paymentMethod, onReset }: any) {
  const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.qty), 0);

  return (
    <CardWrapper title="Sale Complete" hideFooter>
      <div className="flex flex-col items-center pt-6 mb-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl shadow-green-200/50">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Payment Successful</h2>
        <p className="text-gray-500 font-medium">The sale has been recorded to your history.</p>
      </div>

      <div className="space-y-4 text-sm mb-8 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between"><span className="text-gray-500 font-medium">Receipt #</span><span className="font-bold text-gray-900 uppercase">S-{(new Date().getTime().toString().slice(5))}</span></div>
        <div className="flex justify-between"><span className="text-gray-500 font-medium">Payment Method</span><span className="font-bold text-gray-900 capitalize">{paymentMethod === 'gcash' ? 'GCash' : paymentMethod}</span></div>
        <div className="flex justify-between"><span className="text-gray-500 font-medium">Time</span><span className="font-bold text-gray-900 text-right">{new Date().toLocaleString()}</span></div>
        <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center"><span className="text-gray-500 font-medium">Amount Paid</span><span className="font-black text-blue-600 text-lg">₱ {total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span></div>
      </div>

      <div className="space-y-3 mt-auto">
        <button className="w-full py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
           <ShoppingCart size={20} /> View Digital Receipt
        </button>
        <button onClick={onReset} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
          Record New Sale
        </button>
      </div>
    </CardWrapper>
  )
}

function PaymentOption({ icon, label, subtext, selected, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all ${selected ? 'border-blue-600 bg-blue-50 shadow-md shadow-blue-100' : 'border-gray-200 hover:border-blue-300 hover:shadow-sm bg-white'}`}
    >
       <div className="flex items-center gap-4">
         <div className={`p-2 rounded-xl ${selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
           {icon}
         </div>
         <div>
           <div className={`font-bold ${selected ? 'text-blue-900' : 'text-gray-900'}`}>{label}</div>
           {subtext && <div className="text-xs text-gray-500 font-medium mt-0.5">{subtext}</div>}
         </div>
       </div>
       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'}`}>
         {selected && <CheckCircle2 size={14} strokeWidth={3} />}
       </div>
    </div>
  )
}

function ItemRow({ product, qty, onUpdate }: any) {
  return (
    <div className="flex items-center p-2 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm">
      <div className="flex-1 flex items-center gap-3 pr-2 min-w-0">
         <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg shrink-0 flex items-center justify-center text-lg shadow-sm">
            📦
         </div>
         <div className="min-w-0">
           <div className="font-bold text-gray-900 truncate text-sm">{product.name}</div>
           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block sm:hidden">₱{product.price.toFixed(2)} • {product.stock} left</div>
         </div>
      </div>
      <div className="w-16 text-right font-bold text-gray-900 hidden sm:block">₱{product.price.toFixed(2)}</div>
      <div className="w-12 text-center text-gray-500 text-xs font-semibold hidden sm:block">{product.stock}</div>
      <div className="w-24 flex items-center justify-end gap-1">
        {qty > 0 ? (
          <div className="flex items-center bg-blue-50 border border-blue-100 rounded-lg overflow-hidden p-0.5">
             <button onClick={() => onUpdate(-1)} className="w-7 h-7 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-md font-bold transition-colors">-</button>
             <span className="font-bold text-sm text-blue-900 w-6 text-center">{qty}</span>
             <button onClick={() => onUpdate(1)} className="w-7 h-7 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-md font-bold transition-colors">+</button>
          </div>
        ) : (
          <button onClick={() => onUpdate(1)} className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 font-bold rounded-lg text-xs transition-colors border border-transparent hover:border-blue-100 shadow-sm">
            Add
          </button>
        )}
      </div>
    </div>
  )
}
