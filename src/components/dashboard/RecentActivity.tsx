import React from 'react';
import { motion } from 'framer-motion';
import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardContent } from '@/components/ui/vmind-card';

interface Activity {
  id: string;
  type: 'completed' | 'note' | 'badge' | 'resource';
  title: string;
  description: string;
  time: string;
  emoji: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'completed',
    title: 'Completaste "Variables en JavaScript"',
    description: 'Excelente trabajo con un score de 92%',
    time: 'hace 2 horas',
    emoji: '✅'
  },
  {
    id: '2',
    type: 'badge',
    title: 'Nueva insignia desbloqueada',
    description: 'Explorador - Has completado 5 nodos',
    time: 'hace 3 horas',
    emoji: '🏆'
  },
  {
    id: '3',
    type: 'note',
    title: 'Nota agregada',
    description: 'En "Funciones básicas": Recordar usar const para...',
    time: 'ayer',
    emoji: '📝'
  },
  {
    id: '4',
    type: 'resource',
    title: 'Recurso guardado',
    description: 'Video: "Arrow Functions Explained" - 15 min',
    time: 'hace 2 días',
    emoji: '🔖'
  }
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <VMindCard variant="floating">
        <VMindCardHeader>
          <VMindCardTitle className="flex items-center gap-2">
            ⚡ Actividad Reciente
          </VMindCardTitle>
        </VMindCardHeader>
        <VMindCardContent>
          <div className="space-y-4">
            {mockActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="text-2xl">{activity.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-5">{activity.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1 leading-4">
                    {activity.description}
                  </p>
                  <span className="text-muted-foreground text-xs">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </VMindCardContent>
      </VMindCard>
    </motion.div>
  );
}