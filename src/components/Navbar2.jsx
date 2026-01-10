import Logo from "./Navbar/Logo";
import Navbuttons from "./Navbar/Navbuttons";
import { forwardRef } from "react";
const Navbar2 = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-full bg-white flex items-center justify-between pt-4 pb-2 pl-2 pr-2"
    >
      <Logo />
      <Navbuttons />
    </div>
  );
});

export default Navbar2;
