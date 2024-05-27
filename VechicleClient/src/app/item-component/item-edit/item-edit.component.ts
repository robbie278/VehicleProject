import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../Models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
  editForm: FormGroup;
  categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' }
    // Add more categories as needed
  ];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    public dialogRef: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) {
    this.editForm = this.fb.group({
      itemId: [data.itemId],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      categoryId: [data.categoryId, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.editForm.valid) {
      this.itemService.updateItem(this.editForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (error) => console.error('Error updating item:', error)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
