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
import { MatIcon } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog-component/confirm-dialog-component.component';
import { TransactionEditComponent } from './transaction/transaction-edit.component';
import { FormsModule } from '@angular/forms';

import { TransactionViewComponent } from './transaction/transaction-view.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './custom-paginator/CustomPaginatorConfiguration';
import { LoginComponent } from './login/login.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { StockSummaryChartComponent } from './components/stock-summary-chart/stock-summary-chart.component';
import { StockTransactionChartComponent } from './components/stock-transaction-chart/stock-transaction-chart.component';
import { StorePerformanceChartComponent } from './components/store-performance-chart/store-performance-chart.component';
import { ItemTransactionHistoryChartComponent } from './components/item-transaction-history-chart/item-transaction-history-chart.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockStatusCardComponent } from './components/stock-status-card/stock-status-card.component';


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
    StockDetailComponent,
    ConfirmDialogComponent,
    TransactionEditComponent,
    TransactionViewComponent,
    LoginComponent,

    StockSummaryChartComponent,
    StockTransactionChartComponent,
    StorePerformanceChartComponent,
    ItemTransactionHistoryChartComponent,
    DashboardComponent,
    StockStatusCardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
