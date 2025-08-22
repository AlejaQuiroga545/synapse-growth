import React from 'react';
import { motion } from 'framer-motion';
import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardContent } from '@/components/ui/vmind-card';
import { VMindButton } from '@/components/ui/vmind-button';

export function QuickActions() {
  const actions = [
    {
      id: 'roadmap',
      title: 'Ver Roadmap',
      description: 'Explora tu mapa de aprendizaje',
      emoji: '🗺️',
      variant: 'primary' as const
    },
    {
      id: 'notes',
      title: 'Mis Notas',
      description: 'Revisa tus apuntes',
      emoji: '📝',
      variant: 'secondary' as const
    },
    {
      id: 'resources',
      title: 'Recursos Guardados',
      description: 'Accede a tu biblioteca',
      emoji: '📚',
      variant: 'outline' as const
    },
    {
      id: 'badges',
      title: 'Insignias',
      description: 'Ve tus logros',
      emoji: '🏆',
      variant: 'outline' as const
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <VMindCard variant="floating">
        <VMindCardHeader>
          <VMindCardTitle className="flex items-center gap-2">
            🚀 Acciones Rápidas
          </VMindCardTitle>
        </VMindCardHeader>
        <VMindCardContent>
          <div className="space-y-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <VMindButton
                  variant={action.variant}
                  className="w-full justify-start h-auto p-4"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-xl">{action.emoji}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs opacity-75">{action.description}</div>
                    </div>
                  </div>
                </VMindButton>
              </motion.div>
            ))}
          </div>
        </VMindCardContent>
      </VMindCard>
    </motion.div>
  );
}