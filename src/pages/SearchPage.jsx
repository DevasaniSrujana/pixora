import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import ResultGrid from "../components/ResultGrid";
import SearchText from "../components/SearchText";
import Tabs from "../components/Tabs";
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SearchPage = () => {
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const searchRef = useRef(null);
  const tabRef = useRef(null);
  const resultRef = useRef(null);
  const paraRef = useRef(null);
  const query = useSelector((state) => state.search.query);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Navbar from top
    tl.from(
      navRef.current.children,
      {
        y: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      },
      0
    );
    tl.from(
      [searchRef.current, tabRef.current, resultRef.current, paraRef.current],
      {
        y: 50,
        opacity: 0,
        duration: 1,
      },
      0
    );

    tl.from(
      footerRef.current,
      {
        opacity: 0,
        duration: 0.6,
      },
      0
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 ref={navRef} />
      <SearchText ref={searchRef} />
      <div className="grow ">
        {query !== "" ? (
          <div className="w-full">
            <Tabs ref={tabRef} />
            <ResultGrid ref={resultRef} />
          </div>
        ) : (
          <p
            ref={paraRef}
            className="bg-linear-to-r from-[#765AE1] to-[#3C83E7]
    bg-clip-text text-transparent
    text-[5vw] font-bold uppercase
    flex items-center justify-center
   w-[90vw]
    text-center m-auto mt-5 p-5"
          >
            Start typing to explore amazing content
          </p>
        )}
      </div>
      <Footer ref={footerRef} />
    </div>
  );
};

export default SearchPage;
