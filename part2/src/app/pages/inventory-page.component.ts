/*
 * Author: Your Name
 * Assessment Part: Part 2 - Basic Angular Inventory Application
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryItem, InventoryItemInput } from '../models/inventory-item.model';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.css'
})
export class InventoryPageComponent {
  form: InventoryItemInput;
  updateTargetName = '';
  deleteTargetName = '';
  listMode: 'all' | 'popular' = 'all';
  message = '可在此页完成新增、编辑、按名称更新和删除。';
  tone: 'info' | 'success' | 'error' = 'info';

  constructor(public inventoryService: InventoryService) {
    this.form = this.inventoryService.createEmptyInput();
  }

  get items(): InventoryItem[] {
    return this.listMode === 'all'
      ? this.inventoryService.getAllItems()
      : this.inventoryService.getPopularItems();
  }

  addItem(): void {
    const result = this.inventoryService.addItem(this.form);
    this.setNotice(result.message, result.ok ? 'success' : 'error');
    if (result.ok) {
      this.form = this.inventoryService.createEmptyInput();
      this.listMode = 'all';
    }
  }

  updateByName(): void {
    const result = this.inventoryService.updateByName(this.updateTargetName, this.form);
    this.setNotice(result.message, result.ok ? 'success' : 'error');
    if (result.ok) {
      this.listMode = 'all';
    }
  }

  deleteByName(): void {
    if (!this.deleteTargetName.trim()) {
      this.setNotice('请输入要删除的名称。', 'error');
      return;
    }

    const confirmed = window.confirm(`确认删除 ${this.deleteTargetName.trim()} 吗？`);
    if (!confirmed) {
      this.setNotice('已取消删除。', 'info');
      return;
    }

    const result = this.inventoryService.deleteByName(this.deleteTargetName);
    this.setNotice(result.message, result.ok ? 'success' : 'error');
  }

  loadToForm(name: string): void {
    const item = this.inventoryService.getAllItems().find((current) => current.name === name);
    if (!item) {
      this.setNotice(`未找到 ${name}。`, 'error');
      return;
    }

    this.form = {
      ...item,
      comments: item.comments ?? ''
    };
    this.updateTargetName = item.name;
    this.setNotice(`已载入 ${name}，可修改后执行更新。`, 'info');
  }

  showAll(): void {
    this.listMode = 'all';
    this.setNotice('当前显示全部物品。', 'info');
  }

  showPopular(): void {
    this.listMode = 'popular';
    this.setNotice('当前只显示热门物品。', 'info');
  }

  private setNotice(message: string, tone: 'info' | 'success' | 'error'): void {
    this.message = message;
    this.tone = tone;
  }
}
