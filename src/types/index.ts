// V-Mind Type Definitions

export interface User {
  id: string;
  email: string;
  nombre: string;
  selfAssessedLevel: number; // 1-5
  objetivo: string;
  intereses: string[];
  ritmo: 'rapido' | 'equilibrado' | 'tranquilo';
  createdAt: Date;
  updatedAt: Date;
}

export interface Interest {
  id: string;
  nombre: string;
  emoji: string;
}

export interface Roadmap {
  id: string;
  usuarioId: string;
  titulo: string;
  dominio: string;
  estado: 'activo' | 'cerrado' | 'archivado';
  origen: 'ia' | 'manual';
  version: number;
  progreso: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export interface Node {
  id: string;
  roadmapId: string;
  parentNodoId?: string;
  titulo: string;
  descripcion: string;
  tipo: 'tema' | 'subtema' | 'practica' | 'evaluacion' | 'remediacion';
  dificultad: number; // 1-5
  orden: number;
  estimadoMin: number;
  position: { x: number; y: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface NodeProgress {
  usuarioId: string;
  nodoId: string;
  estado: 'no_iniciado' | 'en_progreso' | 'completado' | 'bloqueado';
  score: number; // 0-100
  intentos: number;
  startedAt?: Date;
  completedAt?: Date;
  puntosOtorgados: number;
}

export interface Note {
  id: string;
  usuarioId: string;
  nodoId?: string;
  contenido: string;
  etiquetas: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  titulo: string;
  url: string;
  tipo: 'video' | 'articulo' | 'documentacion' | 'curso' | 'otro';
  proveedor: string;
  duracionMin?: number;
  metadata: {
    nivel: number;
    idioma: string;
    descripcion?: string;
  };
}

export interface UserResource {
  usuarioId: string;
  recursoId: string;
  nodoId?: string;
  notaPersonal?: string;
  createdAt: Date;
}

export interface Badge {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  emoji: string;
  criterio: {
    tipo: string;
    valor: number;
  };
}

export interface UserBadge {
  usuarioId: string;
  badgeId: string;
  otorgadaAt: Date;
}

export interface PointsLedger {
  id: string;
  usuarioId: string;
  nodoId?: string;
  delta: number;
  motivo: 'completar_nodo' | 'logro' | 'ajuste';
  createdAt: Date;
}

// Story State for Onboarding
export interface StoryState {
  step: number;
  intereses: string[];
  nivel: number;
  objetivo: string;
  ritmo: 'rapido' | 'equilibrado' | 'tranquilo';
}

// UI State
export interface AppState {
  user: User | null;
  currentRoadmap: Roadmap | null;
  nodes: Node[];
  progress: Record<string, NodeProgress>;
  isLoading: boolean;
  error: string | null;
}