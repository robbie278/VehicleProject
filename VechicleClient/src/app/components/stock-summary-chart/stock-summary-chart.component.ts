import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ReportsService } from '../../services/reports.service';
import { StockSummaryChartData } from '../../models/StockSummary';

@Component({
  selector: 'app-stock-summary-chart',
  templateUrl: './stock-summary-chart.component.html',
  styleUrls: ['./stock-summary-chart.component.scss'],
})
export class StockSummaryChartComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  data: StockSummaryChartData[] = [];

  constructor(
    public reportsService: ReportsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.reportsService.getStockSummary().subscribe(
      (data) => {
        this.data = data;
        if (this.data && this.data.length) {
          // Check if data is not empty
          this.initializeChart();
          this.cdr.detectChanges(); // Trigger change detection
          setTimeout(() => {
            this.initializeChart();
          }, 0);
        }
      },
      (error) => {
        console.error('Error fetching data:', error); // Log if there's an error
      }
    );
  }

  initializeChart(): void {
    const categories = this.data.map((store) => store.storeName);
    const seriesData = this.data.flatMap((store) =>
      store.items.map((item) => ({
        name: `${store.storeName} - ${item.itemName}`, // Combine store and item names
        type: 'bar',
        data: [
          {
            y: item.quantityInStock,
            name: item.itemName, // Display item name clearly
          },
        ],
      }))
    );

    console.log('the series data is', seriesData);
    console.log('the categories is', categories);

    this.chartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Stock Quantities by Store and Item',
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Stores',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Quantity in Stock',
          align: 'high',
        },
      },
      tooltip: {
        headerFormat: '<b>{point.series.name}</b><br>',
        pointFormat: '{point.name}: {point.y} units',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}', // Make item names visible in labels
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333333',
            },
          },
        },
      },
      series: seriesData as Highcharts.SeriesOptionsType[],
    };

    // this.cdr.detectChanges(); // Ensure change detection is triggered
    Highcharts.chart('container', this.chartOptions);
  }
}
