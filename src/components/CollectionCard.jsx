import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  removeCollection,
  removeToast,
} from "../redux/features/collectionSlice";

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch();
  if (!item) return null;

  const isVideo = item.type === "Videos";
  const removeFromCollection = (item) => {
    dispatch(removeCollection(item));
    dispatch(removeToast());
  };

  return (
    <div className="w-[18vw] h-[18vw] relative overflow-hidden group rounded-lg bg-white">
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
      <div
        className="absolute inset-0 bg-linear-to-t
                   from-black/60 via-black/20 to-transparent
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 z-10 pointer-events-none"
      />
      <div
        className="absolute bottom-3 left-3 text-white text-sm font-medium
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 z-20 pointer-events-none"
      >
        {item.title}
      </div>
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
              removeFromCollection(item);
            }}
          >
            <Trash className="w-5 h-5 active:scale-90 text-white group-hover/save:text-black" />
          </button>
          <span
            className="absolute -bottom-8 left-1/2 -translate-x-1/2
                       bg-white text-black text-xs px-2 py-1 rounded
                       opacity-0 group-hover/save:opacity-100
                       transition shadow-md whitespace-nowrap z-30"
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
