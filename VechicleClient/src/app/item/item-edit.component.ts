import { Component, OnInit } from '@angular/core';
import { ICategory } from '../Models/Category';
import { Item } from '../Models/item';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../Service/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.scss'
})
export class ItemEditComponent implements OnInit{
title?: string
item?: Item
id?: number
categories?: ICategory[]
form!: FormGroup
constructor(private itemService: ItemService,
  private activatedRoute: ActivatedRoute,  
  private router: Router,
  private toastr: ToastrService  

    
){}
ngOnInit() {
  this.form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required)
  })
  this.loadData()
}

  loadData(){
    
    this.loadCategories()
   
 //get id from Id from id parameter
 var idParam = this.activatedRoute.snapshot.paramMap.get('id')
  this.id = idParam ? +idParam : 0
  console.log(this.id);
  if(this.id){
    //Edit Mode
  
    //fetch storekeeper from server
    this.itemService.get(this.id).subscribe({
      next: (result) =>{
        this.item = result
        this.title = "Edit- " + this.item.name
  
        //populate the from with storeKeeper value
        this.form.patchValue(this.item)
      }
      })

      }
      else{
        //Add new Item
      
        this.title = 'Add new Item'
       }
      }
      
      loadCategories(){
        //fetch all categories from server
        this.itemService.getCategories().subscribe({
          next:(result) =>{
            this.categories = result
          },
          error: err => console.log(err)
        })
      }
      onSubmit(){
        var item = (this.id)? this.item : <Item>{}
    
        if(item){
          item.name = this.form.controls['name'].value
          item.description = this.form.controls['description'].value
          item.categoryId = this.form.controls['categoryId'].value
    
          if(this.id){
            //Edit Mode
    
            this.itemService.put(item).subscribe({
              next: ()=>{
                this.toastr.info("Item Updated Successfully")
                  //go back to storeKepper view
                  this.router.navigate(['/items'])
              },
              error: err => console.log(err)
            })
          }
          else{
            //Add New Mode
    
            this.itemService.post(item).subscribe({
              next: () =>{
                this.toastr.success("Item Inserted SuccessFully")
               //go back to storeKepper view
                this.router.navigate(['/items'])
              },
              error: err => console.log(err)
            })
          }
        }
      }
      onDelete(){
        // retrieve the ID from the 'id' parameter 
 var idParam = this.activatedRoute.snapshot.paramMap.get('id')
 var id = idParam ? +idParam : 0
 
 if(confirm("Are you sure to delete this Item")){

   this.itemService.delete(id).subscribe({
     next: () => {
       this.toastr.error("Item Deleted Successfully")
       this.router.navigate(['/items'])
     },
     error: (err) => console.log(err)
   })
 }
 }
}