const LoadingSkeleton = () => {
  return (
    <div className="flex w-full justify-between gap-5 overflow-auto mt-10 pl-2 pr-2 flex-wrap">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div
          key={idx}
          className="w-[18vw] h-[18vw] rounded-lg bg-gray-200 animate-pulse"
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
