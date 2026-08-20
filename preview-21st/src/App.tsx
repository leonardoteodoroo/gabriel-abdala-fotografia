import React, { useState } from 'react';
import DemoOne from '@/components/ui/demo';
import DemoPhotography from '@/components/ui/demo-photography';
import TeamShowcase from '@/components/ui/team-showcase';
import TypewriterTestimonials from '@/components/ui/typewriter-testimonials';

export default function App() {
  const [activeComponent, setActiveComponent] = useState<'testimonials' | 'team' | 'infinite' | 'parallax'>('testimonials');

  return (
    <main className="w-full min-h-screen bg-[#0B0C0E] text-white relative">
      {/* Top Floating Switcher */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/10 shadow-2xl max-w-[95vw] overflow-x-auto">
        <button
          onClick={() => setActiveComponent('testimonials')}
          className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 shrink-0 ${
            activeComponent === 'testimonials'
              ? 'bg-[#C5A880] text-black shadow-md font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          💬 04. Depoimentos Typewriter
        </button>
        <button
          onClick={() => setActiveComponent('team')}
          className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 shrink-0 ${
            activeComponent === 'team'
              ? 'bg-[#C5A880] text-black shadow-md font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          ✨ 03. Nossa Equipe
        </button>
        <button
          onClick={() => setActiveComponent('infinite')}
          className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 shrink-0 ${
            activeComponent === 'infinite'
              ? 'bg-white text-black shadow-md font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          02. Infinite 3D Gallery
        </button>
        <button
          onClick={() => setActiveComponent('parallax')}
          className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 shrink-0 ${
            activeComponent === 'parallax'
              ? 'bg-white text-black shadow-md font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          01. 3D Parallax Matrix
        </button>
      </header>

      {/* Render Active Component */}
      <div className="w-full h-full pt-8 md:pt-0">
        {activeComponent === 'testimonials' && <TypewriterTestimonials />}
        {activeComponent === 'team' && <TeamShowcase />}
        {activeComponent === 'infinite' && <DemoPhotography />}
        {activeComponent === 'parallax' && <DemoOne />}
      </div>
    </main>
  );
}
