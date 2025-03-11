
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTeam: (team: { name: string; description: string; bots: string[] }) => void;
}

const botOptions = [
  { id: "leader", name: "Leader Bot", description: "Orchestrates team operations" },
  { id: "knowledge", name: "Knowledge Bot", description: "Retrieves information from database" },
  { id: "reasoning", name: "Reasoning Bot", description: "Performs complex analysis" },
  { id: "data", name: "Data Processing Bot", description: "Extracts and processes data" },
  { id: "support", name: "Customer Support Bot", description: "Handles user interactions" },
  { id: "security", name: "Security Bot", description: "Ensures compliance and privacy" },
];

const CreateTeamModal = ({ isOpen, onClose, onCreateTeam }: CreateTeamModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBots, setSelectedBots] = useState<string[]>(["leader"]); // Leader bot is required
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleBot = (botId: string) => {
    // Leader bot is required and can't be toggled
    if (botId === "leader") return;
    
    setSelectedBots((prev) => 
      prev.includes(botId)
        ? prev.filter((id) => id !== botId)
        : [...prev, botId]
    );
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onCreateTeam({ name, description, bots: selectedBots });
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1000);
  };
  
  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedBots(["leader"]);
    setCurrentStep(0);
  };
  
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !name || name.length < 3;
    }
    return false;
  };
  
  const steps = [
    {
      title: "Team Information",
      content: (
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">Team Name</Label>
            <Input
              id="team-name"
              placeholder="E.g., Customer Support Team"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team-description">Description</Label>
            <Textarea
              id="team-description"
              placeholder="Describe the purpose of this team..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Select Bots",
      content: (
        <div className="py-4">
          <p className="text-sm text-neutral-600 mb-4">
            Select which specialized bots to include in your team. Leader Bot is required and will orchestrate the collaboration.
          </p>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {botOptions.map((bot) => (
              <div
                key={bot.id}
                className={`
                  flex items-center p-3 border rounded-lg transition-all duration-200
                  ${selectedBots.includes(bot.id)
                    ? "border-blue-200 bg-blue-50"
                    : "border-neutral-200 hover:border-neutral-300"}
                  ${bot.id === "leader" ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
                `}
                onClick={() => toggleBot(bot.id)}
              >
                <div
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0
                    ${selectedBots.includes(bot.id)
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-neutral-300"}
                  `}
                >
                  {selectedBots.includes(bot.id) && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{bot.name}</h4>
                  <p className="text-xs text-neutral-500">{bot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Create a New Team</DialogTitle>
        </DialogHeader>
        
        {/* Progress indicator */}
        <div className="w-full bg-neutral-100 h-1">
          <div 
            className="bg-blue-500 h-1 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        {/* Step title */}
        <div className="px-6 py-2 border-b border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-700">
            Step {currentStep + 1}: {steps[currentStep].title}
          </h3>
        </div>
        
        {/* Step content */}
        <div className="px-6">
          {steps[currentStep].content}
        </div>
        
        <DialogFooter className="bg-neutral-50 px-6 py-4">
          <div className="flex justify-between w-full">
            <Button
              variant="ghost"
              onClick={currentStep === 0 ? onClose : prevStep}
            >
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
              disabled={isNextDisabled() || isSubmitting}
              className={currentStep === steps.length - 1 ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              {currentStep === steps.length - 1
                ? isSubmitting
                  ? "Creating..."
                  : "Create Team"
                : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamModal;
