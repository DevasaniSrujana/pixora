import { Search, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

const Navbuttons = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="flex items-center gap-3">
      <Link to="/search">
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-3xl 
                text-sm font-semibold border-none bg-[#F9F7F3] text-gray-500 active:scale-90"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </Link>
      <Link to="/collection">
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-3xl
                text-sm font-semibold border-none bg-[#F9F7F3] text-gray-500 active:scale-90"
        >
          <Save className="w-4 h-4" />
          Collections
        </button>
      </Link>
    </div>
  );
});

export default Navbuttons;
