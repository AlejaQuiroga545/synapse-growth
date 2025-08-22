import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryState } from '@/types';
import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardDescription, VMindCardContent, VMindCardFooter } from '@/components/ui/vmind-card';
import { VMindButton } from '@/components/ui/vmind-button';
import { InterestSelector } from './InterestSelector';
import { LevelSelector } from './LevelSelector';
import { ObjectiveInput } from './ObjectiveInput';
import { RhythmSelector } from './RhythmSelector';
import { StoryComplete } from './StoryComplete';

const TOTAL_STEPS = 6;

interface StoryWizardProps {
  onComplete: (data: Omit<StoryState, 'step'>) => void;
}

export function StoryWizard({ onComplete }: StoryWizardProps) {
  const [state, setState] = useState<StoryState>({
    step: 1,
    intereses: [],
    nivel: 1,
    objetivo: '',
    ritmo: 'equilibrado'
  });

  const updateState = (updates: Partial<StoryState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (state.step < TOTAL_STEPS) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const canProceed = () => {
    switch (state.step) {
      case 1: return true; // Welcome screen
      case 2: return state.intereses.length > 0;
      case 3: return true; // Level is always valid (1-5)
      case 4: return state.objetivo.trim().length > 0;
      case 5: return true; // Rhythm is always selected
      case 6: return true; // Complete screen
      default: return false;
    }
  };

  const handleComplete = () => {
    const { step, ...data } = state;
    onComplete(data);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: "tween" as const,
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="vmind-progress mb-2">
            <motion.div 
              className="vmind-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(state.step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-center text-white/80 text-sm">
            Paso {state.step} de {TOTAL_STEPS}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <VMindCard variant="story">
              {state.step === 1 && (
                <>
                  <VMindCardHeader className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="text-6xl mb-4"
                    >
                      🧠✨
                    </motion.div>
                    <VMindCardTitle className="text-2xl">
                      ¡Hola! Soy V-Mind 👋
                    </VMindCardTitle>
                    <VMindCardDescription className="text-lg">
                      Tu mentor personalizado de aprendizaje. ¿Listos para convertir tu educación en una aventura emocionante?
                    </VMindCardDescription>
                  </VMindCardHeader>
                  <VMindCardContent className="text-center">
                    <p className="text-muted-foreground mb-6">
                      Te voy a hacer unas preguntas rápidas para crear tu roadmap de aprendizaje perfecto.
                    </p>
                  </VMindCardContent>
                  <VMindCardFooter className="justify-center">
                    <VMindButton variant="story" onClick={nextStep}>
                      ¡Comenzar! 🚀
                    </VMindButton>
                  </VMindCardFooter>
                </>
              )}

              {state.step === 2 && (
                <>
                  <VMindCardHeader>
                    <VMindCardTitle>¿Qué te emociona aprender? 🎯</VMindCardTitle>
                    <VMindCardDescription>
                      Selecciona todos los temas que te interesen. Puedes elegir varios.
                    </VMindCardDescription>
                  </VMindCardHeader>
                  <VMindCardContent>
                    <InterestSelector
                      selectedInterests={state.intereses}
                      onInterestsChange={(intereses) => updateState({ intereses })}
                    />
                  </VMindCardContent>
                </>
              )}

              {state.step === 3 && (
                <>
                  <VMindCardHeader>
                    <VMindCardTitle>¿Cómo evalúas tu nivel actual? 📊</VMindCardTitle>
                    <VMindCardDescription>
                      Sé honesto, esto me ayuda a personalizar mejor tu experiencia.
                    </VMindCardDescription>
                  </VMindCardHeader>
                  <VMindCardContent>
                    <LevelSelector
                      level={state.nivel}
                      onLevelChange={(nivel) => updateState({ nivel })}
                    />
                  </VMindCardContent>
                </>
              )}

              {state.step === 4 && (
                <>
                  <VMindCardHeader>
                    <VMindCardTitle>¿Cuál es tu objetivo principal? 🎯</VMindCardTitle>
                    <VMindCardDescription>
                      Describe brevemente qué quieres lograr con tu aprendizaje.
                    </VMindCardDescription>
                  </VMindCardHeader>
                  <VMindCardContent>
                    <ObjectiveInput
                      objective={state.objetivo}
                      onObjectiveChange={(objetivo) => updateState({ objetivo })}
                    />
                  </VMindCardContent>
                </>
              )}

              {state.step === 5 && (
                <>
                  <VMindCardHeader>
                    <VMindCardTitle>¿A qué ritmo prefieres aprender? ⏰</VMindCardTitle>
                    <VMindCardDescription>
                      Esto me ayuda a ajustar la carga de trabajo y las expectativas.
                    </VMindCardDescription>
                  </VMindCardHeader>
                  <VMindCardContent>
                    <RhythmSelector
                      rhythm={state.ritmo}
                      onRhythmChange={(ritmo) => updateState({ ritmo })}
                    />
                  </VMindCardContent>
                </>
              )}

              {state.step === 6 && (
                <StoryComplete
                  data={state}
                  onComplete={handleComplete}
                />
              )}

              {/* Navigation */}
              {state.step > 1 && state.step < 6 && (
                <VMindCardFooter className="justify-between pt-6">
                  <VMindButton
                    variant="outline"
                    onClick={prevStep}
                  >
                    Anterior
                  </VMindButton>
                  <VMindButton
                    variant="story"
                    onClick={nextStep}
                    disabled={!canProceed()}
                  >
                    Continuar
                  </VMindButton>
                </VMindCardFooter>
              )}
            </VMindCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}