import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-stock-transaction-chart',
  templateUrl: './stock-transaction-chart.component.html',
  styleUrls: ['./stock-transaction-chart.component.scss']
})
export class StockTransactionChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'line',
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
      },
      title: {
        text: 'Stock Transactions Over Time',
        style: { color: '#333', fontWeight: 'bold' },
      },
      xAxis: {
        type: 'datetime',
        title: { text: 'Date' }
      },
      yAxis: {
        title: { text: 'Quantity' },
        min: 0,
        gridLineColor: '#ddd'
      },
      series: [{
        name: 'Item 1',
        type: 'line',
        data: [
          [Date.UTC(2023, 8, 1), 5],
          [Date.UTC(2023, 8, 2), 10],
          [Date.UTC(2023, 8, 3), 8]
        ], // Replace with dynamic data
        color: '#7cb5ec'
      }],
      tooltip: {
        xDateFormat: '%Y-%m-%d',
        shared: true,
        borderColor: '#333',
        backgroundColor: '#fff'
      }
    };
  }
}
