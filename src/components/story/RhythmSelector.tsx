import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RhythmOption {
  id: 'rapido' | 'equilibrado' | 'tranquilo';
  name: string;
  emoji: string;
  description: string;
  timeCommitment: string;
}

const RHYTHM_OPTIONS: RhythmOption[] = [
  {
    id: 'rapido',
    name: 'Rápido',
    emoji: '🚀',
    description: 'Quiero avanzar rápidamente',
    timeCommitment: '2-3 horas diarias'
  },
  {
    id: 'equilibrado',
    name: 'Equilibrado',
    emoji: '⚖️',
    description: 'Un ritmo constante y sostenible',
    timeCommitment: '1-2 horas diarias'
  },
  {
    id: 'tranquilo',
    name: 'Tranquilo',
    emoji: '🌱',
    description: 'Prefiero tomarme mi tiempo',
    timeCommitment: '30-60 min diarios'
  }
];

interface RhythmSelectorProps {
  rhythm: 'rapido' | 'equilibrado' | 'tranquilo';
  onRhythmChange: (rhythm: 'rapido' | 'equilibrado' | 'tranquilo') => void;
}

export function RhythmSelector({ rhythm, onRhythmChange }: RhythmSelectorProps) {
  return (
    <div className="space-y-4">
      {RHYTHM_OPTIONS.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onRhythmChange(option.id)}
          className={cn(
            "w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left",
            "hover:shadow-soft transform hover:-translate-y-1",
            rhythm === option.id
              ? "border-primary bg-primary/10 shadow-glow"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl">{option.emoji}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{option.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">{option.description}</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                ⏰ {option.timeCommitment}
              </div>
            </div>
            {rhythm === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-primary text-xl"
              >
                ✓
              </motion.div>
            )}
          </div>
        </motion.button>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 bg-accent/10 rounded-2xl border border-accent/20"
      >
        <p className="text-sm text-accent-foreground">
          💡 <strong>Tip:</strong> Puedes cambiar tu ritmo de aprendizaje en cualquier momento desde tu perfil.
        </p>
      </motion.div>
    </div>
  );
}