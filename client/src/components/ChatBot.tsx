
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes("flight") && lowercaseInput.includes("book")) {
      return "To book a flight, please use our flight search form above. You can select your trip type, enter your destinations, and choose your dates.";
    }
    
    if (lowercaseInput.includes("cancel")) {
      return "For flight cancellations, please contact our support team with your booking reference. We'll help you process the cancellation.";
    }
    
    if (lowercaseInput.includes("price") || lowercaseInput.includes("cost")) {
      return "Flight prices vary based on destinations and dates. You can check current prices using our search form. We also have special offers available!";
    }
    
    if (lowercaseInput.includes("help") || lowercaseInput.includes("support")) {
      return "I can help you with flight bookings, cancellations, pricing information, and general inquiries. What would you like to know?";
    }

    if (lowercaseInput.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    }

    return "I understand your message. Could you please provide more details about what you're looking for? I can help with flight bookings, cancellations, and general inquiries.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, isBot: false }]);

    // Generate and add bot response
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    }, 500);

    setInput("");
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
          variant="default"
        >
          <MessageCircle />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
          sideOffset={5}
        >
          <div className="h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-2 ${
                      message.isBot
                        ? "bg-gray-100 text-gray-900"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
