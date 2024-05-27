import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../Models/item';
import { ItemEditComponent } from '../item-edit/item-edit.component';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.scss']
})
export class ItemManagerComponent implements OnInit {
  items: Item[] = [
    { itemId: 1, name: 'Item 1', description: 'Description 1', categoryName: 'Category 1', categoryId: 1 },
    { itemId: 2, name: 'Item 2', description: 'Description 2', categoryName: 'Category 2', categoryId: 2 },
    // Add more items as needed
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openEditDialog(item?: Item): void {
    const dialogRef = this.dialog.open(ItemEditComponent, {
      width: '300px',
      data: item ? { ...item } : { itemId: null, name: '', description: '', categoryName: '', categoryId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.itemId) {
          // Edit existing item
          const index = this.items.findIndex(i => i.itemId === result.itemId);
          if (index > -1) {
            this.items[index] = result;
          }
        } else {
          // Add new item
          result.itemId = this.items.length + 1;
          this.items.push(result);
        }
      }
    });
  }

  deleteItem(itemId: number): void {
    this.items = this.items.filter(item => item.itemId !== itemId);
  }
}
