import { Component, OnInit } from '@angular/core';
import { StockService } from '../Service/stock.service';
import { ReportService } from '../Service/report.service';
import { Stock } from '../Models/Stock';
import { Report } from '../Models/Report';
import { MatDialog } from '@angular/material/dialog';
import { StockDetailComponent } from '../stock-detail/stock-detail.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  stockReport: Stock[] = [];
  displayedColumns: string[] = ['itemName', 'storeName', 'quantityInStock', 'lastUpdatedDate', 'action'];

  
  data:any;
  options: any; 

  constructor(private stockService: StockService,private reportService: ReportService,
             private dialog: MatDialog

  ) { 
    
  }

  ngOnInit(): void {
    this.stockService.getData().subscribe((data: Stock[]) => {
      this.stockReport = data;
    });
    this.zreport()
  }

  zreport():void{
    this.reportService.getTotalQuantityByItem().subscribe((response: any[]) => {
      const labels = response.map(report => `item ${report.itemId}`);
      const quantities = response.map(report => report.quantityInStock);
      console.log(labels)
      console.log(response)


      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Total Quantity',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: quantities
          }
        ]
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Items'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Quantity'
            }
          }
        }
      };
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
