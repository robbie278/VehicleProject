import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-stock-status-card',
  templateUrl: './stock-status-card.component.html',
  styleUrls: ['./stock-status-card.component.scss']
})
export class StockStatusCardComponent implements OnInit {
  stockStatus: any[] = [];
  totalIssueBalance: number = 0; // Total balance for items in "Issue" state
  selectedSiteId?: number; // For storing the selected site ID
  sites: any[] = []; // List of available sites for the dropdown

  constructor(private reportService: ReportsService) {}

  ngOnInit(): void {
    this.getSites();
    this.getStockStatusForAllSites(); // Default to showing all sites
  }

  getSites(): void {
    this.reportService.getStockSummary().subscribe(data => {
      this.sites = data.map((store: { storeId: number; storeName: string; }) => ({
        id: store.storeId,
        name: store.storeName
      }));
    });
  }

  onSiteChange(e: Event): void {
    this.selectedSiteId = +(event.target as HTMLInputElement).value;
    if (this.selectedSiteId) {
      this.getStockStatusBySite(this.selectedSiteId);
    } else {
      this.getStockStatusForAllSites();
    }
  }

  getStockStatusBySite(siteId: number): void {
    this.reportService.getStockSummary().subscribe(data => {
      const site = data.find((store: { storeId: number; }) => store.storeId === siteId);
      if (site) {
        this.stockStatus = this.categorizeItemsByStatus(site.items);
        this.calculateTotalIssueBalance();
      }
    });
  }

  getStockStatusForAllSites(): void {
    this.reportService.getStockSummary().subscribe(data => {
      const allItems = data.flatMap((store: { items: any; }) => store.items);
      this.stockStatus = this.categorizeItemsByStatus(allItems);
      this.calculateTotalIssueBalance();
    });
  }

  categorizeItemsByStatus(items: any[]): any[] {
    const categories = {
      'Issue': [],
      'Receipt': [],
      'Damaged': []
    };

    items.forEach(item => {
      if (item.quantityInStock > 50) {
        categories['Issue'].push(item);
      } else if (item.quantityInStock > 0 && item.quantityInStock <= 50) {
        categories['Receipt'].push(item);
      } else {
        categories['Damaged'].push(item);
      }
    });

    return Object.keys(categories).map(key => ({
      status: key,
      items: categories[key]
    }));
  }

  calculateTotalIssueBalance(): void {
    const issueItems = this.stockStatus.find(status => status.status === 'Issue');
    this.totalIssueBalance = issueItems ? issueItems.items.reduce((total, item) => total + item.quantityInStock, 0) : 0;
  }
}
