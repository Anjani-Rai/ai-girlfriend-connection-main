
import React from 'react';
import { Heart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RelationshipMeterProps {
  level: number; // 0-100
}

export const RelationshipMeter: React.FC<RelationshipMeterProps> = ({ level }) => {
  // Calculate relationship status based on level
  const getRelationshipStatus = (level: number) => {
    if (level < 20) return 'Just Met';
    if (level < 40) return 'Friends';
    if (level < 60) return 'Close';
    if (level < 80) return 'Special';
    return 'Soulmates';
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Heart 
            size={16} 
            className={`fill-partner-progress text-partner-progress ${level > 60 ? 'animate-pulse-subtle' : ''}`} 
          />
          <span className="text-xs font-medium text-foreground/80">
            {getRelationshipStatus(level)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <Progress value={level} className="h-1.5" />
    </div>
  );
};
