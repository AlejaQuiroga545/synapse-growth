import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node as FlowNode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { VMindCard, VMindCardHeader, VMindCardTitle, VMindCardContent } from '@/components/ui/vmind-card';
import { LearningNode } from './LearningNode';
import { NodeDetail } from './NodeDetail';

// Custom node types
const nodeTypes = {
  learning: LearningNode,
};

// Mock data for the roadmap
const mockNodes: FlowNode[] = [
  {
    id: '1',
    type: 'learning',
    position: { x: 250, y: 50 },
    data: { 
      title: 'Variables en JS', 
      status: 'completed',
      difficulty: 1,
      estimatedTime: 15,
      score: 92
    },
  },
  {
    id: '2',
    type: 'learning',
    position: { x: 100, y: 150 },
    data: { 
      title: 'Tipos de Datos', 
      status: 'completed',
      difficulty: 2,
      estimatedTime: 20,
      score: 87
    },
  },
  {
    id: '3',
    type: 'learning',
    position: { x: 400, y: 150 },
    data: { 
      title: 'Funciones Básicas', 
      status: 'in_progress',
      difficulty: 3,
      estimatedTime: 30,
      score: 0
    },
  },
  {
    id: '4',
    type: 'learning',
    position: { x: 250, y: 250 },
    data: { 
      title: 'Arrays y Métodos', 
      status: 'locked',
      difficulty: 3,
      estimatedTime: 25,
      score: 0
    },
  },
  {
    id: '5',
    type: 'learning',
    position: { x: 100, y: 350 },
    data: { 
      title: 'DOM Manipulation', 
      status: 'locked',
      difficulty: 4,
      estimatedTime: 35,
      score: 0
    },
  },
  {
    id: '6',
    type: 'learning',
    position: { x: 400, y: 350 },
    data: { 
      title: 'Event Handling', 
      status: 'locked',
      difficulty: 4,
      estimatedTime: 30,
      score: 0
    },
  },
];

const mockEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: false,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: false,
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'smoothstep',
    animated: false,
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    animated: false,
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    animated: false,
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    animated: false,
  },
];

export function RoadmapView() {
  const [nodes, setNodes, onNodesChange] = useNodesState(mockNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(mockEdges);
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: FlowNode) => {
    setSelectedNode(node.id);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <VMindCard>
            <VMindCardHeader>
              <VMindCardTitle className="text-2xl flex items-center gap-3">
                🗺️ Mi Roadmap de JavaScript
              </VMindCardTitle>
            </VMindCardHeader>
            <VMindCardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success">2</div>
                  <div className="text-sm text-muted-foreground">Completados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">1</div>
                  <div className="text-sm text-muted-foreground">En progreso</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-muted-foreground">3</div>
                  <div className="text-sm text-muted-foreground">Por hacer</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">89%</div>
                  <div className="text-sm text-muted-foreground">Score promedio</div>
                </div>
              </div>
            </VMindCardContent>
          </VMindCard>
        </motion.div>

        {/* Roadmap Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roadmap Flow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <VMindCard className="h-[600px] p-0 overflow-hidden">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                className="bg-gradient-to-br from-background to-primary/5"
              >
                <Controls className="bg-card border-border" />
                <MiniMap className="bg-card border-border" />
                <Background variant={"dots" as any} gap={12} size={1} className="opacity-30" />
              </ReactFlow>
            </VMindCard>
          </motion.div>

          {/* Node Detail Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NodeDetail
              nodeId={selectedNode}
              nodes={nodes}
              onClose={() => setSelectedNode(null)}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}