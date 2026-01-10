import { Search, Image, Sparkles, Video } from "lucide-react";

const EmptyState = ({ query, activeTab }) => {
  const getIcon = () => {
    switch (activeTab) {
      case "Photos":
        return <Image className="w-16 h-16 text-gray-400" />;
      case "GIFs":
        return <Sparkles className="w-16 h-16 text-gray-400" />;
      case "Videos":
        return <Video className="w-16 h-16 text-gray-400" />;
      default:
        return <Search className="w-16 h-16 text-gray-400" />;
    }
  };

  const getMessage = () => {
    switch (activeTab) {
      case "Photos":
        return `No photos found for "${query}"`;
      case "GIFs":
        return `No GIFs found for "${query}"`;
      case "Videos":
        return `No videos found for "${query}"`;
      default:
        return `No results found for "${query}"`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 py-12 px-4">
      <div className="mb-6">{getIcon()}</div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {getMessage()}
      </h2>
      <p className="text-gray-500 text-center max-w-md">
        Try adjusting your search terms or explore different categories to find
        what you're looking for.
      </p>
    </div>
  );
};

export default EmptyState;
