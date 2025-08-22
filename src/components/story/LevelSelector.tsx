import React from 'react';
import { motion } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

const LEVEL_DESCRIPTIONS = [
  { value: 1, label: 'Novato', emoji: '🌱', description: 'Estoy comenzando desde cero' },
  { value: 2, label: 'Principiante', emoji: '🌿', description: 'Tengo conocimientos básicos' },
  { value: 3, label: 'Intermedio', emoji: '🌳', description: 'Puedo trabajar independientemente' },
  { value: 4, label: 'Avanzado', emoji: '🚀', description: 'Tengo experiencia sólida' },
  { value: 5, label: 'Experto', emoji: '⭐', description: 'Domino el tema profundamente' },
];

interface LevelSelectorProps {
  level: number;
  onLevelChange: (level: number) => void;
}

export function LevelSelector({ level, onLevelChange }: LevelSelectorProps) {
  const currentLevel = LEVEL_DESCRIPTIONS.find(l => l.value === level) || LEVEL_DESCRIPTIONS[0];

  return (
    <div className="space-y-6">
      {/* Current Selection Display */}
      <motion.div
        key={level}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20"
      >
        <div className="text-4xl mb-2">{currentLevel.emoji}</div>
        <h3 className="font-semibold text-lg text-primary">{currentLevel.label}</h3>
        <p className="text-sm text-muted-foreground mt-1">{currentLevel.description}</p>
      </motion.div>

      {/* Slider */}
      <div className="space-y-4">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[level]}
          onValueChange={(values) => onLevelChange(values[0])}
          max={5}
          min={1}
          step={1}
        >
          <Slider.Track className="bg-muted relative grow rounded-full h-3">
            <Slider.Range className="absolute bg-gradient-primary rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-6 h-6 bg-white shadow-lg rounded-full border-2 border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200"
            aria-label="Nivel"
          />
        </Slider.Root>

        {/* Level Markers */}
        <div className="flex justify-between px-1">
          {LEVEL_DESCRIPTIONS.map((levelDesc) => (
            <button
              key={levelDesc.value}
              onClick={() => onLevelChange(levelDesc.value)}
              className={cn(
                "flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200",
                level === levelDesc.value
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <span className="text-lg">{levelDesc.emoji}</span>
              <span className="text-xs font-medium">{levelDesc.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}