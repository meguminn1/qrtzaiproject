import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Message, ChatResponse } from "@shared/schema";
import { 
  Paperclip, 
  Search, 
  Globe, 
  Mic, 
  ArrowUp,
  AudioLines,
  MessageSquare
} from "lucide-react";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async ({ userMessage, currentHistory }: { userMessage: string; currentHistory: Message[] }) => {
      const response = await apiRequest("POST", "/api/chat", {
        message: userMessage,
        history: currentHistory,
      });
      const data: ChatResponse = await response.json();
      return data;
    },
    onSuccess: (data) => {
      if (data.message && data.message.role && data.message.content) {
        setMessages((prev) => [...prev, data.message]);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get response",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || chatMutation.isPending) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: trimmedInput,
      timestamp: Date.now(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInput("");
    chatMutation.mutate({ userMessage: trimmedInput, currentHistory: updatedHistory });

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    const maxHeight = 6 * 24;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-screen w-full chat-gradient">
      <ScrollArea 
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        data-testid="chat-messages-area"
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
          {showWelcome ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 
                className="text-2xl font-semibold text-white mb-2"
                data-testid="text-welcome-title"
              >
                Hi, I'm QRTZ.
              </h1>
              <p 
                className="text-white/70 text-base"
                data-testid="text-welcome-subtitle"
              >
                How can I help you today?
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${message.role}-${message.id}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-white/20 backdrop-blur-sm text-white"
                        : "bg-white/10 backdrop-blur-sm text-white"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="flex justify-start" data-testid="loading-indicator">
                  <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-75" />
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-150" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-white/10 bg-transparent backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-3">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="w-full bg-transparent border-0 text-white placeholder:text-white/50 resize-none focus-visible:ring-0 text-base min-h-[24px] max-h-[144px] p-0"
              disabled={chatMutation.isPending}
              data-testid="input-message"
            />
            
            <div className="flex items-center justify-between mt-3 gap-2">
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  disabled
                  data-testid="button-attach"
                >
                  <Paperclip className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10 gap-1.5 px-3"
                  disabled
                  data-testid="button-deep-search"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">Deep search</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10 gap-1.5 px-3"
                  disabled
                  data-testid="button-search"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Search</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  disabled
                  data-testid="button-voice"
                >
                  <AudioLines className="w-5 h-5" />
                </Button>
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  disabled
                  data-testid="button-mic"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                
                <Button
                  size="icon"
                  onClick={handleSubmit}
                  disabled={!input.trim() || chatMutation.isPending}
                  className="bg-emerald-500 text-white rounded-full disabled:opacity-50"
                  data-testid="button-send"
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
