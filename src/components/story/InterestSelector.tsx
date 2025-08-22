import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Interest {
  id: string;
  name: string;
  emoji: string;
}

const AVAILABLE_INTERESTS: Interest[] = [
  { id: 'javascript', name: 'JavaScript', emoji: '⚡' },
  { id: 'python', name: 'Python', emoji: '🐍' },
  { id: 'uiux', name: 'UI/UX Design', emoji: '🎨' },
  { id: 'database', name: 'Bases de Datos', emoji: '🗄️' },
  { id: 'web', name: 'Desarrollo Web', emoji: '🌐' },
  { id: 'mobile', name: 'Apps Móviles', emoji: '📱' },
  { id: 'ai', name: 'Inteligencia Artificial', emoji: '🤖' },
  { id: 'data', name: 'Data Science', emoji: '📊' },
  { id: 'design', name: 'Diseño Gráfico', emoji: '🖌️' },
  { id: 'marketing', name: 'Marketing Digital', emoji: '📈' },
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

export function InterestSelector({ selectedInterests, onInterestsChange }: InterestSelectorProps) {
  const toggleInterest = (interestId: string) => {
    const isSelected = selectedInterests.includes(interestId);
    if (isSelected) {
      onInterestsChange(selectedInterests.filter(id => id !== interestId));
    } else {
      onInterestsChange([...selectedInterests, interestId]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {AVAILABLE_INTERESTS.map((interest, index) => (
          <motion.button
            key={interest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleInterest(interest.id)}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all duration-200 text-left",
              "hover:shadow-soft transform hover:-translate-y-1",
              selectedInterests.includes(interest.id)
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{interest.emoji}</span>
              <span className="font-medium text-sm">{interest.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {selectedInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-primary/5 rounded-2xl border border-primary/20"
        >
          <p className="text-sm text-primary font-medium">
            ✨ Has seleccionado {selectedInterests.length} tema{selectedInterests.length > 1 ? 's' : ''}
          </p>
        </motion.div>
      )}
    </div>
  );
}