import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemManagerComponent } from './item-manager/item-manager.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [
    ItemListComponent,
    ItemEditComponent,
    ItemManagerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ItemManagerComponent
  ],
})
export class ItemModule { }
