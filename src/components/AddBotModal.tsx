
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface AddBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBot: (bot: { name: string; type: string; description: string }) => void;
}

const botTypes = {
  "leader": {
    icon: "👑",
    name: "Leader Bot",
    description: "Orchestrates team operations and coordinates between bots"
  },
  "knowledge": {
    icon: "🧠",
    name: "Knowledge Bot",
    description: "Specializes in retrieving and storing information"
  },
  "reasoning": {
    icon: "🔍",
    name: "Reasoning Bot",
    description: "Handles complex analysis and problem-solving"
  },
  "data": {
    icon: "📊",
    name: "Data Processing Bot",
    description: "Extracts, processes, and visualizes data"
  },
  "support": {
    icon: "💬",
    name: "Support Bot",
    description: "Assists with user interactions and engagement"
  },
  "security": {
    icon: "🔒",
    name: "Security Bot",
    description: "Ensures compliance, privacy, and data security"
  }
};

const AddBotModal = ({ isOpen, onClose, onAddBot }: AddBotModalProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!name || !type) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddBot({
        name,
        type,
        description: description || botTypes[type as keyof typeof botTypes]?.description || "",
      });
      
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 500);
  };
  
  const resetForm = () => {
    setName("");
    setType("");
    setDescription("");
  };
  
  const handleTypeChange = (value: string) => {
    setType(value);
    // Auto-fill description based on type if the user hasn't entered anything
    if (!description) {
      setDescription(botTypes[value as keyof typeof botTypes]?.description || "");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Bot to Team</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bot-name">Bot Name</Label>
            <Input
              id="bot-name"
              placeholder="E.g., Advanced Knowledge Bot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bot-type">Bot Type</Label>
            <Select
              value={type}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="bot-type">
                <SelectValue placeholder="Select bot type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(botTypes).map(([key, { icon, name }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center">
                      <span className="mr-2">{icon}</span>
                      <span>{name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bot-description">Description</Label>
            <Textarea
              id="bot-description"
              placeholder="Describe what this bot does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!name || !type || isSubmitting}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isSubmitting ? "Adding..." : "Add Bot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBotModal;
