import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; 
import { MatSelectModule } from '@angular/material/select';
import {  MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
  
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule { }
