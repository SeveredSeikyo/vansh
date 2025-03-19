// lib/versionChecker.ts
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

export interface VersionInfo {
  version: string;
  releaseNotes: string;
  apkUrl: string;
}

export class VersionChecker {
  private static async getCurrentVersion(): Promise<string> {
    if (Capacitor.isNativePlatform()) {
      const appInfo = await App.getInfo();
      return appInfo.version;
    }
    // For web, get from local version.json
    const localVersion = await fetch('/version.json').then(res => res.json());
    return localVersion.version;
  }

  private static compareVersions(current: string, remote: string): boolean {
    const currentParts = current.split('.').map(Number);
    const remoteParts = remote.split('.').map(Number);

    for (let i = 0; i < Math.max(currentParts.length, remoteParts.length); i++) {
      const currentNum = currentParts[i] || 0;
      const remoteNum = remoteParts[i] || 0;
      
      if (remoteNum > currentNum) return true;
      if (remoteNum < currentNum) return false;
    }
    return false;
  }

  static async checkForUpdates(): Promise<VersionInfo | null> {
    try {
      const currentVersion = await this.getCurrentVersion();
      const response = await fetch('https://your-api-endpoint.com/version.json');
      const remoteVersion: VersionInfo = await response.json();

      if (this.compareVersions(currentVersion, remoteVersion.version)) {
        return remoteVersion;
      }
      return null;
    } catch (error) {
      console.error('Version check failed:', error);
      return null;
    }
  }
}