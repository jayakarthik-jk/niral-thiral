"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, type FC, useState } from "react";

interface IdScannerProps {
  onSucess: (id: string) => void;
}

const IdScanner: FC<IdScannerProps> = ({ onSucess: handleSuccess }) => {
  const [error, setError] = useState<string>();
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );
    html5QrcodeScanner.render(
      (id) => {
        if (typeof id !== "string" || id.length === 0 || isNaN(Number(id))) {
          return setError("Invalid QR Code");
        }
        handleSuccess(id);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [handleSuccess]);

  return (
    <div className="flex justify-center">
      {error && <div className="text-red-500">{error}</div>}
      <div id="reader" />
    </div>
  );
};

export default IdScanner;
