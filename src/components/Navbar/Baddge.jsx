import { Sparkles } from "lucide-react";
import { forwardRef } from "react";

const Baddge = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center gap-2 bg-[#f2f2f0] px-4 py-2 rounded-3xl"
    >
      <Sparkles className="w-4 h-4 text-[#765AE1]" />
      <h1 className="text-xs text-gray-700 font-bold">
        Discover millions of visual assets
      </h1>
    </div>
  );
});

export default Baddge;
