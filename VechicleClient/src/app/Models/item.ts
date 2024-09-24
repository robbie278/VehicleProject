// import { PlatePool } from "./PlatePool";

import { ItemTypeCodeEnum } from "../enums/item-type-code.enum";

export interface Item {
    itemId: number;
    name: string;
    description: string;
    nameAm: string;
    descriptionAm: string;
    categoryId: number;
    isPlate: boolean;
    itemTypeCode: ItemTypeCodeEnum;
  }