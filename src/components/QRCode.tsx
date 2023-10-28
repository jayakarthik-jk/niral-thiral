"use client";
import { type FC } from "react";
import NativeQRCode from "react-qr-code";

interface QRCodeProps {
  userId: string;
}
const QRCode: FC<QRCodeProps> = ({ userId }) => {
  return <NativeQRCode size={256} className="h-64 w-64" value={userId} />;
};

export default QRCode;
