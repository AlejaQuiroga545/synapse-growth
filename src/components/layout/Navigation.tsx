import React from 'react';
import { motion } from 'framer-motion';
import { VMindButton } from '@/components/ui/vmind-button';
import { useAppContext } from '@/contexts/AppContext';

interface NavigationProps {
  currentPage: 'dashboard' | 'roadmap' | 'notes' | 'resources';
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { state } = useAppContext();
  const { user } = state;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', emoji: '🏠' },
    { id: 'roadmap', label: 'Roadmap', emoji: '🗺️' },
    { id: 'notes', label: 'Notas', emoji: '📝' },
    { id: 'resources', label: 'Recursos', emoji: '📚' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl cursor-pointer"
            >
              🧠
            </motion.div>
            <div>
              <h1 className="font-bold text-lg text-primary">V-Mind</h1>
              {user && (
                <p className="text-xs text-muted-foreground">
                  Hola, {user.nombre}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <VMindButton
                key={item.id}
                variant={currentPage === item.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="gap-2"
              >
                <span>{item.emoji}</span>
                <span className="hidden md:inline">{item.label}</span>
              </VMindButton>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-primary">125 pts</div>
              <div className="text-xs text-muted-foreground">🔥 7 días</div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium cursor-pointer"
            >
              {user?.nombre?.charAt(0) || 'U'}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}