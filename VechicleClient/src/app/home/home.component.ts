import { Component, OnInit } from '@angular/core';
import { StockService } from '../Service/stock.service';
import { ReportService } from '../Service/report.service';
import { Stock } from '../Models/Stock';
import { Report } from '../Models/Report';
import { MatDialog } from '@angular/material/dialog';
import { StockDetailComponent } from '../stock-detail/stock-detail.component';
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  stockReport: Stock[] = [];
  displayedColumns: string[] = ['itemName', 'storeName', 'quantityInStock', 'lastUpdatedDate', 'action'];
  
  storeBalance: Stock[] = [];
  itemBalance: Stock[] = [];

  
  data:any;
  options: any; 

  storeData:any;
  storeOptions:any;

  constructor(private stockService: StockService,private reportService: ReportService,
             private dialog: MatDialog, private translate: TranslateService

  ) { 
    
  }

  ngOnInit(): void {
    this.stockService.getData().subscribe((data: Stock[]) => {
      this.stockReport = data;
    });
    this.reportService.getBalanceByStore().subscribe((data: Stock[]) => this.storeBalance = data)
    this.reportService.getBalanceByItem().subscribe((data: Stock[]) => this.itemBalance = data)
    this.totalQuantityByItem()
    this.totalQuantityByStore()
  }

  loadBalance(){
    
  }

  totalQuantityByItem(): void {  
    this.reportService.getTotalQuantityByItem().subscribe((response: any[]) => {  
      console.log('Raw response:', response);  
  
      if (response && response.length > 0) {  
        const labels = response.map(report => `Item ${report.itemName}`);  
        const quantities = response.map(report => report.quantityInStock);  
  
        console.log('Labels:', labels);  
        console.log('Quantities:', quantities);  
  
        // Define an array of colors for each bar  
        const colors = [  
          '#42A5F5', // Color for item 1  
          '#66BB6A', // Color for item 2  
          '#FFCA28', // Color for item 3  
          '#EF5350', // Color for item 4  
        
        ];  
  
        // Create a dataset with varying colors for each quantity  
        const datasets = quantities.map((quantity, index) => ({  
          label: `Total Quantity for Item ${response[index].itemName}`,  
          backgroundColor: colors[index % colors.length], // Cycle through colors  
          borderColor: colors[index % colors.length],  
          data: [quantity] // Each bar represents one quantity  
        }));  
  
        this.data = {  
          labels: labels,  
          datasets: datasets  
        };  
  
        this.options = {  
          responsive: true,  
          maintainAspectRatio: true,  
          scales: {  
            x: {  
              display: true,  
              title: {  
                display: true,  
                text: this.translate.instant('others.Items')  
              }  
            },  
            y: {  
              display: true,  
              title: {  
                display: true,  
                text: this.translate.instant('Transaction.quantity')  
              }  
            }  
          }  
        };  
      } else {  
        console.warn('No data available');  
      }  
    }, (error) => {  
      console.error('Error fetching report:', error);  
    });  
  }  
  
  totalQuantityByStore(): void {  
    this.reportService.getTotalQuantityByStore().subscribe((response: any[]) => {  
        console.log('Raw response:', response);  
  
        if (response && response.length > 0) {  
            const labels = response.map(report => `Store ${report.storeName}`);  
            const quantities = response.map(report => report.quantityInStock);  
  
            console.log('Labels:', labels);  
            console.log('Quantities:', quantities);  
  
            // Define an array of colors for each bar  
            const colors = ['#42A5F5', '#66BB6A', '#FFCA28', '#EF5350'];  
  
            // Create a dataset with varying colors for each quantity  
            const datasets = [{
                label: 'Total Quantity by Store',
                backgroundColor: quantities.map((_, index) => colors[index % colors.length]),
                borderColor: quantities.map((_, index) => colors[index % colors.length]),
                data: quantities // Use quantities directly for all bars
            }];  
  
            this.storeData = {  
                labels: labels,  
                datasets: datasets  
            };  
  
            this.storeOptions = {  
                responsive: true,  
                maintainAspectRatio: false,  
                scales: {  
                    x: {  
                        display: true,  
                        title: {  
                            display: true,  
                            text: this.translate.instant('others.Stores')  
                        }  
                    },  
                    y: {  
                        display: true,  
                        title: {  
                            display: true,  
                            text: this.translate.instant('Transaction.quantity')  
                        }  
                    }  
                }  
            };  
        } else {  
            console.warn('No data available');  
        }  
    }, (error) => {  
        console.error('Error fetching report:', error);  
    });  
}


  openDialog(storeId?: number, itemId?:number): void {
   
    const dialogRef = this.dialog.open(StockDetailComponent, {
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { storeId, itemId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        location.reload();
      }
    });
  }
}
