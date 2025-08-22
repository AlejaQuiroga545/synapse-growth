import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NodeData {
  title: string;
  status: 'completed' | 'in_progress' | 'locked' | 'not_started';
  difficulty: number;
  estimatedTime: number;
  score?: number;
}

interface LearningNodeProps {
  data: NodeData;
  id: string;
}

export const LearningNode = memo(({ data, id }: LearningNodeProps) => {
  const getStatusStyles = () => {
    switch (data.status) {
      case 'completed':
        return 'border-success bg-success/10 text-success-foreground shadow-glow';
      case 'in_progress':
        return 'border-primary bg-primary/10 text-primary-foreground shadow-soft animate-pulse';
      case 'locked':
        return 'border-muted bg-muted/30 text-muted-foreground opacity-60';
      default:
        return 'border-border bg-card text-card-foreground shadow-soft hover:shadow-glow';
    }
  };

  const getStatusIcon = () => {
    switch (data.status) {
      case 'completed':
        return '✅';
      case 'in_progress':
        return '⚡';
      case 'locked':
        return '🔒';
      default:
        return '○';
    }
  };

  const getDifficultyStars = () => {
    return '★'.repeat(data.difficulty) + '☆'.repeat(5 - data.difficulty);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative min-w-[180px] rounded-2xl border-2 p-4 transition-all duration-200',
        'hover:-translate-y-1 cursor-pointer select-none',
        getStatusStyles()
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-primary border-2 border-white"
      />
      
      {/* Node Content */}
      <div className="space-y-3">
        {/* Status & Title */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-sm leading-tight mb-1">
              {data.title}
            </h3>
            <div className="text-xs opacity-75">
              {getDifficultyStars()}
            </div>
          </div>
          <div className="text-lg">
            {getStatusIcon()}
          </div>
        </div>

        {/* Progress & Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>⏱️ {data.estimatedTime}min</span>
            {data.status === 'completed' && data.score && (
              <span className="font-medium">{data.score}%</span>
            )}
          </div>
          
          {/* Progress bar for in-progress nodes */}
          {data.status === 'in_progress' && (
            <div className="w-full h-1.5 bg-background/30 rounded-full">
              <div className="w-1/3 h-full bg-primary rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-primary border-2 border-white"
      />
    </motion.div>
  );
});