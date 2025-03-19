// ✅ Fix: Add `export {}` to ensure it's treated as a module
export {};

declare module "@capacitor/core" {
  interface PluginRegistry {
    NearbyConnections: NearbyConnectionsPlugin;
  }
}

export interface NearbyConnectionsPlugin {
    startAdvertising(): Promise<void>;
    startDiscovery(): Promise<void>;
    stopAdvertising(): Promise<void>;
    stopDiscovery(): Promise<void>;
    sendData(options: { data: string }): Promise<void>;
    addListener(eventName: "onDataReceived", callback: (data: { endpointId: string; data: string }) => void): Promise<PluginListenerHandle>;
}
