import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AngularMaterialModule } from './angular-material.module';
import { StoreKeeperComponent } from './store-keeper/store-keeper.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreKeeperEditComponent } from './store-keeper/store-keeper-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { StoreComponent } from './store/store.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditStoreComponent } from './store/edit-store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon } from '@angular/material/icon'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    StoreKeeperComponent,
    StoreKeeperEditComponent,
    StoreComponent,
    EditStoreComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),


  ],

  bootstrap: [AppComponent]
})
export class AppModule { }