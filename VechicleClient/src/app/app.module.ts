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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreKeeperEditComponent } from './store-keeper/store-keeper-edit.component';
import { StoreComponent } from './store/store.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditStoreComponent } from './store/edit-store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon } from '@angular/material/icon'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog-component/confirm-dialog-component.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}




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
    TransactionFormComponent,
    TransactionComponent,
    HomeComponent,
    TransactionComponent,
    StockDetailComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}


