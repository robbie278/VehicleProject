import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-store-performance-chart',
  templateUrl: './store-performance-chart.component.html',
  styleUrls: ['./store-performance-chart.component.scss']
})
export class StorePerformanceChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: '#f4f4f4',
        borderRadius: 5,
      },
      title: {
        text: 'Store Performance',
        style: { color: '#333', fontWeight: 'bold' },
      },
      series: [{
        name: 'Stores',
        type: 'pie',
        data: [
          { name: 'Stockouts', y: 30, color: '#ff4d4d' },
          { name: 'Overstock', y: 70, color: '#4caf50' }
        ], // Replace with dynamic data
        innerSize: '60%',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%'
        }
      }],
      tooltip: {
        borderColor: '#333',
        backgroundColor: '#fff'
      }
    };
  }
}
