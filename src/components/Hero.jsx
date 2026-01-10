import { Sparkles, MoveUpRight, WandSparkles } from "lucide-react";
import SearchText from "./SearchText";
import { forwardRef } from "react";

const Hero = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="w-[60vw] mt-10 m-auto">
      <h1 className="text-[5vw] font-bold leading-none text-center">
        Find the perfect <span className="text-[#765AE1]">visual</span>{" "}
        <span className="text-[#3C83E7]">inspiration</span>
      </h1>

      <p className="text-2xl text-gray-500 text-center leading-none mt-6">
        Search through millions of high-quality photos, GIFs, and videos. Save
        your favorites and create stunning collections.
      </p>
      <SearchText variant="hero" />
      <div className="btn w-[80%] flex justify-between mt-10 m-auto">
        <h3 className="text-gray-500 text-xs font-bold flex gap-2 items-center">
          <MoveUpRight />
          10M+ photos
        </h3>
        <h3 className="text-gray-500 text-xs font-bold flex gap-2 items-center">
          <WandSparkles />
          Free to use
        </h3>
        <h3 className="text-gray-500 text-xs font-bold flex gap-2 items-center">
          <Sparkles />
          AI-powered search
        </h3>
      </div>
    </div>
  );
});

export default Hero;
