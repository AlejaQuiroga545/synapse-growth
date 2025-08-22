import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { RoadmapView } from '@/components/roadmap/RoadmapView';
import { useAppContext } from '@/contexts/AppContext';

type PageType = 'dashboard' | 'roadmap' | 'notes' | 'resources';

export function AppLayout() {
  const { state } = useAppContext();
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'roadmap':
        return <RoadmapView />;
      case 'notes':
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2">Notas</h2>
              <p className="text-muted-foreground">¡Pronto podrás gestionar todas tus notas aquí!</p>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold mb-2">Recursos</h2>
              <p className="text-muted-foreground">¡Pronto podrás acceder a tu biblioteca de recursos!</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as PageType)}
      />
      {renderPage()}
    </div>
  );
}