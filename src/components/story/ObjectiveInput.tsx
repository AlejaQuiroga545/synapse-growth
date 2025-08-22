import React from 'react';
import { motion } from 'framer-motion';

interface ObjectiveInputProps {
  objective: string;
  onObjectiveChange: (objective: string) => void;
}

const EXAMPLE_OBJECTIVES = [
  "Construir mi primera app web en 2 meses",
  "Cambiar de carrera a desarrollo de software",
  "Mejorar mis habilidades de diseño UX",
  "Aprender Python para análisis de datos",
  "Crear un portafolio impresionante"
];

export function ObjectiveInput({ objective, onObjectiveChange }: ObjectiveInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={objective}
          onChange={(e) => onObjectiveChange(e.target.value)}
          placeholder="Mi objetivo es..."
          className="vmind-input w-full min-h-[100px] resize-none text-base"
          maxLength={200}
        />
        <div className="text-right text-xs text-muted-foreground mt-1">
          {objective.length}/200 caracteres
        </div>
      </div>

      {/* Example Suggestions */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">
          💡 Ejemplos de objetivos:
        </p>
        <div className="space-y-2">
          {EXAMPLE_OBJECTIVES.map((example, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onObjectiveChange(example)}
              className="w-full text-left p-3 text-sm bg-muted/50 hover:bg-muted rounded-xl transition-all duration-200 hover:shadow-soft border border-transparent hover:border-primary/20"
            >
              "{example}"
            </motion.button>
          ))}
        </div>
      </div>

      {objective.trim().length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-success/10 rounded-2xl border border-success/20"
        >
          <p className="text-sm text-success font-medium">
            🎯 ¡Perfecto! Tu objetivo está claro y enfocado.
          </p>
        </motion.div>
      )}
    </div>
  );
}