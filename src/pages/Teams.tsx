
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCard, { TeamCardProps } from "@/components/TeamCard";
import CreateTeamModal from "@/components/CreateTeamModal";
import { PlusIcon, SearchIcon, FilterIcon } from "lucide-react";

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
  {
    id: "6",
    name: "Data Analysis Team",
    description: "Processes and analyzes data to provide insights and recommendations",
    botCount: 5,
    status: "inactive",
    lastActive: "1 week ago",
  },
  {
    id: "7",
    name: "Marketing Assistant",
    description: "Helps with marketing strategy and campaign analysis",
    botCount: 3,
    status: "draft",
  },
  {
    id: "8",
    name: "HR Support",
    description: "Assists with human resources questions and employee onboarding",
    botCount: 4,
    status: "active",
    lastActive: "3 days ago",
  },
];

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<TeamCardProps[]>(mockTeams);
  const [filteredTeams, setFilteredTeams] = useState<TeamCardProps[]>(mockTeams);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter teams when search term or status filter changes
  useEffect(() => {
    let filtered = teams;
    
    if (searchTerm) {
      filtered = filtered.filter((team) => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter((team) => team.status === statusFilter);
    }
    
    setFilteredTeams(filtered);
  }, [teams, searchTerm, statusFilter]);
  
  const handleCreateTeam = (team: { name: string; description: string; bots: string[] }) => {
    const newTeam: TeamCardProps = {
      id: `${teams.length + 1}`,
      name: team.name,
      description: team.description,
      botCount: team.bots.length,
      status: "draft",
    };
    
    setTeams((prev) => [newTeam, ...prev]);
  };
  
  const statusCounts = {
    all: teams.length,
    active: teams.filter((team) => team.status === "active").length,
    inactive: teams.filter((team) => team.status === "inactive").length,
    draft: teams.filter((team) => team.status === "draft").length,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Bot Teams</h1>
              <p className="text-neutral-600 mt-1">
                Manage and configure your specialized AI agent teams
              </p>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusIcon className="w-4 h-4" />
              <span>Create Team</span>
            </Button>
          </div>
          
          {/* Filters */}
          <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search teams..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <FilterIcon className="text-neutral-500 w-4 h-4" />
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex justify-between items-center">
                      <span>All Teams</span>
                      <Badge variant="outline" className="ml-2 rounded-full text-xs">
                        {statusCounts.all}
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="active">
                    <div className="flex justify-between items-center">
                      <span>Active</span>
                      <Badge variant="outline" className="ml-2 rounded-full text-xs bg-green-50 text-green-600 border-green-200">
                        {statusCounts.active}
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex justify-between items-center">
                      <span>Inactive</span>
                      <Badge variant="outline" className="ml-2 rounded-full text-xs">
                        {statusCounts.inactive}
                      </Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="draft">
                    <div className="flex justify-between items-center">
                      <span>Draft</span>
                      <Badge variant="outline" className="ml-2 rounded-full text-xs bg-amber-50 text-amber-600 border-amber-200">
                        {statusCounts.draft}
                      </Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Teams */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TeamCard 
                    {...team}
                    onClick={() => navigate(`/teams/${team.id}`)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="lg:col-span-3 py-16 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-6 h-6 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-1">No teams found</h3>
                <p className="text-neutral-600 mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      <CreateTeamModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateTeam={handleCreateTeam}
      />
    </div>
  );
};

export default Teams;
