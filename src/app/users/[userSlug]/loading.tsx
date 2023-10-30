import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Loader2 className="animate-spin" size={50} />
      <p className="mt-3 text-sm font-bold text-black">Loading QR Code</p>
    </div>
  );
}
export default Loading;
