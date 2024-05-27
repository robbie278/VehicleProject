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
import { IssueComponent } from './issue/issue.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ItemManagerComponent } from './item-component/item-manager/item-manager.component';

const routes: Routes = [
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
  { path: 'items-2', component: ItemManagerComponent },
  {path:'item/:id', component: ItemEditComponent},
  {path:'item', component: ItemEditComponent},
  // newly created route
  {path:'issue', component: IssueComponent},
  {path:'receipt', component: ReceiptComponent},
  {path:'transaction', component: TransactionComponent},
  
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

