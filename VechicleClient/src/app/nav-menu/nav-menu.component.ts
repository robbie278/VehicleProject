import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  selectedLanguage: string = 'en';
  isSidenavOpen: boolean = true;
  constructor(private router: Router) { }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  
  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
