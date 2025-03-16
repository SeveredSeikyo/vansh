declare module "georaster-layer-for-leaflet" {
    import { Layer } from "leaflet";
    import { GeoRaster } from "georaster";
  
    interface GeoRasterLayerOptions {
      georaster: GeoRaster;
      opacity?: number;
      resolution?: number;
    }
  
    class GeoRasterLayer extends Layer {
      constructor(options: GeoRasterLayerOptions);
    }
  
    export default GeoRasterLayer;
  }
  