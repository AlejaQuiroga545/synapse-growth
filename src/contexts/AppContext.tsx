import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User, Roadmap, Node, NodeProgress } from '@/types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ROADMAP'; payload: Roadmap | null }
  | { type: 'SET_NODES'; payload: Node[] }
  | { type: 'SET_PROGRESS'; payload: Record<string, NodeProgress> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_NODE_PROGRESS'; payload: { nodoId: string; progress: NodeProgress } };

const initialState: AppState = {
  user: null,
  currentRoadmap: null,
  nodes: [],
  progress: {},
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ROADMAP':
      return { ...state, currentRoadmap: action.payload };
    case 'SET_NODES':
      return { ...state, nodes: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_NODE_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload.nodoId]: action.payload.progress,
        },
      };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}