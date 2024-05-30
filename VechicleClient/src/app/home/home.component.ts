import { Component, OnInit } from '@angular/core';
import { StockService } from '../Service/stock.service';
import { Stock } from '../Models/Stock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  stockReport: Stock[] = [];
  displayedColumns: string[] = ['itemName', 'storeName', 'quantityInStock', 'lastUpdatedDate'];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getData().subscribe((data: Stock[]) => {
      this.stockReport = data;
    });
  }
}
