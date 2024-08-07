import { PlatePool } from "./PlatePool";

export interface Item {
    itemId: number;
    name: string;
    description: string;
    categoryId: number;
    isPlate: boolean 
  }