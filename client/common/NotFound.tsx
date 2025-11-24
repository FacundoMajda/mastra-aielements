import React from "react";
import { FileX, Home } from "lucide-react";
import { Button } from "../src/app/components/ui/button";

interface NotFoundProps {
  title?: string;
  message?: string;
  onGoHome?: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({
  title = "Página no encontrada",
  message = "La página que buscas no existe.",
  onGoHome,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <FileX className="w-24 h-24 text-gray-400 mb-6" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onGoHome && (
        <Button onClick={onGoHome}>
          <Home className="w-4 h-4 mr-2" />
          Ir al inicio
        </Button>
      )}
    </div>
  );
};

export default NotFound;
