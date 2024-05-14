import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreKeeperComponent } from './store-keeper/store-keeper.component';
import { StoreKeeperEditComponent } from './store-keeper/store-keeper-edit.component';
import { StoreComponent } from './store/store.component';
import { EditStoreComponent } from './store/edit-store.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

const routes: Routes = [
  { path: 'storekeppers', component: StoreKeeperComponent },
  {path:'storeKeeper/:id', component: StoreKeeperEditComponent},
  {path:'storeKeeper', component: StoreKeeperEditComponent},
  {path: 'store', component: StoreComponent, pathMatch:'full'},
  { path: 'storeEdit/:id', component: EditStoreComponent },
  {path:'navMenu',component: NavMenuComponent }
  
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
