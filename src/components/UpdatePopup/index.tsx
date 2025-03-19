// components/UpdatePopup.tsx
import React from 'react';
import { IonAlert } from '@ionic/react'; // If using Ionic with Capacitor
import { VersionInfo } from '@/lib/versionChecker';

interface UpdatePopupProps {
  versionInfo: VersionInfo;
  onDismiss: () => void;
}

const UpdatePopup=({ versionInfo, onDismiss }:UpdatePopupProps) => {
  const handleUpdate = () => {
    window.open(versionInfo.apkUrl, '_system');
  };

  return (
    <IonAlert
      isOpen={true}
      header="Update Available"
      message={`A new version (${versionInfo.version}) is available!\n\nRelease Notes:\n${versionInfo.releaseNotes}`}
      buttons={[
        {
          text: 'Later',
          role: 'cancel',
          handler: onDismiss,
        },
        {
          text: 'Update',
          handler: handleUpdate,
        },
      ]}
      onDidDismiss={onDismiss}
    />
  );
};

export default UpdatePopup;