import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import CollectionCard from "../components/CollectionCard";
import { clearCollection, clearToast } from "../redux/features/collectionSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const CollectionPage = () => {
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const collectionRef = useRef(null);
  const emptyRef = useRef(null);
  const items = useSelector((state) => state.collection?.items || []);
  const dispatch = useDispatch();
  const clearFromCollection = () => {
    dispatch(clearCollection());
    dispatch(clearToast());
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (navRef.current) {
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
    }

    if (collectionRef.current) {
      tl.from(
        collectionRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
        },
        0
      );
    }

    if (emptyRef.current) {
      tl.from(
        emptyRef.current.children,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.25,
        },
        0
      );
    }

    if (footerRef.current) {
      tl.from(
        footerRef.current,
        {
          opacity: 0,
          duration: 1,
        },
        0
      );
    }
  }, [items.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar2 ref={navRef} />
      <div
        ref={collectionRef}
        className="flex items-center justify-between mt-10 pl-14 pr-14"
      >
        <div className="text-4xl font-bold">Your Collections</div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clearFromCollection();
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-3xl cursor-pointer
                text-xl font-semibold border-none bg-linear-to-r from-[#765AE1] to-[#3C83E7] text-white active:scale-90"
        >
          Clear Collection
        </button>
      </div>
      <div className="grow">
        {items.length === 0 ? (
          <div
            ref={emptyRef}
            className="flex flex-col items-center justify-center mt-24 text-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-32 h-28 text-gray-800 mx-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2h8l4 4v16H6V2z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M14 2v4h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 10l2 2M11 10l-2 2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M13 10l2 2M15 10l-2 2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M9 16c1.5-1.2 4.5-1.2 6 0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <h2 className="text-2xl font-semibold mt-6">Nothing saved yet</h2>
            <p className="text-gray-500 mt-2">
              Start exploring and add items to your collection
            </p>
          </div>
        ) : (
          <div className="flex w-full justify-start gap-5 overflow-auto mt-10 pl-6 pr-6 flex-wrap">
            {items.map((item) => (
              <CollectionCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <Footer ref={footerRef} />
    </div>
  );
};

export default CollectionPage;
