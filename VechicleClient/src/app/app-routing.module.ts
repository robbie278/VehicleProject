import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import {CategoriesEditComponent} from './categories/categories-edit.component';
import { StoreKeeperComponent } from './store-keeper/store-keeper.component';
import { StoreKeeperEditComponent } from './store-keeper/store-keeper-edit.component';
import { StoreComponent } from './store/store.component';
import { EditStoreComponent } from './store/edit-store.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item/item-edit.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';
import { TransactionViewComponent } from './transaction/transaction-view.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'storekeppers', component: StoreKeeperComponent },
  {path:'storeKeeper/:id', component: StoreKeeperEditComponent},
  {path:'storeKeeper', component: StoreKeeperEditComponent},
  {path: 'store', component: StoreComponent},
  { path: 'storeEdit/:id', component: EditStoreComponent },
  {path:'navMenu',component: NavMenuComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoriesEditComponent },
  { path: 'category', component: CategoriesEditComponent },
  { path: 'items', component: ItemComponent },
  {path:'item/:id', component: ItemEditComponent},
  {path:'item', component: ItemEditComponent},
  // newly created route
  {path:'transaction-form', component: TransactionFormComponent},
  {path:'transaction', component: TransactionComponent},
  { path: 'transaction/:id', component: TransactionViewComponent },
  { path: 'transactions/view/:id', component: TransactionViewComponent },



]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

