import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item/item-edit.component';

const routes: Routes = [
  { path: 'items', component: ItemComponent },
  {path:'item/:id', component: ItemEditComponent},
  {path:'item', component: ItemEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

