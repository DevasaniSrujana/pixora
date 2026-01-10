import { Link } from "react-router-dom";
import { forwardRef } from "react";
const Footer = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-between pt-4 pl-2 pr-2 flex-col "
    >
      <div className="flex items-center w-[20%] justify-between">
        <Link to="/" className="text-gray-500 font-bold text-[15px]">
          Home
        </Link>
        <Link to="/search" className="text-gray-500 font-bold text-[15px]">
          Explore
        </Link>
        <Link to="/collection" className="text-gray-500 font-bold text-[15px]">
          Collections
        </Link>
      </div>
      <div className="text-gray-500 font-bold text-[15px] mt-2 mb-2">
        © Pixora. Crafted with care for creators.
      </div>
    </div>
  );
});

export default Footer;
