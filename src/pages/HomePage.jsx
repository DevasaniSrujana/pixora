import { useRef } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar1 from "../components/Navbar1";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomePage = () => {
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(() => {
    let t1 = gsap.timeline();
    t1.from(navRef.current.children, {
      y: -50,
      duration: 0.7,
      stagger: 0.25,
      opacity: 0,
    });
    t1.from(heroRef.current.children, {
      y: 50,
      duration: 0.7,
      stagger: 0.25,
      opacity: 0,
    });
    t1.from(footerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.3,
    });
  });

  return (
    <div>
      <Navbar1 ref={navRef} />
      <Hero ref={heroRef} />
      <Footer ref={footerRef} />
    </div>
  );
};

export default HomePage;
