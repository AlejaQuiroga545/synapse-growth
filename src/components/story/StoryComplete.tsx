import React from 'react';
import { motion } from 'framer-motion';
import { StoryState } from '@/types';
import { VMindButton } from '@/components/ui/vmind-button';
import { VMindCardHeader, VMindCardTitle, VMindCardDescription, VMindCardContent, VMindCardFooter } from '@/components/ui/vmind-card';

interface StoryCompleteProps {
  data: StoryState;
  onComplete: () => void;
}

export function StoryComplete({ data, onComplete }: StoryCompleteProps) {
  const getRhythmEmoji = (rhythm: string) => {
    switch (rhythm) {
      case 'rapido': return '🚀';
      case 'equilibrado': return '⚖️';
      case 'tranquilo': return '🌱';
      default: return '⚖️';
    }
  };

  const getLevelEmoji = (level: number) => {
    const emojis = ['🌱', '🌿', '🌳', '🚀', '⭐'];
    return emojis[level - 1] || '🌱';
  };

  return (
    <>
      <VMindCardHeader className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
          className="text-6xl mb-4"
        >
          🎯✨
        </motion.div>
        <VMindCardTitle className="text-2xl">
          ¡Perfecto! Tu roadmap está listo
        </VMindCardTitle>
        <VMindCardDescription className="text-lg">
          He creado un plan de aprendizaje personalizado especialmente para ti
        </VMindCardDescription>
      </VMindCardHeader>

      <VMindCardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-primary/10 rounded-2xl border border-primary/20"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{getLevelEmoji(data.nivel)}</div>
              <p className="text-xs font-medium text-primary">Nivel {data.nivel}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{getRhythmEmoji(data.ritmo)}</div>
              <p className="text-xs font-medium text-secondary-foreground">
                {data.ritmo.charAt(0).toUpperCase() + data.ritmo.slice(1)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interests Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-accent/10 rounded-2xl border border-accent/20"
        >
          <p className="text-sm font-medium mb-2">📚 Temas de interés:</p>
          <div className="flex flex-wrap gap-2">
            {data.intereses.map((interes, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/60 rounded-full text-xs font-medium"
              >
                {interes}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Objective */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-success/10 rounded-2xl border border-success/20"
        >
          <p className="text-sm font-medium mb-2">🎯 Tu objetivo:</p>
          <p className="text-sm italic">"{data.objetivo}"</p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-4xl mb-3 inline-block"
          >
            🧠
          </motion.div>
          <p className="text-sm text-muted-foreground">
            Generando tu roadmap personalizado...
          </p>
        </motion.div>
      </VMindCardContent>

      <VMindCardFooter className="justify-center">
        <VMindButton
          variant="story"
          size="lg"
          onClick={onComplete}
          className="w-full"
        >
          ¡Ver mi roadmap! 🗺️
        </VMindButton>
      </VMindCardFooter>
    </>
  );
}