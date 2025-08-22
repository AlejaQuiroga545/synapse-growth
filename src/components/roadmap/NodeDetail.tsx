import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Node as FlowNode } from '@xyflow/react';
import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardContent, VMindCardFooter } from '@/components/ui/vmind-card';
import { VMindButton } from '@/components/ui/vmind-button';

interface NodeDetailProps {
  nodeId: string | null;
  nodes: FlowNode[];
  onClose: () => void;
}

interface NodeData {
  title: string;
  status: 'completed' | 'in_progress' | 'locked' | 'not_started';
  difficulty: number;
  estimatedTime: number;
  score?: number;
}

export function NodeDetail({ nodeId, nodes, onClose }: NodeDetailProps) {
  const node = nodeId ? nodes.find(n => n.id === nodeId) : null;

  if (!node) {
    return (
      <VMindCard variant="floating">
        <VMindCardContent className="text-center py-12">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="font-semibold text-lg mb-2">Explora tu roadmap</h3>
          <p className="text-muted-foreground text-sm">
            Haz clic en cualquier nodo para ver los detalles y comenzar a aprender
          </p>
        </VMindCardContent>
      </VMindCard>
    );
  }

  const data = node.data as unknown as NodeData;

  const getStatusMessage = () => {
    switch (data.status) {
      case 'completed':
        return {
          message: '¡Completado!',
          emoji: '🎉',
          color: 'text-success'
        };
      case 'in_progress':
        return {
          message: 'En progreso',
          emoji: '⚡',
          color: 'text-primary'
        };
      case 'locked':
        return {
          message: 'Bloqueado',
          emoji: '🔒',
          color: 'text-muted-foreground'
        };
      default:
        return {
          message: 'Disponible',
          emoji: '🎯',
          color: 'text-foreground'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        <VMindCard variant="floating">
          <VMindCardHeader>
            <div className="flex items-start justify-between">
              <VMindCardTitle className="text-lg">{data.title}</VMindCardTitle>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            <div className={`flex items-center gap-2 ${statusInfo.color}`}>
              <span>{statusInfo.emoji}</span>
              <span className="text-sm font-medium">{statusInfo.message}</span>
            </div>
          </VMindCardHeader>

          <VMindCardContent className="space-y-4">
            {/* Status-specific content */}
            {data.status === 'completed' && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-4 bg-success/10 rounded-2xl border border-success/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-success">Score obtenido</span>
                  <span className="text-2xl font-bold text-success">{data.score}%</span>
                </div>
                <p className="text-xs text-success/80">
                  ¡Excelente trabajo! Has dominado este tema.
                </p>
              </motion.div>
            )}

            {data.status === 'in_progress' && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-4 bg-primary/10 rounded-2xl border border-primary/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary">Progreso</span>
                  <span className="text-sm text-primary">33%</span>
                </div>
                <div className="w-full h-2 bg-background rounded-full mb-2">
                  <div className="w-1/3 h-full bg-primary rounded-full" />
                </div>
                <p className="text-xs text-primary/80">
                  Continúa con las actividades para completar este nodo.
                </p>
              </motion.div>
            )}

            {data.status === 'locked' && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-4 bg-muted/20 rounded-2xl border border-muted"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Prerrequisitos:</strong> Completa los nodos anteriores para desbloquear este tema.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>🎯 Variables en JS</span>
                  <span>📝 Tipos de Datos</span>
                </div>
              </motion.div>
            )}

            {/* Node Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-accent/10 rounded-xl">
                <div className="text-lg font-bold text-accent-foreground">{data.estimatedTime}</div>
                <div className="text-xs text-muted-foreground">minutos</div>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-xl">
                <div className="text-lg font-bold text-secondary-foreground">
                  {'★'.repeat(data.difficulty)}
                </div>
                <div className="text-xs text-muted-foreground">dificultad</div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-muted/20 rounded-xl">
              <h4 className="font-medium text-sm mb-2">¿Qué aprenderás?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.status === 'completed' 
                  ? "Ya has completado este tema. Puedes repasar el contenido o revisar tus notas."
                  : data.status === 'locked'
                  ? "Este contenido se desbloqueará cuando completes los prerrequisitos necesarios."
                  : "Aprenderás los conceptos fundamentales y realizarás ejercicios prácticos para dominar este tema."
                }
              </p>
            </div>
          </VMindCardContent>

          <VMindCardFooter className="gap-2">
            {data.status === 'completed' && (
              <>
                <VMindButton variant="outline" size="sm" className="flex-1">
                  Repasar
                </VMindButton>
                <VMindButton variant="secondary" size="sm" className="flex-1">
                  Ver notas
                </VMindButton>
              </>
            )}

            {data.status === 'in_progress' && (
              <VMindButton variant="primary" className="w-full">
                Continuar aprendiendo →
              </VMindButton>
            )}

            {data.status === 'not_started' && (
              <VMindButton variant="story" className="w-full">
                ¡Comenzar! 🚀
              </VMindButton>
            )}

            {data.status === 'locked' && (
              <VMindButton variant="outline" disabled className="w-full">
                🔒 Bloqueado
              </VMindButton>
            )}
          </VMindCardFooter>
        </VMindCard>
      </motion.div>
    </AnimatePresence>
  );
}