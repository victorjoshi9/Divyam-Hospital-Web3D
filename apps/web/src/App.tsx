/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Suspense } from 'react';
import DesktopApp from './desktop/DesktopApp';
import MobileApp from './mobile/MobileApp';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(true);
  
  // Auto-detect view based on screen size — no manual switch
  useEffect(() => {
    const handleResize = () => {
      setView(window.innerWidth < 1024 ? 'mobile' : 'desktop');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => setLoading(false), 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {view === 'desktop'
            ? <ErrorBoundary><DesktopApp /></ErrorBoundary>
            : <ErrorBoundary><MobileApp /></ErrorBoundary>
          }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
