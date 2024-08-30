import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { StockService } from '../services/stock.service';
import { ReportService } from '../services/report.service';
import { Stock } from '../Models/Stock';
import { Report } from '../Models/Report';
import { MatDialog } from '@angular/material/dialog';
import { StockDetailComponent } from '../stock-detail/stock-detail.component';
import { TranslateService } from '@ngx-translate/core'

// high chart libs import
import { Chart } from 'angular-highcharts';

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

  
  
  options: any; 

  storeData:any;
  storeOptions:any;

  chart: Chart | undefined;
  storeChart : Chart | undefined;

  constructor(private stockService: StockService,private reportService: ReportService,
             private dialog: MatDialog, private translate: TranslateService,
             @Inject(PLATFORM_ID) private platformId: Object

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
  
        this.chart = new Chart({
          chart: {
            type: 'column',
            options3d: {
              enabled: true,
              alpha: 15,
              beta: 15,
              viewDistance: 25,
              depth: 40
            }
          },
          title: {
            text: 'Total Quantity by Item',
            align: 'left'
          },
          xAxis: {
            categories: labels,
            labels: {
              skew3d: true,
              style: {
                fontSize: '16px'
              }
            }
          },
          yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
              text: this.translate.instant('Transaction.quantity'),
              skew3d: true,
              style: {
                fontSize: '16px'
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> ' +
              '{series.name}: {point.y}'
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              depth: 40
            }
          },
          series: response.map(report => ({
            type: 'column',  // Specify the type here
            name: report.itemName,
            data: [report.quantityInStock],
            stack: 'Items'
          }))
        });
  
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
  
        this.storeChart = new Chart({
          chart: {
            type: 'pie', // Change chart type to 'pie'
            options3d: {
              enabled: true,
              alpha: 15
            }
          },
          title: {
            text: 'Total Quantity by Store',
            align: 'left'
          },
          tooltip: {
            pointFormat: '<b>{point.name}</b>: {point.y}'
          },
          plotOptions: {
            pie: {
              innerSize: 100, // Adjust as needed for a 3D effect
              depth: 45,
              dataLabels: {
                format: '{point.name}: {point.y}'
              }
            }
          },
          series: [{
            type: 'pie', // Specify the type here
            name: 'Stores',
            data: response.map(report => [report.storeName, report.quantityInStock])
          }]
        });
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
