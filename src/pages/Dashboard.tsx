
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCard, { TeamCardProps } from "@/components/TeamCard";
import CreateTeamModal from "@/components/CreateTeamModal";
import { PlusIcon, MessageSquare, Users, Activity, BarChart } from "lucide-react";

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
  }
];

const Dashboard = () => {
  const [teams, setTeams] = useState<TeamCardProps[]>(mockTeams);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
  
  const stats = [
    {
      title: "Total Teams",
      value: teams.length,
      icon: <Users className="w-5 h-5 text-blue-500" />,
      change: "+2",
      trend: "up",
    },
    {
      title: "Active Conversations",
      value: "278",
      icon: <MessageSquare className="w-5 h-5 text-teal-500" />,
      change: "+18%",
      trend: "up",
    },
    {
      title: "User Satisfaction",
      value: "94%",
      icon: <Activity className="w-5 h-5 text-violet-500" />,
      change: "+2.4%",
      trend: "up",
    },
    {
      title: "Total Messages",
      value: "12.8k",
      icon: <BarChart className="w-5 h-5 text-amber-500" />,
      change: "+24%",
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
              <p className="text-neutral-600 mt-1">
                Manage your chatbot teams and monitor performance
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
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-neutral-200">
                  <CardHeader className="py-4 px-6 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium text-neutral-600">
                      {stat.title}
                    </CardTitle>
                    <div className="bg-neutral-50 w-8 h-8 rounded-full flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="py-4 px-6">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
                      {stat.change}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-3 h-3 ml-1 ${stat.trend === 'up' ? '' : 'transform rotate-180'}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 01-1-1V3.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 3.414V6a1 1 0 01-1 1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-neutral-500 ml-1">vs last period</span>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Teams */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Your Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TeamCard {...team} />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Activity</h2>
            <Card className="border-neutral-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start pb-4 border-b border-neutral-100 last:border-0 last:pb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-700">
                          <span className="font-medium">Customer Support Team</span> handled 15 new conversations
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
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

export default Dashboard;
