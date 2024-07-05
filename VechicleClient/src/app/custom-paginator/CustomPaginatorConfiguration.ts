import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomPaginator extends MatPaginatorIntl {

  constructor(private translate: TranslateService) {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.itemsPerPageLabel = this.translate.instant('items_per_page');
  }
}
