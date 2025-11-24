"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/app/components/ai-elements/conversation";
import { Message, MessageContent } from "@/app/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/app/components/ai-elements/prompt-input";
import { Response } from "@/app/components/ai-elements/response";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/app/components/ai-elements/tool";
import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "@components/ui/scroll-area"; // Tu import original
import { DefaultChatTransport } from "ai";
import { MessageSquareIcon } from "lucide-react";

export const ChatInterface: React.FC = () => {
  const chatHelpers = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3001/api/chat",
    }),
  });

  const { messages, status } = chatHelpers;
  const isLoading = status === "streaming" || status === "submitted";

  const handleChatSubmit = async (message: any): Promise<void> => {
    await chatHelpers.sendMessage(message);
  };

  const formatToolData = (data: any) => {
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2);
    }
    return data;
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <Conversation>
        <ConversationContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {messages.length === 0 && (
              <ConversationEmptyState
                description="Inicia una conversación con el agente Mastra"
                icon={<MessageSquareIcon className="size-6" />}
                title="Bienvenido"
              />
            )}

            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts?.map((part: any, index: number) => {
                    let toolName = "";
                    let toolArgs = {};
                    let toolResult = undefined;
                    let toolCallId =
                      part.toolCallId || `${message.id}-${index}`;
                    let toolState = part.state;

                    if (part.type === "tool-invocation") {
                      toolName = part.toolInvocation.toolName;
                      toolArgs = part.toolInvocation.args;
                      toolResult = part.toolInvocation.result;
                      toolCallId = part.toolInvocation.toolCallId;
                      toolState =
                        part.toolInvocation.state === "result"
                          ? "output-available"
                          : "input-available";
                    } else if (part.type.startsWith("tool-")) {
                      toolName = part.type;
                      toolArgs = part.input || part.args;
                      toolResult = part.output || part.result;
                    }

                    if (part.type === "text") {
                      return (
                        <Response key={`${message.id}-${index}`}>
                          {part.text}
                        </Response>
                      );
                    }

                    if (part.type === "error") {
                      return (
                        <div key={index} className="text-red-500 text-sm">
                          Error: {part.error}
                        </div>
                      );
                    }

                    if (toolName) {
                      return (
                        <Tool key={toolCallId}>
                          <ToolHeader type={toolName} state={toolState} />
                          <ToolContent>
                            {/* APLICAMOS EL HELPER AQUÍ PARA EVITAR EL CRASH */}
                            <ToolInput input={formatToolData(toolArgs)} />
                            <ToolOutput
                              output={formatToolData(toolResult)}
                              errorText={part.errorText}
                            />
                          </ToolContent>
                        </Tool>
                      );
                    }

                    return null;
                  })}
                </MessageContent>
              </Message>
            ))}
          </ScrollArea>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="mt-4 border-t pt-4">
        <PromptInput onSubmit={handleChatSubmit}>
          <PromptInputTextarea
            disabled={isLoading}
            placeholder="Escribe tu mensaje..."
          />
          <PromptInputSubmit disabled={isLoading}>Enviar</PromptInputSubmit>
        </PromptInput>
      </div>
    </div>
  );
};
