/*
 * Author: Your Name
 * Assessment Part: Part 2 - Basic Angular Inventory Application
 */
import { Injectable } from '@angular/core';
import { ActionResult, Category, InventoryItem, InventoryItemInput, StockStatus } from '../models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  readonly categories: Category[] = ['电子产品', '家具', '服装', '工具', '其他'];
  readonly stockStates: StockStatus[] = ['有货', '库存不足', '无货'];

  private items: InventoryItem[] = [
    {
      id: 'E2001',
      name: '4K 显示器',
      category: '电子产品',
      quantity: 18,
      price: 1799,
      supplier: 'Harvey Supplies',
      stockStatus: '有货',
      isPopular: true,
      comments: '办公室常用'
    },
    {
      id: 'F3002',
      name: '人体工学椅',
      category: '家具',
      quantity: 7,
      price: 1299,
      supplier: 'Comfort House',
      stockStatus: '库存不足',
      isPopular: true,
      comments: ''
    }
  ];

  getAllItems(): InventoryItem[] {
    return [...this.items];
  }

  getPopularItems(): InventoryItem[] {
    return this.items.filter((item) => item.isPopular);
  }

  searchByName(keyword: string): InventoryItem[] {
    const query = keyword.trim().toLowerCase();
    if (!query) {
      return this.getAllItems();
    }

    return this.items.filter((item) => item.name.toLowerCase().includes(query));
  }

  filterItems(keyword: string, category: string, stockStatus: string, onlyPopular: boolean): InventoryItem[] {
    return this.items.filter((item) => {
      const nameMatch = keyword.trim()
        ? item.name.toLowerCase().includes(keyword.trim().toLowerCase())
        : true;
      const categoryMatch = category ? item.category === category : true;
      const statusMatch = stockStatus ? item.stockStatus === stockStatus : true;
      const popularMatch = onlyPopular ? item.isPopular : true;
      return nameMatch && categoryMatch && statusMatch && popularMatch;
    });
  }

  addItem(input: InventoryItemInput): ActionResult {
    const validation = this.validateInput(input);
    if (!validation.ok) {
      return validation;
    }

    if (this.items.some((item) => item.id === input.id.trim())) {
      return { ok: false, message: `编号 ${input.id} 已存在，必须唯一。` };
    }

    this.items = [...this.items, this.toItem(input)];
    return { ok: true, message: `已新增物品 ${input.name}。` };
  }

  updateByName(targetName: string, input: InventoryItemInput): ActionResult {
    const name = targetName.trim();
    if (!name) {
      return { ok: false, message: '请输入要更新的物品名称。' };
    }

    const validation = this.validateInput(input);
    if (!validation.ok) {
      return validation;
    }

    const index = this.items.findIndex((item) => item.name === name);
    if (index < 0) {
      return { ok: false, message: `未找到名称为 ${name} 的物品。` };
    }

    const duplicateIdIndex = this.items.findIndex((item, i) => i !== index && item.id === input.id.trim());
    if (duplicateIdIndex >= 0) {
      return { ok: false, message: '更新失败：输入编号和其他物品重复。' };
    }

    const next = [...this.items];
    next[index] = this.toItem(input);
    this.items = next;
    return { ok: true, message: `已更新物品 ${name}。` };
  }

  deleteByName(targetName: string): ActionResult {
    const name = targetName.trim();
    if (!name) {
      return { ok: false, message: '请输入要删除的物品名称。' };
    }

    const exists = this.items.some((item) => item.name === name);
    if (!exists) {
      return { ok: false, message: `未找到名称为 ${name} 的物品。` };
    }

    this.items = this.items.filter((item) => item.name !== name);
    return { ok: true, message: `已删除物品 ${name}。` };
  }

  createEmptyInput(): InventoryItemInput {
    return {
      id: '',
      name: '',
      category: '电子产品',
      quantity: 0,
      price: 0,
      supplier: '',
      stockStatus: '有货',
      isPopular: false,
      comments: ''
    };
  }

  private toItem(input: InventoryItemInput): InventoryItem {
    return {
      id: input.id.trim(),
      name: input.name.trim(),
      category: input.category,
      quantity: Number(input.quantity),
      price: Number(input.price),
      supplier: input.supplier.trim(),
      stockStatus: input.stockStatus,
      isPopular: input.isPopular,
      comments: input.comments.trim()
    };
  }

  private validateInput(input: InventoryItemInput): ActionResult {
    if (!input.id.trim()) {
      return { ok: false, message: '物品编号不能为空。' };
    }
    if (!input.name.trim()) {
      return { ok: false, message: '物品名称不能为空。' };
    }
    if (!input.supplier.trim()) {
      return { ok: false, message: '供应商名称不能为空。' };
    }
    if (!Number.isFinite(Number(input.quantity)) || Number(input.quantity) < 0) {
      return { ok: false, message: '数量必须是大于或等于 0 的数字。' };
    }
    if (!Number.isFinite(Number(input.price)) || Number(input.price) < 0) {
      return { ok: false, message: '价格必须是大于或等于 0 的数字。' };
    }
    return { ok: true, message: '验证通过。' };
  }
}
