
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TeamCardProps } from "@/components/TeamCard";
import CreateTeamModal from "@/components/CreateTeamModal";
import TeamsHeader from "@/components/TeamsHeader";
import TeamsFilter from "@/components/TeamsFilter";
import TeamsList from "@/components/TeamsList";

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

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <TeamsHeader openCreateModal={() => setIsCreateModalOpen(true)} />
          
          <TeamsFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            statusCounts={statusCounts}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TeamsList 
              teams={filteredTeams}
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              resetFilters={resetFilters}
            />
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
