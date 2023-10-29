"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";
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
const useIdScanner = (id = "reader") => {
  const [scannerState, setScannerState] = useState<ScannerState>({
    state: "scanning",
  });

  const render = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      id,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );
    void html5QrcodeScanner.clear();
    html5QrcodeScanner.render(
      (id: string) => {
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
        void html5QrcodeScanner.clear();
      },
      (error: string) => {
        setScannerState({
          state: "error",
          error,
        });
        console.error(error);
      },
    );
  };

  return {
    ...scannerState,
    Component: <div id={id} />,
    render,
  };
};

export default useIdScanner;
