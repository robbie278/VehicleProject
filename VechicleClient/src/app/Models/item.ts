import { PlatePool } from "./PlatePool";

export interface Item {
    itemId: number;
    name: string;
    description: string;
    categoryId: number;
    platePool?: PlatePool; // Made optional in case it might not be present
  }