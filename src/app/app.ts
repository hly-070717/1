/*
 * Author: Your Name
 * Assessment Part: Part 1 - Basic TypeScript Inventory Application
 */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Part 1: TypeScript Inventory Manager';

  categories = ['电子产品', '家具', '服装', '工具', '其他'] as const;
  stockStates = ['有货', '库存不足', '无货'] as const;

  formModel: InventoryItemForm = this.createEmptyForm();
  updateName = '';
  deleteName = '';
  searchName = '';
  messageHtml = '<strong>欢迎：</strong>请先新增一个物品。';
  messageTone: MessageTone = 'info';

  items: InventoryItem[] = [
    {
      id: 'E1001',
      name: '蓝牙耳机',
      category: '电子产品',
      quantity: 24,
      price: 299,
      supplier: 'Harvey Supplies',
      stockStatus: '有货',
      isPopular: true,
      comments: '热销款'
    }
  ];
  filteredItems: InventoryItem[] = [...this.items];

  addItem(): void {
    const validationError = this.validateForm(this.formModel);
    if (validationError) {
      this.setMessage(validationError, 'error');
      return;
    }

    if (this.items.some((item) => item.id === this.formModel.id.trim())) {
      this.setMessage(`物品编号 ${this.formModel.id} 已存在，必须唯一。`, 'error');
      return;
    }

    const newItem: InventoryItem = {
      id: this.formModel.id.trim(),
      name: this.formModel.name.trim(),
      category: this.formModel.category,
      quantity: Number(this.formModel.quantity),
      price: Number(this.formModel.price),
      supplier: this.formModel.supplier.trim(),
      stockStatus: this.formModel.stockStatus,
      isPopular: this.formModel.isPopular,
      comments: this.formModel.comments.trim()
    };

    this.items = [...this.items, newItem];
    this.filteredItems = [...this.items];
    this.setMessage(`已新增物品：<strong>${newItem.name}</strong>。`, 'success');
    this.formModel = this.createEmptyForm();
  }

  updateByName(): void {
    const targetName = this.updateName.trim();
    if (!targetName) {
      this.setMessage('更新失败：请输入要更新的物品名称。', 'error');
      return;
    }

    const validationError = this.validateForm(this.formModel);
    if (validationError) {
      this.setMessage(`更新失败：${validationError}`, 'error');
      return;
    }

    const index = this.items.findIndex((item) => item.name === targetName);
    if (index < 0) {
      this.setMessage(`未找到名称为 ${targetName} 的物品。`, 'error');
      return;
    }

    const duplicateIdIndex = this.items.findIndex(
      (item, i) => i !== index && item.id === this.formModel.id.trim()
    );
    if (duplicateIdIndex >= 0) {
      this.setMessage('更新失败：新编号与其他物品重复。', 'error');
      return;
    }

    const updatedItem: InventoryItem = {
      id: this.formModel.id.trim(),
      name: this.formModel.name.trim(),
      category: this.formModel.category,
      quantity: Number(this.formModel.quantity),
      price: Number(this.formModel.price),
      supplier: this.formModel.supplier.trim(),
      stockStatus: this.formModel.stockStatus,
      isPopular: this.formModel.isPopular,
      comments: this.formModel.comments.trim()
    };

    const nextItems = [...this.items];
    nextItems[index] = updatedItem;
    this.items = nextItems;
    this.filteredItems = [...this.items];
    this.setMessage(`已更新物品：<strong>${targetName}</strong>。`, 'success');
  }

  deleteByName(): void {
    const targetName = this.deleteName.trim();
    if (!targetName) {
      this.setMessage('删除失败：请输入物品名称。', 'error');
      return;
    }

    const target = this.items.find((item) => item.name === targetName);
    if (!target) {
      this.setMessage(`未找到名称为 ${targetName} 的物品。`, 'error');
      return;
    }

    const shouldDelete = window.confirm(`确认删除物品 ${targetName} 吗？`);
    if (!shouldDelete) {
      this.setMessage('已取消删除。', 'info');
      return;
    }

    this.items = this.items.filter((item) => item.name !== targetName);
    this.filteredItems = [...this.items];
    this.setMessage(`已删除物品：<strong>${targetName}</strong>。`, 'success');
  }

  searchByName(): void {
    const keyword = this.searchName.trim().toLowerCase();
    if (!keyword) {
      this.filteredItems = [...this.items];
      this.setMessage('已清除搜索条件，显示全部物品。', 'info');
      return;
    }

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
    this.setMessage(`搜索完成：找到 ${this.filteredItems.length} 条记录。`, 'info');
  }

  showAllItems(): void {
    this.filteredItems = [...this.items];
    this.setMessage(`当前共有 ${this.items.length} 个物品。`, 'info');
  }

  showPopularItems(): void {
    this.filteredItems = this.items.filter((item) => item.isPopular);
    this.setMessage(`热门物品共 ${this.filteredItems.length} 个。`, 'info');
  }

  fillFormByName(name: string): void {
    const item = this.items.find((currentItem) => currentItem.name === name);
    if (!item) {
      this.setMessage(`未找到名称为 ${name} 的物品。`, 'error');
      return;
    }

    this.formModel = {
      ...item,
      comments: item.comments ?? ''
    };
    this.updateName = item.name;
    this.setMessage(`已将 ${name} 载入表单，可直接修改后更新。`, 'info');
  }

  private createEmptyForm(): InventoryItemForm {
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

  private validateForm(input: InventoryItemForm): string | null {
    if (!input.id.trim()) {
      return '物品编号不能为空。';
    }
    if (!input.name.trim()) {
      return '物品名称不能为空。';
    }
    if (!input.supplier.trim()) {
      return '供应商名称不能为空。';
    }
    if (!Number.isFinite(Number(input.quantity)) || Number(input.quantity) < 0) {
      return '数量必须是大于或等于 0 的数字。';
    }
    if (!Number.isFinite(Number(input.price)) || Number(input.price) < 0) {
      return '价格必须是大于或等于 0 的数字。';
    }

    return null;
  }

  private setMessage(message: string, tone: MessageTone): void {
    this.messageHtml = message;
    this.messageTone = tone;
  }
}

type Category = '电子产品' | '家具' | '服装' | '工具' | '其他';
type StockStatus = '有货' | '库存不足' | '无货';
type MessageTone = 'success' | 'error' | 'info';

interface InventoryItem {
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

interface InventoryItemForm {
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
