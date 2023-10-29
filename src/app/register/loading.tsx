import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-[url(/bg.jpg)]">
      <Loader2 width={50} height={50} className="animate-spin text-white" />
    </main>
  );
}
export default Loading;
