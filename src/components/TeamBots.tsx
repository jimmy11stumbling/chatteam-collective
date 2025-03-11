
import { useState } from "react";
import { PlusIcon, Activity, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TeamCardProps } from "@/components/TeamCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Bot {
  id: string;
  name: string;
  type: string;
  description: string;
  isActive: boolean;
  isRequired?: boolean;
}

interface TeamBotsProps {
  team: TeamCardProps;
}

const botTypes = {
  "leader": {
    icon: "👑",
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  "knowledge": {
    icon: "🧠",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  "reasoning": {
    icon: "🔍",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  "data": {
    icon: "📊",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  "support": {
    icon: "💬",
    color: "bg-teal-50 text-teal-600 border-teal-200"
  },
  "security": {
    icon: "🔒",
    color: "bg-red-50 text-red-600 border-red-200"
  }
};

const TeamBots = ({ team }: TeamBotsProps) => {
  const { toast } = useToast();
  const [bots, setBots] = useState<Bot[]>([
    {
      id: "1",
      name: "Leader Bot",
      type: "leader",
      description: "Orchestrates team operations",
      isActive: true,
      isRequired: true
    },
    {
      id: "2",
      name: "Knowledge Bot",
      type: "knowledge",
      description: "Retrieves information from database",
      isActive: true
    },
    {
      id: "3",
      name: "Reasoning Bot",
      type: "reasoning",
      description: "Performs complex analysis",
      isActive: true
    },
    {
      id: "4",
      name: "Data Processing Bot",
      type: "data",
      description: "Extracts and processes data",
      isActive: false
    }
  ]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [botToDelete, setBotToDelete] = useState<string | null>(null);

  const handleToggleBot = (botId: string) => {
    setBots(prevBots =>
      prevBots.map(bot => 
        bot.id === botId ? { ...bot, isActive: !bot.isActive } : bot
      )
    );
    
    const bot = bots.find(b => b.id === botId);
    if (bot) {
      toast({
        title: bot.isActive ? "Bot deactivated" : "Bot activated",
        description: `${bot.name} is now ${bot.isActive ? "inactive" : "active"}.`,
      });
    }
  };

  const confirmDeleteBot = (botId: string) => {
    setBotToDelete(botId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteBot = () => {
    if (!botToDelete) return;
    
    const botName = bots.find(b => b.id === botToDelete)?.name || "Bot";
    
    setBots(prevBots => prevBots.filter(bot => bot.id !== botToDelete));
    setBotToDelete(null);
    
    toast({
      title: "Bot removed",
      description: `${botName} has been removed from this team.`,
    });
  };

  const activeBotCount = bots.filter(bot => bot.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Team Bots</h2>
          <p className="text-neutral-600">
            {activeBotCount} of {bots.length} bots are active
          </p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Bot
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bots.map(bot => (
          <Card key={bot.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-2xl mr-3">
                    {botTypes[bot.type as keyof typeof botTypes]?.icon || "🤖"}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                    <Badge 
                      variant="outline"
                      className={`mt-1 ${botTypes[bot.type as keyof typeof botTypes]?.color || "bg-neutral-50"}`}
                    >
                      {bot.type.charAt(0).toUpperCase() + bot.type.slice(1)}
                    </Badge>
                  </div>
                </div>
                <Switch 
                  checked={bot.isActive}
                  onCheckedChange={() => handleToggleBot(bot.id)}
                  disabled={bot.isRequired}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 text-sm">{bot.description}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => confirmDeleteBot(bot.id)}
                disabled={bot.isRequired}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Bot</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this bot from the team? 
              This will delete any custom configurations for this bot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBot}
              className="bg-red-500 hover:bg-red-600"
            >
              Remove Bot
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamBots;
