import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../src/app/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../src/app/components/ui/alert";

interface ErrorProps {
  error?: string | Error | { message: string };
  onRetry?: () => void;
  title?: string;
}

const Error: React.FC<ErrorProps> = ({ error, onRetry, title = "Error" }) => {
  let errorMessage: string;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMessage = error.message;
  } else {
    errorMessage = "Ha ocurrido un error inesperado";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <Alert className="max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">{errorMessage}</AlertDescription>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-4 w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
        )}
      </Alert>
    </div>
  );
};

export default Error;
