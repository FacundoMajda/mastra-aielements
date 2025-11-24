"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type ToolProps = ComponentProps<"div">;

export const Tool = ({ className, ...props }: ToolProps) => (
  <div
    className={cn("border rounded-lg bg-muted/50 p-4 my-2", className)}
    {...props}
  />
);

export type ToolHeaderProps = ComponentProps<"div"> & {
  type: string;
  state: string;
};

export const ToolHeader = ({
  className,
  type,
  state,
  ...props
}: ToolHeaderProps) => (
  <div
    className={cn("flex items-center gap-2 text-sm font-medium", className)}
    {...props}
  >
    <span>Tool:</span>
    <code className="bg-muted px-2 py-1 rounded text-xs">{type}</code>
    <span className="text-muted-foreground">({state})</span>
  </div>
);

export type ToolContentProps = ComponentProps<"div">;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <div className={cn("space-y-2 mt-2", className)} {...props} />
);

export type ToolInputProps = ComponentProps<"div"> & {
  input: unknown;
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
  <div className={cn("text-sm", className)} {...props}>
    <div className="font-medium">Input:</div>
    <pre className="bg-muted p-2 rounded text-xs overflow-auto whitespace-pre-wrap">
      {typeof input === "string" ? input : JSON.stringify(input, null, 2)}
    </pre>
  </div>
);

export type ToolOutputProps = ComponentProps<"div"> & {
  output: string;
  errorText?: string;
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => (
  <div className={cn("text-sm", className)} {...props}>
    <div className="font-medium">Output:</div>
    {errorText ? (
      <div className="text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded">
        Error: {errorText}
      </div>
    ) : (
      <pre className="bg-muted p-2 rounded text-xs overflow-auto whitespace-pre-wrap">
        {output}
      </pre>
    )}
  </div>
);
