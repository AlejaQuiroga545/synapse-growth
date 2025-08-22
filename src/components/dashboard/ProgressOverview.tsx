import React from 'react';
import { motion } from 'framer-motion';
import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardContent } from '@/components/ui/vmind-card';
import { VMindButton } from '@/components/ui/vmind-button';

export function ProgressOverview() {
  // Mock data - in real app this would come from context/API
  const progress = {
    completed: 12,
    total: 25,
    percentage: 48,
    currentStreak: 7
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <VMindCard variant="floating">
        <VMindCardHeader className="flex flex-row items-center justify-between">
          <VMindCardTitle className="flex items-center gap-2">
            📊 Mi Progreso
          </VMindCardTitle>
          <VMindButton variant="ghost" size="sm">
            Ver roadmap completo →
          </VMindButton>
        </VMindCardHeader>
        <VMindCardContent>
          <div className="space-y-6">
            {/* Main Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">Progreso general</span>
                <span className="text-primary font-bold">{progress.percentage}%</span>
              </div>
              <div className="vmind-progress">
                <motion.div 
                  className="vmind-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{progress.completed} de {progress.total} nodos completados</span>
                <span>🔥 {progress.currentStreak} días seguidos</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-2xl">
                <div className="text-2xl font-bold text-primary">{progress.completed}</div>
                <div className="text-xs text-muted-foreground">Completados</div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-2xl">
                <div className="text-2xl font-bold text-secondary-foreground">3</div>
                <div className="text-xs text-muted-foreground">En progreso</div>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-2xl">
                <div className="text-2xl font-bold text-accent-foreground">{progress.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Racha (días)</div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div>
              <h4 className="font-medium mb-3">Actividad esta semana</h4>
              <div className="grid grid-cols-7 gap-2">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{day}</div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + (index * 0.1) }}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-medium ${
                        index < 5 
                          ? 'bg-success/20 text-success' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index < 5 ? '✓' : '○'}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VMindCardContent>
      </VMindCard>
    </motion.div>
  );
}