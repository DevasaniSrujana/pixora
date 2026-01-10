import { forwardRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchText = forwardRef((props, ref) => {
  const { variant = "default" } = props;
  const query = useSelector((state) => state.search.query);
  const [text, setText] = useState(query);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sync local state with Redux query when it changes
  useEffect(() => {
    setText(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    navigate("/search");
  };

  const styles = {
    default: {
      wrapper: "w-full flex justify-start pt-4 pl-2 pr-2",
      form: "relative w-[40vw]",
      x: "w-4 h-4",
      button: "absolute left-5 text-gray-500 w-5 h-5",
      input:
        "w-full bg-[#F9F5F3] pl-12 pr-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-violet-400",
    },

    hero: {
      wrapper: "w-full flex justify-center mt-10",
      form: "relative w-[50vw]",
      x: "w-6 h-6",
      button:
        "absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6 z-10",
      input:
        "relative z-0 w-full bg-white/70 backdrop-blur-md pl-14 pr-5 py-5 rounded-2xl text-lg shadow-lg outline-none focus:ring-2 focus:ring-violet-500",
    },
  };

  const current = styles[variant];

  return (
    <div ref={ref} className={current.wrapper}>
      <form className={current.form} onSubmit={handleSubmit}>
        <div className="flex items-center relative">
          <Search className={current.button} />

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search photos, GIFs, videos..."
            className={current.input}
          />

          {text && (
            <button
              type="button"
              onClick={() => {
                setText("");
                dispatch(setQuery(""));
              }}
              className="absolute right-5 text-gray-400 hover:text-black"
            >
              <X className={current.x} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
});

export default SearchText;
