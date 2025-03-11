
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SendIcon, Mic, Bot } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot" | "system";
  botType?: string;
  content: string;
  timestamp: Date;
}

const botColors = {
  leader: "bg-blue-500",
  knowledge: "bg-teal-500",
  reasoning: "bg-violet-500",
  data: "bg-amber-500",
  support: "bg-rose-500",
  security: "bg-emerald-500",
};

const botNames = {
  leader: "Leader Bot",
  knowledge: "Knowledge Bot",
  reasoning: "Reasoning Bot",
  data: "Data Processing Bot",
  support: "Customer Support Bot",
  security: "Security Bot",
};

const ConversationDemo = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      content: "Welcome to Ultimate Chatbot Station! Our team of specialized bots is ready to assist you. Ask us anything!",
      timestamp: new Date(),
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);
    
    // Simulate thinking process
    setTimeout(() => {
      // Add Leader Bot analysis message
      const leaderMessage: Message = {
        id: Date.now().toString() + "-leader",
        sender: "bot",
        botType: "leader",
        content: "Analyzing your request and routing to the appropriate specialists...",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, leaderMessage]);
      
      // Determine which bot should respond (for demo purposes, simulate with a set pattern)
      const botTypes = ["knowledge", "reasoning", "support"];
      const selectedBots = botTypes.filter(() => Math.random() > 0.5).slice(0, 2);
      
      // If no bots were randomly selected, default to support bot
      if (selectedBots.length === 0) {
        selectedBots.push("support");
      }
      
      // Add responses from selected bots with delay
      selectedBots.forEach((botType, index) => {
        setTimeout(() => {
          const botMessage: Message = {
            id: Date.now().toString() + `-${botType}`,
            sender: "bot",
            botType,
            content: getBotResponse(botType, input),
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, botMessage]);
          
          // If this is the last bot, end processing
          if (index === selectedBots.length - 1) {
            setIsProcessing(false);
          }
        }, (index + 1) * 1000);
      });
    }, 1500);
  };
  
  const getBotResponse = (botType: string, userInput: string): string => {
    // Mock responses based on bot type
    switch (botType) {
      case "knowledge":
        return "Based on our knowledge database, I can provide the following information: " + 
               getRandomResponse(knowledgeResponses);
      case "reasoning":
        return "After analyzing your request, here's my assessment: " + 
               getRandomResponse(reasoningResponses);
      case "data":
        return "I've processed the relevant data and found the following pattern: " + 
               getRandomResponse(dataResponses);
      case "support":
        return "I'm here to help! " + 
               getRandomResponse(supportResponses);
      case "security":
        return "I've checked our security protocols: " + 
               getRandomResponse(securityResponses);
      default:
        return "I'm processing your request.";
    }
  };
  
  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const knowledgeResponses = [
    "Our database shows this is a common question. The answer is that multi-agent systems provide better specialization and collaboration.",
    "According to our records, Claude API offers advanced language capabilities perfect for sophisticated conversations.",
    "Looking at our documentation, I can confirm that all messages are encrypted end-to-end for security.",
  ];
  
  const reasoningResponses = [
    "This seems to be a complex question with multiple facets. Let me break it down: the key advantage is specialization combined with knowledge sharing.",
    "I've analyzed this problem and determined that the optimal approach involves using at least three specialized bots working together.",
    "Based on the patterns in your query, I believe you're looking for a solution that balances efficiency with thoroughness.",
  ];
  
  const dataResponses = [
    "The data shows a 78% increase in user satisfaction when using multi-agent systems versus single agent systems.",
    "I've processed the relevant metrics and found that response quality improves by 42% with specialized bot teams.",
    "Based on our usage statistics, the most valuable bot combination is Knowledge + Reasoning + Support.",
  ];
  
  const supportResponses = [
    "I understand you're looking for information about our platform. Is there anything specific you'd like to know?",
    "Thank you for your question! Does this answer address your needs, or would you like more details?",
    "I'm happy to help with any questions about getting started with our platform or troubleshooting issues you might be experiencing.",
  ];
  
  const securityResponses = [
    "I've verified that this request adheres to our privacy policy and contains no sensitive information.",
    "Our security protocols are actively monitoring this conversation to ensure data protection compliance.",
    "Your conversation is encrypted and follows all necessary security guidelines for data privacy.",
  ];
  
  return (
    <div className="flex flex-col h-full overflow-hidden border border-neutral-200 rounded-xl shadow-sm bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-sm">Ultimate Chatbot Team</h3>
            <p className="text-xs text-neutral-500">6 specialized bots</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === "bot" && message.botType && (
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-2",
                  botColors[message.botType as keyof typeof botColors]
                )}
              >
                <span className="text-white text-xs font-medium">
                  {message.botType.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            <div 
              className={cn(
                "max-w-[80%] rounded-xl px-4 py-2",
                message.sender === "user" 
                  ? "bg-blue-500 text-white rounded-tr-none" 
                  : message.sender === "system"
                  ? "bg-neutral-100 text-neutral-700"
                  : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-none"
              )}
            >
              {message.botType && (
                <div className="text-xs font-medium mb-1 text-neutral-500">
                  {botNames[message.botType as keyof typeof botNames]}
                </div>
              )}
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 rounded-xl px-4 py-2 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="px-4 py-3 border-t border-neutral-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isProcessing}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <SendIcon className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" disabled={isProcessing}>
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDemo;
