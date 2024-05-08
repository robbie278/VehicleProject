import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import {CategoriesEditComponent} from './categories/categories-edit.component';



const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoriesEditComponent },
  { path: 'category', component: CategoriesEditComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
