import { Component, OnInit } from '@angular/core';
import { StockService } from '../Service/stock.service';
import { Stock } from '../Models/Stock';
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
  

  constructor(private stockService: StockService,
             private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.stockService.getData().subscribe((data: Stock[]) => {
      this.stockReport = data;
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
