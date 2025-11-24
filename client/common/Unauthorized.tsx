import React from "react";
import { ShieldX, LogIn } from "lucide-react";
import { Button } from "../src/app/components/ui/button";

interface UnauthorizedProps {
  title?: string;
  message?: string;
  onLogin?: () => void;
}

const Unauthorized: React.FC<UnauthorizedProps> = ({
  title = "Acceso denegado",
  message = "No tienes permisos para acceder a esta página.",
  onLogin,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <ShieldX className="w-24 h-24 text-red-400 mb-6" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onLogin && (
        <Button onClick={onLogin}>
          <LogIn className="w-4 h-4 mr-2" />
          Iniciar sesión
        </Button>
      )}
    </div>
  );
};

export default Unauthorized;
