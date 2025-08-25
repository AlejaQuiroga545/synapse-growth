// Update this page (the content is just a fallback if you fail to update the page)

import React, { useState } from 'react';
import { StoryWizard } from '@/components/story/StoryWizard';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppContext } from '@/contexts/AppContext';
import { StoryState, User } from '@/types';

const Index = () => {
  const { state, dispatch } = useAppContext();
  const [showOnboarding, setShowOnboarding] = useState(!state.user);

  // Debug log to ensure component is mounting
  console.log('Index component rendering, user:', state.user, 'showOnboarding:', showOnboarding);

  const handleStoryComplete = async (storyData: Omit<StoryState, 'step'>) => {
    // Create mock user from story data
    const mockUser: User = {
      id: 'user-1',
      email: 'usuario@example.com',
      nombre: 'Usuario Demo',
      selfAssessedLevel: storyData.nivel,
      objetivo: storyData.objetivo,
      intereses: storyData.intereses,
      ritmo: storyData.ritmo,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Set user in context
    dispatch({ type: 'SET_USER', payload: mockUser });
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <StoryWizard onComplete={handleStoryComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppLayout />
    </div>
  );
};

export default Index;
