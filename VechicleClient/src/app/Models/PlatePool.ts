export interface PlatePool {
  platePoolId: number;
  assignStatus: number;
  plateNumber: string;
  majorId: number;
  minorId: number;
  plateSizeId: number;
  vehicleCategoryId: number;
  plateRegionId: number;
  createdDate: string; // You may use Date type if you handle date manipulation
  createdByUsername: string;
  createdByUserId: string;
  lastModifiedDate: string; // You may use Date type if you handle date manipulation
  lastModifiedByUsername: string;
  lastModifiedByUserId: string;
  isDeleted: boolean;
  deletedDate: string | null; // You may use Date type if you handle date manipulation
  deletedByUsername: string | null;
  deletedByUserId: string | null;
  isActive: boolean;
}
