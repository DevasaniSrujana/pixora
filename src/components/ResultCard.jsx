import { Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToast, addToCollection } from "../redux/features/collectionSlice";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();
  const isVideo = item.type === "Videos";
  const addCollection = (item) => {
    dispatch(addToCollection(item));
    dispatch(addToast());
  };

  return (
    <div className="w-[18vw] h-[18vw] relative overflow-hidden group rounded-lg bg-white">
      {/* Media link */}
      <a href={item.url} target="_blank" rel="noreferrer">
        {isVideo ? (
          <video
            src={item.src}
            muted
            loop
            autoPlay
            className="h-full w-full object-cover cursor-pointer"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title}
            className="h-full w-full object-cover cursor-pointer"
          />
        )}
      </a>

      {/* Black transparent overlay */}
      <div
        className="absolute inset-0 bg-linear-to-t
                   from-black/60 via-black/20 to-transparent
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 z-10 pointer-events-none"
      />

      {/* Title */}
      <div
        className="absolute bottom-3 left-3 text-white text-sm font-medium
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 z-20 pointer-events-none"
      >
        {item.title}
      </div>

      {/* Save Button */}
      <div
        className="absolute top-3 right-3
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 z-20"
      >
        <div className="relative group/save">
          <button
            className="p-2 rounded-full active:scale-90 bg-black/50 hover:bg-white transition"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addCollection(item);
            }}
          >
            <Save className="w-5 h-5 active:scale-90 text-white group-hover/save:text-black" />
          </button>

          {/* Tooltip */}
          <span
            className="absolute -bottom-8 left-1/2 -translate-x-1/2
                       bg-white text-black text-xs px-2 py-1 rounded
                       opacity-0 group-hover/save:opacity-100
                       transition shadow-md whitespace-nowrap z-30"
          >
            Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
