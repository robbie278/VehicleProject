import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesEditComponent } from './categories/categories-edit.component';
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
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard'; 




const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'storekeppers', component: StoreKeeperComponent, canActivate: [AuthGuard] },
  { path: 'storeKeeper/:id', component: StoreKeeperEditComponent, canActivate: [AuthGuard] },
  { path: 'storeKeeper', component: StoreKeeperEditComponent, canActivate: [AuthGuard] },
  { path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'storeEdit/:id', component: EditStoreComponent, canActivate: [AuthGuard] },
  { path: 'navMenu', component: NavMenuComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'category/:id', component: CategoriesEditComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoriesEditComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemComponent, canActivate: [AuthGuard] },
  { path: 'item/:id', component: ItemEditComponent, canActivate: [AuthGuard] },
  { path: 'item', component: ItemEditComponent, canActivate: [AuthGuard] },
  // newly created route
  { path: 'transaction-form', component: TransactionFormComponent, canActivate: [AuthGuard] },
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'transaction/:id', component: TransactionViewComponent, canActivate: [AuthGuard] },
  { path: 'transactions/view/:id', component: TransactionViewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
