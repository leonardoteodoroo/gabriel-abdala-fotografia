import React, { useState } from 'react';
import DemoOne from '@/components/ui/demo';
import DemoPhotography from '@/components/ui/demo-photography';
import TeamShowcase from '@/components/ui/team-showcase';
import TypewriterTestimonials from '@/components/ui/typewriter-testimonials';
import XkintaroPreview from '@/components/ui/xkintaro-preview';

export default function App() {
  const [activeComponent, setActiveComponent] = useState<'xkintaro' | 'testimonials' | 'team' | 'infinite' | 'parallax'>('xkintaro');
  const [showRefMenu, setShowRefMenu] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#0B0C0E] text-white relative font-sans">
      {/* Top Floating Switcher */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/10 shadow-2xl max-w-[96vw] overflow-x-auto">
        <a
          href="../index.html"
          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-[#C5A880] transition-all shrink-0 border border-white/15 flex items-center gap-1"
          title="Ir para a Landing Page principal"
        >
          <span>← Site Principal</span>
        </a>

        <div className="w-[1px] h-4 bg-white/20 shrink-0" />

        <button
          onClick={() => setActiveComponent('xkintaro')}
          className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 shrink-0 ${
            activeComponent === 'xkintaro'
              ? 'bg-gradient-to-r from-[#C5A880] to-[#E6CA9E] text-black shadow-md font-bold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          🌐 05. Xkintaro (Awwwards)
        </button>
        <button
          onClick={() => setActiveComponent('testimonials')}
          className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 shrink-0 ${
            activeComponent === 'testimonials'
              ? 'bg-[#C5A880] text-black shadow-md font-semibold'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          💬 04. Depoimentos
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

        <div className="w-[1px] h-4 bg-white/20 shrink-0" />

        {/* Dropdown de Referências Fatiadas */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowRefMenu(!showRefMenu)}
            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#18181B] hover:bg-[#27272A] text-white/90 transition-all border border-white/15 flex items-center gap-1.5"
          >
            <span>📚 Fatias HD (4 Sites)</span>
            <span className="text-[10px] opacity-60">▼</span>
          </button>

          {showRefMenu && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-[#121214] border border-white/15 rounded-xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-2.5 py-1">Estudos Visuais & Fatias</span>
              <a
                href="../referencias-visuais/01-emily-broadbent/index.html"
                target="_blank"
                className="px-2.5 py-2 text-xs rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>🌸 Emily Broadbent</span>
                <span className="text-[10px] text-[#C5A880] font-mono">5 fatias ↗</span>
              </a>
              <a
                href="../referencias-visuais/02-elle-danielle/index.html"
                target="_blank"
                className="px-2.5 py-2 text-xs rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>🖤 Elle Danielle</span>
                <span className="text-[10px] text-[#C5A880] font-mono">8 fatias ↗</span>
              </a>
              <a
                href="../referencias-visuais/03-jasmine-star/index.html"
                target="_blank"
                className="px-2.5 py-2 text-xs rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>🚀 Jasmine Star</span>
                <span className="text-[10px] text-[#C5A880] font-mono">6 fatias ↗</span>
              </a>
              <a
                href="../referencias-visuais/04-amy-and-jordan/index.html"
                target="_blank"
                className="px-2.5 py-2 text-xs rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>💍 Amy & Jordan</span>
                <span className="text-[10px] text-[#C5A880] font-mono">10 fatias ↗</span>
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Render Active Component */}
      <div className="w-full h-full">
        {activeComponent === 'xkintaro' && <XkintaroPreview />}
        {activeComponent === 'testimonials' && <div className="pt-16"><TypewriterTestimonials /></div>}
        {activeComponent === 'team' && <div className="pt-16"><TeamShowcase /></div>}
        {activeComponent === 'infinite' && <DemoPhotography />}
        {activeComponent === 'parallax' && <DemoOne />}
      </div>
    </main>
  );
}
