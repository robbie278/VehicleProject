import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Stock Management';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('am');
  }
}
