import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionType } from '../enums/transaction-type.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'] // Note: styleUrls instead of styleUrl
})
export class NavMenuComponent {
  selectedLanguage: string = 'am';
  isSidenavOpen: boolean = true;
  public transactionType = TransactionType;

  constructor(private router: Router, private dialog: MatDialog, private translate: TranslateService) { 
    this.translate.setDefaultLang('am');
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  openTransactionDialog( transactionType: TransactionType) {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      width:'70%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { transactionType: transactionType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
