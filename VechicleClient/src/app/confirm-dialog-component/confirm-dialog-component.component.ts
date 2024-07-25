import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { title } from 'process';

@Component({
  selector: 'app-confirm-dialog-component',
  templateUrl: './confirm-dialog-component.component.html',
  styleUrl: './confirm-dialog-component.component.scss'
})
export class ConfirmDialogComponent {
 title: string
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
