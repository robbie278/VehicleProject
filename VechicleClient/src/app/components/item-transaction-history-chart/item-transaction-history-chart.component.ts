import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-item-transaction-history-chart',
  templateUrl: './item-transaction-history-chart.component.html',
  styleUrls: ['./item-transaction-history-chart.component.scss']
})
export class ItemTransactionHistoryChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'column',
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
        // stacked: true
      },
      title: {
        text: 'Item Transaction History',
        style: { color: '#333', fontWeight: 'bold' },
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar'], // Replace with dynamic data
        title: { text: 'Month' }
      },
      yAxis: {
        title: { text: 'Quantity' },
        min: 0,
        gridLineColor: '#ddd'
      },
      series: [{
        name: 'Issue',
        type: 'column',
        data: [5, 7, 3], // Replace with dynamic data
        color: '#ff6f61'
      }, {
        name: 'Receipt',
        type: 'column',
        data: [10, 8, 15], // Replace with dynamic data
        color: '#4caf50'
      }, {
        name: 'Damaged',
        type: 'column',
        data: [2, 3, 1], // Replace with dynamic data
        color: '#ffb74d'
      }, {
        name: 'Returned',
        type: 'column',
        data: [1, 2, 3], // Replace with dynamic data
        color: '#42a5f5'
      }],
      tooltip: {
        shared: true,
        borderColor: '#333',
        backgroundColor: '#fff'
      }
    };
  }
}
