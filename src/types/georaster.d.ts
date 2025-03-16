// src/types/georaster.d.ts
declare module "georaster" {
    export interface GeoRaster {
      noDataValue?: number;
      width: number;
      height: number;
      pixelHeight: number;
      pixelWidth: number;
      projection: string;
      values: number[][][];
    }
  
    const GeoRaster: (data: ArrayBuffer) => Promise<GeoRaster>;
    export default GeoRaster;
}
  