import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TransactionType } from '../enums/transaction-type.enum';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'] // Note: styleUrls instead of styleUrl
})
export class NavMenuComponent {
  selectedLanguage: string = 'en';
  isSidenavOpen: boolean = true;

  constructor(private router: Router, private dialog: MatDialog) { }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  issueDialog() {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { transactionType: TransactionType.Issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }

  receiptDialog() {
    const dialogRef = this.dialog.open(TransactionFormComponent, {
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { transactionType: TransactionType.Receipt }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
