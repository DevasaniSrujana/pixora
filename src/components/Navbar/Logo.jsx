import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
const Logo = forwardRef((props, ref) => {
  return (
    <Link to="/">
      <div ref={ref} className="flex items-center gap-2 active:scale-90">
        <Sparkles className="w-11 h-11 bg-linear-to-r from-[#765AE1] to-[#3C83E7] text-white p-2 rounded-xl " />
        <h1 className="text-2xl text-black font-bold ">Pixora</h1>
      </div>
    </Link>
  );
});

export default Logo;
