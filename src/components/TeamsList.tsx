
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamCard, { TeamCardProps } from "@/components/TeamCard";

interface TeamsListProps {
  teams: TeamCardProps[];
  searchTerm: string;
  statusFilter: string;
  resetFilters: () => void;
}

const TeamsList = ({ teams, searchTerm, statusFilter, resetFilters }: TeamsListProps) => {
  const navigate = useNavigate();

  if (teams.length === 0) {
    return (
      <div className="lg:col-span-3 py-16 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SearchIcon className="w-6 h-6 text-neutral-400" />
        </div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">No teams found</h3>
        <p className="text-neutral-600 mb-4">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <Button variant="outline" onClick={resetFilters}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <>
      {teams.map((team, index) => (
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
      ))}
    </>
  );
};

export default TeamsList;
