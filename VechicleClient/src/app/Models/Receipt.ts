export interface Receipt {
  transactionId: number;
  itemId: number;
  storeId: number;
  storeKeeperId: number;
  transactionType: string;
  quantity: number;
  padNumberStart: number;
  padNumberEnd: number;
  storeName: string;
  storKeeperName: string;
  itemName: string;
}
