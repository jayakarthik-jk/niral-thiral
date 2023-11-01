import { Loader2 } from "lucide-react";

const Loader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {children}
      <Loader2 className="animate-spin" size={32} />
    </div>
  );
};

export default Loader;
