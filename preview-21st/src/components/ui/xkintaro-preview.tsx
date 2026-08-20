import React from 'react';

export default function XkintaroPreview() {
  return (
    <div className="w-full h-screen bg-[#050505] flex flex-col pt-14">
      {/* Sub-header de controle */}
      <div className="w-full bg-[#0E0E10] border-b border-white/10 px-6 py-2.5 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
          </div>
          <span className="text-xs font-mono text-white/70 tracking-wider">
            🌐 Live Replica: <span className="text-[#C5A880] font-semibold">xkintaro.com (Awwwards Creative Dev)</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="./xkintaro/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 border border-white/15"
          >
            <span>Abrir em Nova Aba (Full Screen)</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>

      {/* Frame Interativo */}
      <iframe
        src="./xkintaro/index.html"
        title="Xkintaro Portfolio Replica"
        className="w-full flex-1 border-0 bg-background"
      />
    </div>
  );
}
