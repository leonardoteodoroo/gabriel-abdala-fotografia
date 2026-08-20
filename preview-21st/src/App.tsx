import React, { useState } from 'react';
import DemoOne from '@/components/ui/demo';
import DemoPhotography from '@/components/ui/demo-photography';

export default function App() {
  const [activeComponent, setActiveComponent] = useState<'infinite' | 'parallax'>('infinite');

  return (
    <main className="w-full min-h-screen bg-[#050505] text-white relative">
      {/* Top Floating Switcher */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-2xl">
        <button
          onClick={() => setActiveComponent('infinite')}
          className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${
            activeComponent === 'infinite'
              ? 'bg-white text-black shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          02. Infinite 3D Gallery (Three.js)
        </button>
        <button
          onClick={() => setActiveComponent('parallax')}
          className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${
            activeComponent === 'parallax'
              ? 'bg-white text-black shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          01. 3D Parallax Matrix (Framer Motion)
        </button>
      </header>

      {/* Render Component */}
      <div className="w-full h-full">
        {activeComponent === 'infinite' ? <DemoPhotography /> : <DemoOne />}
      </div>
    </main>
  );
}
