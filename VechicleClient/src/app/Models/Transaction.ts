import { PlatePool } from "./PlatePool";

export interface Transaction{
    stockTransactionId:number;
    transactionType:string;
    storeName:string;
    userName:string;
    storeKeeperName:string;
    itemName:string;
    storeId:number;
    userId:number;
    quantity:number;
    padNumberStart:number;
    padNumberEnd:number
    itemId:number;
    storeKeeperId:number;
    transactionDate: Date;

    platePool?: PlatePool; // Made optional in case it might not be present
}