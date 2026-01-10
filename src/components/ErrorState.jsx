import { AlertCircle } from "lucide-react";

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 py-12 px-4">
      <AlertCircle className="w-16 h-16 text-red-400 mb-6" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {error || "We couldn't load the results. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-[#765AE1] to-[#3C83E7] text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
