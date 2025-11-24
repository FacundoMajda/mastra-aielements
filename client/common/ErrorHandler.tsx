import React from "react";
import { Error, NotFound, Unauthorized } from ".";

interface ErrorHandlerProps {
  error?:
    | {
        status?: number;
        message?: string;
      }
    | Error
    | string;
  onRetry?: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, onRetry }) => {
  if (!error) return null;

  const status =
    typeof error === "object" && "status" in error ? error.status : undefined;
  const message =
    typeof error === "object" && "message" in error
      ? error.message
      : typeof error === "string"
      ? error
      : undefined;

  if (status === 401 || status === 403) {
    return <Unauthorized onLogin={() => (window.location.href = "/auth")} />;
  }

  if (status === 404) {
    return <NotFound onGoHome={() => (window.location.href = "/")} />;
  }

  return <Error error={message} onRetry={onRetry} />;
};

export default ErrorHandler;
