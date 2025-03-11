
import { SearchIcon, FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  statusCounts: {
    all: number;
    active: number;
    inactive: number;
    draft: number;
  };
}

const TeamsFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  statusCounts 
}: TeamsFilterProps) => {
  return (
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
  );
};

export default TeamsFilter;
