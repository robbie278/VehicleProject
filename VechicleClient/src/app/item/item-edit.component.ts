import { Component, Inject, OnInit } from '@angular/core';
import { ICategory } from '../Models/Category';
import { Item } from '../Models/item';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../Service/item.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.scss'
})
export class ItemEditComponent implements OnInit{
title: string
item!: Item
id: number
categories!: ICategory[]
form!: FormGroup

constructor(
  public dialogRef: MatDialogRef<ItemEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private itemService: ItemService,
  private toastr: ToastrService     
){
  this.id = data.id;
  this.title = this.id ? 'Edit Item' : 'Create Item';
}

ngOnInit() {
  this.instantiateForm();
  this.loadCategories();
  if(this.id){
    this.fetchData()
  }
}

 instantiateForm(){
  this.form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required)
  },null, this.isDupeItem())}

fetchData() {
  this.itemService.get(this.id).subscribe({
    next: (result) => {
      this.item = result;
      this.form.patchValue(this.item);
    },
    error: (error) => console.error(error)
  });
}
  
   loadCategories(){
        //fetch all categories from server
        this.itemService.getCategories().subscribe({
          next:(result) =>{
            this.categories = result.data as ICategory[]
            console.log(result);
          },
          error: err => console.log(err)
        })
      }


      onSubmit() {
        const item = this.id ? this.item : <Item>{}
        item.name = this.form.controls['name'].value
        item.description = this.form.controls['description'].value
        item.categoryId = this.form.controls['categoryId'].value
    
        if (this.id) {
          this.itemService.put(item).subscribe({
            next: () => {
              this.toastr.info('Item Updated Successfully');
              this.dialogRef.close(true);
            },
            error: (error) => console.error(error)
          });
        } else {
          this.itemService.post(item).subscribe({
            next: () => {
              this.toastr.success('Item Added Successfully');
              this.dialogRef.close(true);
            },
            error: (error) => console.error(error)
          });
        }
      }
    
      onCancel(): void {
        this.dialogRef.close();
      }
      isDupeItem(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      
          var item = <Item>{};
          item.itemId = (this.id) ? this.id : 0;
          item.name = this.form.controls['name'].value; 
          item.description = this.form.controls['description'].value; 
          item.categoryId = this.form.controls['categoryId'].value; 

         return this.itemService.isDupeItem(item).pipe(map(result => {
      
            return (result ? { isDupeItem: true } : null);
          }));
}
}
}
