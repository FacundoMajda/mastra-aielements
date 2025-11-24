import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const Loading: React.FC<LoadingProps> = ({
  message = "Cargando...",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;
