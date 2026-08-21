import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

export const DEFAULT_INVENTORY: Product[] = [
  { id: 1, name: 'Brake Pad (Front)', price: 250, stock: 4, category: 'Parts', costPrice: 125, sku: 'BP-001', minStock: 10 },
  { id: 2, name: 'Oil Filter', price: 150, stock: 36, category: 'Parts', costPrice: 75, sku: 'OF-002', minStock: 15 },
  { id: 3, name: 'Spark Plug (NGK)', price: 120, stock: 40, category: 'Parts', costPrice: 60, sku: 'SP-003', minStock: 20 },
  { id: 4, name: 'Motorcycle Chain', price: 600, stock: 10, category: 'Parts', costPrice: 350, sku: 'MC-004', minStock: 5 },
  { id: 5, name: 'Honda Beat Drive Belt', price: 350, stock: 15, category: 'Parts', costPrice: 200, sku: 'DB-005', minStock: 8 },
  { id: 6, name: 'Motor Oil (1L)', price: 250, stock: 24, category: 'Oils & Fluids', costPrice: 160, sku: 'MO-006', minStock: 12 },
  { id: 7, name: 'Helmet Visor', price: 450, stock: 8, category: 'Accessories', costPrice: 260, sku: 'HV-007', minStock: 5 },
];

const STORAGE_KEY = 'gcash_business_inventory_v1';
const EVENT_NAME = 'gcash_inventory_sync';

export function getStoredInventory(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_INVENTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INVENTORY));
      return DEFAULT_INVENTORY;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_INVENTORY;
  } catch (e) {
    console.error('Failed to read inventory from localStorage', e);
    return DEFAULT_INVENTORY;
  }
}

export function saveInventory(items: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: items }));
  } catch (e) {
    console.error('Failed to save inventory', e);
  }
}

export function useInventory() {
  const [inventory, setInventory] = useState<Product[]>(getStoredInventory);

  useEffect(() => {
    const handleSync = () => {
      setInventory(getStoredInventory());
    };
    window.addEventListener(EVENT_NAME, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(EVENT_NAME, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const addProduct = useCallback((newProd: Omit<Product, 'id'>) => {
    const current = getStoredInventory();
    const nextId = current.length > 0 ? Math.max(...current.map(p => p.id)) + 1 : 1;
    const created: Product = {
      ...newProd,
      id: nextId,
      minStock: newProd.minStock || 5
    };
    const updated = [created, ...current];
    saveInventory(updated);
    setInventory(updated);
    return created;
  }, []);

  const restockProduct = useCallback((id: number, qtyToAdd: number) => {
    const current = getStoredInventory();
    const updated = current.map(p => p.id === id ? { ...p, stock: p.stock + qtyToAdd } : p);
    saveInventory(updated);
    setInventory(updated);
  }, []);

  const deductStock = useCallback((itemsToDeduct: { id: number; qty: number }[]) => {
    const current = getStoredInventory();
    const updated = current.map(p => {
      const target = itemsToDeduct.find(item => item.id === p.id);
      if (target) {
        return { ...p, stock: Math.max(0, p.stock - target.qty) };
      }
      return p;
    });
    saveInventory(updated);
    setInventory(updated);
  }, []);

  return {
    inventory,
    addProduct,
    restockProduct,
    deductStock
  };
}
