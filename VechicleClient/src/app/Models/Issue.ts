import { ItemTypeCodeEnum } from "../enums/item-type-code.enum";

export interface Issue {
  transactionId: number;
  itemId: number;
  storeId: number;
  userId: number;
  storeKeeperId: number;
  transactionType: string;
  quantity: number;
  padNumberStart: number;
  padNumberEnd: number;
  storeName: string;
  storKeeperName: string;
  itemName: string;
  userName: string;
  itemTypeCode: ItemTypeCodeEnum;
}
