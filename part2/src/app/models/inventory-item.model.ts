/*
 * Author: Your Name
 * Assessment Part: Part 2 - Basic Angular Inventory Application
 */
export type Category = '电子产品' | '家具' | '服装' | '工具' | '其他';
export type StockStatus = '有货' | '库存不足' | '无货';

export interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  price: number;
  supplier: string;
  stockStatus: StockStatus;
  isPopular: boolean;
  comments?: string;
}

export interface InventoryItemInput {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  price: number;
  supplier: string;
  stockStatus: StockStatus;
  isPopular: boolean;
  comments: string;
}

export interface ActionResult {
  ok: boolean;
  message: string;
}
