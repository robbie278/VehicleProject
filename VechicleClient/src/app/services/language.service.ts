import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageKey = 'selectedLanguage';

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject the platform ID
  ) {
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage) {
      this.translate.use(storedLanguage);
    } else {
      this.setLanguage('am'); // Set default language if none is stored
    }
  }

  setLanguage(language: string): void {
    this.translate.use(language);
    this.storeLanguage(language);
  }

  getStoredLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      // Check if the code is running in the browser
      return localStorage.getItem(this.languageKey);
    }
    return null;
  }

  storeLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check if the code is running in the browser
      localStorage.setItem(this.languageKey, language);
    }
  }
}
