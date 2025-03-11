
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Settings, 
  MessageSquare, 
  Users, 
  Trash2,
  PlayCircle,
  PauseCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import TeamSettings from "@/components/TeamSettings";
import TeamBots from "@/components/TeamBots";
import TeamConversations from "@/components/TeamConversations";
import { TeamCardProps } from "@/components/TeamCard";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [team, setTeam] = useState<TeamCardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch team data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchTeam = () => {
      setIsLoading(true);
      // Simulating API call with setTimeout
      setTimeout(() => {
        const mockTeams: TeamCardProps[] = [
          {
            id: "1",
            name: "Customer Support Team",
            description: "Handles customer inquiries and support requests with a focus on satisfaction",
            botCount: 4,
            status: "active",
            lastActive: "2 hours ago",
          },
          {
            id: "2",
            name: "Sales Assistant",
            description: "Helps with product recommendations and sales inquiries",
            botCount: 3,
            status: "active",
            lastActive: "1 day ago",
          },
          {
            id: "3",
            name: "Technical Support",
            description: "Provides technical troubleshooting and product assistance",
            botCount: 5,
            status: "inactive",
            lastActive: "3 days ago",
          },
          {
            id: "4",
            name: "Research Team",
            description: "Conducts in-depth research and analysis on various topics",
            botCount: 6,
            status: "draft",
          },
          {
            id: "5",
            name: "Content Creation",
            description: "Generates content ideas and drafts for various platforms",
            botCount: 4,
            status: "active",
            lastActive: "5 hours ago",
          },
        ];
        
        const foundTeam = mockTeams.find(team => team.id === id);
        setTeam(foundTeam || null);
        setIsLoading(false);
      }, 500);
    };

    fetchTeam();
  }, [id]);

  const handleDeleteTeam = () => {
    // In a real app, this would be an API call to delete the team
    toast({
      title: "Team deleted",
      description: `${team?.name} has been permanently deleted.`,
    });
    navigate("/teams");
  };

  const handleToggleStatus = () => {
    if (!team) return;
    
    // Fix the TypeScript error by properly casting the status
    const newStatus = team.status === "active" ? "inactive" : "active";
    
    // Update the team with the properly typed status
    setTeam({
      ...team,
      status: newStatus as "active" | "inactive" | "draft",
    });
    
    toast({
      title: `Team ${newStatus}`,
      description: `${team.name} is now ${newStatus}.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/teams")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Teams
              </Button>
            </div>
            <div className="h-48 flex items-center justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center space-x-4 mb-8">
              <Button variant="ghost" onClick={() => navigate("/teams")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Teams
              </Button>
            </div>
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Team not found</h2>
              <p className="text-neutral-600 mb-6">The team you're looking for doesn't exist or has been deleted.</p>
              <Button onClick={() => navigate("/teams")}>
                Return to Teams
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header with back button */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Button variant="ghost" onClick={() => navigate("/teams")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Teams
                </Button>
                <div className={`h-2.5 w-2.5 rounded-full ${
                  team?.status === "active" ? "bg-green-500" : 
                  team?.status === "inactive" ? "bg-neutral-400" : "bg-amber-500"
                }`}></div>
                <span className="text-sm font-medium text-neutral-600 capitalize">
                  {team?.status}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900">{team?.name}</h1>
              <p className="text-neutral-600 mt-1 max-w-2xl">
                {team?.description}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button
                variant={team?.status === "active" ? "outline" : "default"}
                className={team?.status === "active" ? "border-red-200 text-red-600 hover:bg-red-50" : "bg-green-500 hover:bg-green-600"}
                onClick={handleToggleStatus}
              >
                {team?.status === "active" ? (
                  <>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview">
                  <Users className="h-4 w-4 mr-2" />
                  Bots
                </TabsTrigger>
                <TabsTrigger value="conversations">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversations
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                {team && <TeamBots team={team} />}
              </TabsContent>
              
              <TabsContent value="conversations" className="space-y-4">
                {team && <TeamConversations team={team} />}
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                {team && <TeamSettings team={team} setTeam={setTeam} />}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              "{team?.name}" team and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeam}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Team
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamDetail;
