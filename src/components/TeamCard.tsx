
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TeamCardProps {
  id: string;
  name: string;
  description: string;
  botCount: number;
  status: 'active' | 'inactive' | 'draft';
  lastActive?: string;
  onClick?: () => void;
  className?: string;
}

const TeamCard = ({
  id,
  name,
  description,
  botCount,
  status,
  lastActive,
  onClick,
  className,
}: TeamCardProps) => {
  const statusColor = {
    active: "bg-green-50 text-green-600 border-green-200",
    inactive: "bg-neutral-50 text-neutral-600 border-neutral-200",
    draft: "bg-amber-50 text-amber-600 border-amber-200",
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      <div className="h-2 bg-gradient-to-r from-blue-500 to-teal-400" />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-neutral-900">{name}</h3>
          <Badge variant="outline" className={cn("rounded-full px-2 py-0.5", statusColor[status])}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 items-center">
            <span className="text-xs text-neutral-500">
              {botCount} {botCount === 1 ? 'bot' : 'bots'}
            </span>
            {lastActive && (
              <>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-500">
                  Last active: {lastActive}
                </span>
              </>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs hover:bg-blue-50 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              // Handle manage action
            }}
          >
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
