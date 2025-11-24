import { useState, useEffect } from "react";

interface WebsiteLoaderProps {
  isLoading?: boolean;
  onLoadingComplete?: () => void;
}

export default function WebsiteLoader({
  isLoading = true,
  onLoadingComplete,
}: WebsiteLoaderProps) {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Loading text */}
        <div className="text-sm font-medium text-gray-600 animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}
