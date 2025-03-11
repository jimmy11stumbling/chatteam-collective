
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamsHeaderProps {
  openCreateModal: () => void;
}

const TeamsHeader = ({ openCreateModal }: TeamsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Bot Teams</h1>
        <p className="text-neutral-600 mt-1">
          Manage and configure your specialized AI agent teams
        </p>
      </div>
      <Button 
        className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4"
        onClick={openCreateModal}
      >
        <PlusIcon className="w-4 h-4" />
        <span>Create Team</span>
      </Button>
    </div>
  );
};

export default TeamsHeader;
