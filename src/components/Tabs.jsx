import { Landmark, Image, Sparkles, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";
import { forwardRef } from "react";

const Tabs = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);
  const tabs = [
    { label: "All", icon: Landmark },
    { label: "Photos", icon: Image },
    { label: "GIFs", icon: Sparkles },
    { label: "Videos", icon: Video },
  ];
  return (
    <div ref={ref} className="w-full flex justify-start pt-4 pl-2 pr-2">
      <div className="flex justify-between w-[40vw]">
        {tabs.map((elem) => {
          const Icon = elem.icon;
          const isActive = activeTab === elem.label;
          return (
            <button
              className={`flex items-center gap-3 px-4 py-2 rounded-3xl
                text-sm font-semibold
                transition-all duration-300
                ${
                  isActive
                    ? "bg-[#17171C] text-[#D5D4D3] shadow-lg"
                    : "bg-[#F9F7F3] text-gray-500 hover:bg-violet-100 hover:text-violet-600"
                }
              `}
              key={elem.label}
              onClick={() => {
                dispatch(setActiveTab(elem.label));
              }}
            >
              <Icon className="w-4 h-4" />
              {elem.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default Tabs;
