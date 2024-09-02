export interface StockSummaryChartData {
        storeId: number,
        storeName: string,
        items: [
          {
            itemId: number,
            itemName: string,
            quantityInStock: number,
            lastUpdatedDate: string,
            reorderLevel: number
          }
        ]
}