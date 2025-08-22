import React from 'react';
import { motion } from 'framer-motion';
import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardDescription, VMindCardContent } from '@/components/ui/vmind-card';
import { VMindButton } from '@/components/ui/vmind-button';
import { useAppContext } from '@/contexts/AppContext';
import { ProgressOverview } from './ProgressOverview';
import { RecentActivity } from './RecentActivity';
import { NextSteps } from './NextSteps';
import { QuickActions } from './QuickActions';

export function Dashboard() {
  const { state } = useAppContext();
  const { user, currentRoadmap } = state;

  if (!user) {
    return <div>Cargando usuario...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VMindCard variant="floating">
            <VMindCardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <VMindCardTitle className="text-2xl flex items-center gap-3">
                    <span className="text-3xl">👋</span>
                    ¡Hola, {user.nombre}!
                  </VMindCardTitle>
                  <VMindCardDescription className="text-lg mt-2">
                    Continuemos con tu aventura de aprendizaje
                  </VMindCardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">125</div>
                  <div className="text-sm text-muted-foreground">puntos totales</div>
                </div>
              </div>
            </VMindCardHeader>
          </VMindCard>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressOverview />
            <RecentActivity />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <NextSteps />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}