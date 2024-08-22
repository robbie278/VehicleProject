import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionType } from '../enums/transaction-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  selectedLanguage: string = 'am';
  isSidenavOpen: boolean = false; // Default to closed
  isSidenavDisabled: boolean = true; // Default to disabled
  public transactionType = TransactionType;
  private loginStatusSub: Subscription | undefined;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.selectedLanguage = this.languageService.getStoredLanguage() || 'am';
    }

  ngOnInit(): void {
    // Subscribe to the login status observable
    this.loginStatusSub = this.authService.getLoginStatus().subscribe(isLoggedIn => {
      this.isSidenavDisabled = !isLoggedIn;
      this.isSidenavOpen = isLoggedIn && !this.isSidenavDisabled;
    });

    // Initial check
    const isLoggedIn = this.authService.isLoggedIn();
    this.isSidenavDisabled = !isLoggedIn;
    this.isSidenavOpen = isLoggedIn && !this.isSidenavDisabled;
  }

  
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.loginStatusSub) {
      this.loginStatusSub.unsubscribe();
    }
  }

  toggleSidenav() {
    if (!this.isSidenavDisabled) {
      this.isSidenavOpen = !this.isSidenavOpen;
    }
  }

  openTransactionDialog(transactionType: TransactionType) {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      width: '70%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { transactionType: transactionType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // if (result) {
      //   this.router.navigate(['']);
      // }
    });
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
    this.selectedLanguage = language;
  }

  logout() {
    console.log('User logged out');
    this.authService.logout();
    this.isSidenavDisabled = true;
    this.isSidenavOpen = false;
  }
}
