import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IssueComponent } from '../issue/issue.component';
import { ReceiptComponent } from '../receipt/receipt.component';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  selectedLanguage: string = 'en';
  isSidenavOpen: boolean = true;
  constructor(private router: Router,private dialog: MatDialog) { }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }


  issueDialog(){
    const dialogRef = this.dialog.open(IssueComponent, {
      width: '40%',
      height: '90%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([''])
      }
    });
  }

  receiptDialog(){
    const dialogRef = this.dialog.open(ReceiptComponent, {
      width: '40%',
      height: '90%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([''])
      }
    });
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
