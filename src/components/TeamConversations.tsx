
import { useState } from "react";
import { format } from "date-fns";
import { MessageSquare, User, ArrowUpRight, Calendar, Filter, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TeamCardProps } from "@/components/TeamCard";
import ConversationDemo from "@/components/ConversationDemo";
import BotActivity from "@/components/BotActivity";
import QuickResponses from "@/components/QuickResponses";

interface Conversation {
  id: string;
  title: string;
  date: Date;
  status: "completed" | "in-progress" | "failed";
  messagesCount: number;
  user: string;
}

interface TeamConversationsProps {
  team: TeamCardProps;
}

const TeamConversations = ({ team }: TeamConversationsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("conversations");
  
  // Mock conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Assistance with login issue",
      date: new Date(Date.now() - 1000 * 60 * 30),
      status: "completed",
      messagesCount: 12,
      user: "Sarah Johnson"
    },
    {
      id: "2",
      title: "Product recommendation inquiry",
      date: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: "completed",
      messagesCount: 8,
      user: "Michael Smith"
    },
    {
      id: "3",
      title: "Technical support for app crash",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "failed",
      messagesCount: 5,
      user: "Emily Davis"
    },
    {
      id: "4",
      title: "Subscription renewal questions",
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      status: "completed",
      messagesCount: 15,
      user: "Robert Wilson"
    },
    {
      id: "5",
      title: "Feature request discussion",
      date: new Date(Date.now() - 1000 * 60 * 10),
      status: "in-progress",
      messagesCount: 3,
      user: "Jessica Brown"
    }
  ]);
  
  // Filter conversations based on search term and status filter
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch = 
      conversation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || conversation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const statusColor = {
    completed: "bg-green-50 text-green-600 border-green-200",
    "in-progress": "bg-blue-50 text-blue-600 border-blue-200",
    failed: "bg-red-50 text-red-600 border-red-200"
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Conversations</h2>
          <p className="text-neutral-600">
            View and manage team conversations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setActiveTab(activeTab === "conversations" ? "analytics" : "conversations")}
          >
            {activeTab === "conversations" ? "View Analytics" : "View Conversations"}
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start New Conversation
          </Button>
        </div>
      </div>
      
      {activeTab === "analytics" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BotActivity />
          <QuickResponses />
        </div>
      ) : (
        <>
          {/* Demo Chat Interface */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Try the Conversation Interface</h3>
            <div className="border rounded-lg overflow-hidden h-[500px]">
              <ConversationDemo />
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2 text-neutral-500" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conversations</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Conversations Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Conversation</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Messages</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <TableRow key={conversation.id}>
                      <TableCell className="font-medium">{conversation.title}</TableCell>
                      <TableCell>{conversation.user}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={statusColor[conversation.status]}
                        >
                          {conversation.status === "in-progress" ? "In Progress" : 
                            conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{conversation.messagesCount}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-neutral-500 text-sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          {format(conversation.date, "MMM d, yyyy")}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-neutral-500">
                        <AlertCircle className="h-8 w-8 mb-2 text-neutral-300" />
                        <p>No conversations found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamConversations;
