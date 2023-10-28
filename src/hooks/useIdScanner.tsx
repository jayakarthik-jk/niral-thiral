import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

type ScannerState =
  | {
      // loading state
      state: "scanning";
    }
  | {
      // failure state
      state: "error";
      error: string;
    }
  | {
      // success state
      state: "success";
      id: number;
    };

/**
 *
 * @returns ScannerState and Component to render
 *
 * Don't forget to add the Component to the page
 */
const useIdScanner = () => {
  const [scannerState, setScannerState] = useState<ScannerState>({
    state: "scanning",
  });

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );
    html5QrcodeScanner.render(
      (id) => {
        if (typeof id !== "string" || id.length === 0 || isNaN(Number(id))) {
          return setScannerState({
            state: "error",
            error: "Invalid QR Code",
          });
        }
        setScannerState({
          state: "success",
          id: Number(id),
        });
      },
      (error) => {
        setScannerState({
          state: "error",
          error,
        });
        console.error(error);
      },
    );
  }, []);

  return {
    ...scannerState,
    Component: <div id="reader" />,
  };
};

export default useIdScanner;
