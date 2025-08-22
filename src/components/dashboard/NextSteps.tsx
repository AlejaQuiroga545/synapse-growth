import React from 'react';
import { motion } from 'framer-motion';
import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardContent } from '@/components/ui/vmind-card';
import { VMindButton } from '@/components/ui/vmind-button';

interface NextStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: number;
  emoji: string;
}

const mockNextSteps: NextStep[] = [
  {
    id: '1',
    title: 'Arrays y Métodos',
    description: 'Aprende a manipular arrays con map, filter y reduce',
    estimatedTime: '25 min',
    difficulty: 3,
    emoji: '📋'
  },
  {
    id: '2',
    title: 'DOM Manipulation',
    description: 'Interactúa con elementos HTML desde JavaScript',
    estimatedTime: '35 min',
    difficulty: 4,
    emoji: '🌐'
  },
  {
    id: '3',
    title: 'Práctica: To-Do App',
    description: 'Aplica lo aprendido construyendo una aplicación',
    estimatedTime: '45 min',
    difficulty: 4,
    emoji: '⚡'
  }
];

export function NextSteps() {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-success';
    if (difficulty <= 3) return 'text-warning';
    return 'text-destructive';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Fácil';
    if (difficulty <= 3) return 'Medio';
    return 'Difícil';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <VMindCard variant="floating">
        <VMindCardHeader>
          <VMindCardTitle className="flex items-center gap-2">
            🎯 Próximos Pasos
          </VMindCardTitle>
        </VMindCardHeader>
        <VMindCardContent>
          <div className="space-y-3">
            {mockNextSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="p-4 border border-border rounded-2xl hover:border-primary/30 hover:shadow-soft transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl">{step.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-5 mb-1">{step.title}</h4>
                    <p className="text-muted-foreground text-xs leading-4 mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground">⏱️ {step.estimatedTime}</span>
                        <span className={`font-medium ${getDifficultyColor(step.difficulty)}`}>
                          {getDifficultyLabel(step.difficulty)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <VMindButton variant="primary" className="w-full mt-4">
              Continuar aprendizaje 🚀
            </VMindButton>
          </div>
        </VMindCardContent>
      </VMindCard>
    </motion.div>
  );
}