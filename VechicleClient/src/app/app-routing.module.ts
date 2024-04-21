import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreKeeperComponent } from './store-keeper/store-keeper.component';
import { StoreKeeperEditComponent } from './store-keeper/store-keeper-edit.component';

const routes: Routes = [
  { path: 'storekeppers', component: StoreKeeperComponent },
  {path:'storeKeeper/:id', component: StoreKeeperEditComponent},
  {path:'storeKeeper', component: StoreKeeperEditComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
