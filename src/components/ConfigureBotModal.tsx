
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface Bot {
  id: string;
  name: string;
  type: string;
  description: string;
  isActive: boolean;
  isRequired?: boolean;
}

interface ConfigureBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  bot: Bot | null;
  onSave: (updatedBot: Bot) => void;
}

const ConfigureBotModal = ({ isOpen, onClose, bot, onSave }: ConfigureBotModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set initial state based on bot
  useState(() => {
    if (bot) {
      setName(bot.name);
      setDescription(bot.description);
      setIsActive(bot.isActive);
    }
  });
  
  const handleSave = () => {
    if (!bot || !name) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedBot: Bot = {
        ...bot,
        name,
        description,
        isActive,
      };
      
      onSave(updatedBot);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };
  
  if (!bot) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure {bot.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bot-name">Bot Name</Label>
            <Input
              id="bot-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bot-description">Description</Label>
            <Textarea
              id="bot-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature">Temperature: {temperature}</Label>
              <span className="text-sm text-neutral-500">
                {temperature < 0.3 ? "More focused" : 
                 temperature > 0.7 ? "More creative" : "Balanced"}
              </span>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p className="text-xs text-neutral-500 mt-1">
              Controls randomness: Lower values are more deterministic, higher values are more creative.
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="bot-active" className="text-base">Active Status</Label>
              <p className="text-sm text-neutral-500">Enable or disable this bot</p>
            </div>
            <Switch 
              id="bot-active"
              checked={isActive} 
              onCheckedChange={setIsActive}
              disabled={bot.isRequired}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!name || isSubmitting}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureBotModal;
