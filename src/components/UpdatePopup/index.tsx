import React from "react";
import { VersionInfo } from "@/lib/versionChecker";

interface UpdatePopupProps {
  versionInfo: VersionInfo;
  onDismiss: () => void;
}

const UpdatePopup = ({ versionInfo, onDismiss }: UpdatePopupProps) => {
  const handleUpdate = () => {
    window.open(versionInfo.apkUrl, "_system");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Available</h2>
        <p className="text-gray-600 mb-6">
          A new version ({versionInfo.version}) is available!
          <br />
          <span className="block mt-2 font-medium">Release Notes:</span>
          <span className="block whitespace-pre-line">{versionInfo.releaseNotes}</span>
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            Later
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;