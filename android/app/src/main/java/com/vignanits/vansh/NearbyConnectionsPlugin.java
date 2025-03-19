package com.vignanits.vansh;

import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.*;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.nearby.Nearby;
import com.google.android.gms.nearby.connection.*;
import java.util.ArrayList;
import java.util.List;

@CapacitorPlugin(name = "NearbyConnections")
public class NearbyConnectionsPlugin extends Plugin {
    private static final String SERVICE_ID = "com.vignanits.vansh.lostitems";
    private static final Strategy STRATEGY = Strategy.P2P_CLUSTER;
    private ConnectionsClient connectionsClient;
    private final List<String> connectedEndpoints = new ArrayList<>(); // Track connected devices

    @Override
    public void load() {
        connectionsClient = Nearby.getConnectionsClient(getContext());
        Log.d("NearbyConnections", "Plugin loaded");
    }

    @PluginMethod
    public void startAdvertising(PluginCall call) {
        try {
            connectionsClient.startAdvertising(
                "UserDevice", // Display name for the device
                SERVICE_ID,
                connectionLifecycleCallback,
                new AdvertisingOptions.Builder().setStrategy(STRATEGY).build()
            ).addOnSuccessListener(aVoid -> {
                Log.d("NearbyConnections", "Advertising started successfully");
                call.resolve();
            }).addOnFailureListener(e -> {
                Log.e("NearbyConnections", "Failed to start advertising: " + e.getMessage());
                call.reject("Failed to start advertising: " + e.getMessage());
            });
        } catch (Exception e) {
            Log.e("NearbyConnections", "Exception in startAdvertising: " + e.getMessage());
            call.reject("Exception: " + e.getMessage());
        }
    }

    @PluginMethod
    public void startDiscovery(PluginCall call) {
        try {
            connectionsClient.startDiscovery(
                SERVICE_ID,
                endpointDiscoveryCallback,
                new DiscoveryOptions.Builder().setStrategy(STRATEGY).build()
            ).addOnSuccessListener(aVoid -> {
                Log.d("NearbyConnections", "Discovery started successfully");
                call.resolve();
            }).addOnFailureListener(e -> {
                Log.e("NearbyConnections", "Failed to start discovery: " + e.getMessage());
                call.reject("Failed to start discovery: " + e.getMessage());
            });
        } catch (Exception e) {
            Log.e("NearbyConnections", "Exception in startDiscovery: " + e.getMessage());
            call.reject("Exception: " + e.getMessage());
        }
    }

    @PluginMethod
    public void stopAdvertising(PluginCall call) {
        connectionsClient.stopAdvertising();
        Log.d("NearbyConnections", "Advertising stopped");
        call.resolve();
    }

    @PluginMethod
    public void stopDiscovery(PluginCall call) {
        connectionsClient.stopDiscovery();
        Log.d("NearbyConnections", "Discovery stopped");
        call.resolve();
    }

    @PluginMethod
    public void sendData(PluginCall call) {
        String data = call.getString("data");
        if (data == null) {
            call.reject("No data provided");
            return;
        }

        Payload payload = Payload.fromBytes(data.getBytes());
        synchronized (connectedEndpoints) {
            if (connectedEndpoints.isEmpty()) {
                Log.w("NearbyConnections", "No connected endpoints to send data to");
                call.resolve(); // Resolve anyway, no error since no peers is valid
                return;
            }

            for (String endpointId : connectedEndpoints) {
                connectionsClient.sendPayload(endpointId, payload)
                    .addOnSuccessListener(aVoid -> Log.d("NearbyConnections", "Data sent to " + endpointId))
                    .addOnFailureListener(e -> Log.e("NearbyConnections", "Failed to send data to " + endpointId + ": " + e.getMessage()));
            }
        }
        call.resolve();
    }

    private final EndpointDiscoveryCallback endpointDiscoveryCallback = new EndpointDiscoveryCallback() {
        @Override
        public void onEndpointFound(@NonNull String endpointId, @NonNull DiscoveredEndpointInfo info) {
            Log.d("NearbyConnections", "Endpoint found: " + endpointId);
            connectionsClient.requestConnection("UserDevice", endpointId, connectionLifecycleCallback)
                .addOnSuccessListener(aVoid -> Log.d("NearbyConnections", "Connection requested to " + endpointId))
                .addOnFailureListener(e -> Log.e("NearbyConnections", "Connection request failed: " + e.getMessage()));
        }

        @Override
        public void onEndpointLost(@NonNull String endpointId) {
            Log.d("NearbyConnections", "Endpoint lost: " + endpointId);
        }
    };

    private final ConnectionLifecycleCallback connectionLifecycleCallback = new ConnectionLifecycleCallback() {
        @Override
        public void onConnectionInitiated(@NonNull String endpointId, @NonNull ConnectionInfo connectionInfo) {
            Log.d("NearbyConnections", "Connection initiated with " + endpointId);
            connectionsClient.acceptConnection(endpointId, payloadCallback)
                .addOnSuccessListener(aVoid -> Log.d("NearbyConnections", "Connection accepted with " + endpointId))
                .addOnFailureListener(e -> Log.e("NearbyConnections", "Failed to accept connection: " + e.getMessage()));
        }

        @Override
        public void onConnectionResult(@NonNull String endpointId, ConnectionResolution resolution) {
            if (resolution.getStatus().isSuccess()) {
                Log.d("NearbyConnections", "Connected to " + endpointId);
                synchronized (connectedEndpoints) {
                    connectedEndpoints.add(endpointId);
                }
            } else {
                Log.e("NearbyConnections", "Connection failed with " + endpointId + ": " + resolution.getStatus());
            }
        }

        @Override
        public void onDisconnected(@NonNull String endpointId) {
            Log.d("NearbyConnections", "Disconnected from " + endpointId);
            synchronized (connectedEndpoints) {
                connectedEndpoints.remove(endpointId);
            }
        }
    };

    private final PayloadCallback payloadCallback = new PayloadCallback() {
        @Override
        public void onPayloadReceived(@NonNull String endpointId, Payload payload) {
            byte[] bytes = payload.asBytes();
            if (bytes != null) {
                String receivedData = new String(bytes);
                Log.d("NearbyConnections", "Payload received from " + endpointId + ": " + receivedData);
                JSObject ret = new JSObject();
                ret.put("endpointId", endpointId);
                ret.put("data", receivedData);
                notifyListeners("onDataReceived", ret);
            } else {
                Log.w("NearbyConnections", "Received null payload from " + endpointId);
            }
        }

        @Override
        public void onPayloadTransferUpdate(@NonNull String endpointId, PayloadTransferUpdate update) {
            Log.d("NearbyConnections", "Payload transfer update for " + endpointId + ": " + update.getStatus());
        }
    };
}