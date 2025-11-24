import { ChatInterface } from "./ChatInterface";

/**
 * Simple chat container for normal conversations
 */
export function ConversationContainer() {
  return (
    <div className="flex h-full w-full">
      <ChatInterface />
    </div>
  );
}
