import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component'
import { EditStoreComponent } from './store/edit-store.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component'

const routes: Routes = [
  
  {path: 'store', component: StoreComponent, pathMatch:'full'},
  { path: 'storeEdit/:id', component: EditStoreComponent },
  {path:'navMenu',component: NavMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
