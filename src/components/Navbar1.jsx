import Baddge from "./Navbar/Baddge";
import Logo from "./Navbar/Logo";
import Navbuttons from "./Navbar/Navbuttons";
import { forwardRef } from "react";

const Navbar1 = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-between pt-4 pl-2 pr-2"
    >
      <Logo />
      <Baddge />
      <Navbuttons />
    </div>
  );
});

export default Navbar1;
