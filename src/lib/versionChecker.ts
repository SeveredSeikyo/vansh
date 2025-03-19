import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

export interface VersionInfo {
  version: string;
  releaseNotes: string;
  apkUrl: string;
  sha256?: string; // Optional for hash verification
}

export class VersionChecker {
  private static async getCurrentVersion(): Promise<string> {
    if (Capacitor.isNativePlatform()) {
      const appInfo = await App.getInfo();
      return appInfo.version;
    }
    return process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'; // Set via build env
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
    const maxRetries = 3;
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        const url = "https://api.github.com/repos/SeveredSeikyo/vansh/releases/latest";
        const currentVersion = await this.getCurrentVersion();
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const release = await response.json();
        const remoteVersion: VersionInfo = {
          version: release.tag_name.replace('v', ''),
          releaseNotes: release.body,
          apkUrl: release.assets[0]?.browser_download_url || '',
        };

        if (this.compareVersions(currentVersion, remoteVersion.version)) {
          return remoteVersion;
        }
        return null;
      } catch (error) {
        attempts++;
        console.error(`Version check failed (attempt ${attempts}/${maxRetries}):`, error);
        if (attempts === maxRetries) return null;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    return null;
  }
}