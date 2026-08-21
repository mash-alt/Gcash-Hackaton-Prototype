export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  costPrice?: number;
  supplier?: string;
  sku?: string;
  minStock?: number;
}

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  paymentMethod: 'cash' | 'gcash' | 'card';
  date: string;
}
