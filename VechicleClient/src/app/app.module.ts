import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item/item-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesEditComponent } from './categories/categories-edit.component';
import { StoreKeeperComponent } from './store-keeper/store-keeper.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreKeeperEditComponent } from './store-keeper/store-keeper-edit.component';
import { StoreComponent } from './store/store.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditStoreComponent } from './store/edit-store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon } from '@angular/material/icon'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IssueComponent } from './issue/issue.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ItemModule } from './item-component/item.module';
import { EndpointFactoryService } from './endpoint-factory/endpoint-factory.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ItemComponent,
    ItemEditComponent,
    CategoriesComponent,
    CategoriesEditComponent,
    StoreKeeperComponent,
    StoreKeeperEditComponent,
    StoreComponent,
    EditStoreComponent,
    IssueComponent,
    ReceiptComponent,
    TransactionComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ItemModule,
    ToastrModule.forRoot()
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), EndpointFactoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}


