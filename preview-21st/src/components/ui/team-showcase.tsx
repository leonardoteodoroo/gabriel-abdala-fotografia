import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  twitter?: string;
  linkedin?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Carla Fontes',
    role: 'CHIEF OPERATIONS OFFICER',
    image: '/assets/team_carla.webp',
    alt: 'Carla Fontes, Chief Operations Officer (COO)',
    twitter: '#',
    linkedin: '#',
  },
  {
    id: '2',
    name: 'Mak VieSAinte',
    role: 'FOUNDER',
    image: '/assets/team_mak.webp',
    alt: 'Mak VieSAinte, Fundador',
    twitter: '#',
    linkedin: '#',
  },
  {
    id: '3',
    name: 'Osiris Balonga',
    role: 'LEAD FRONT-END',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    alt: 'Osiris Balonga, Lead Front-End Engineer',
    twitter: '#',
    linkedin: '#',
  },
  {
    id: '4',
    name: "Felipe D'Avila",
    role: 'CHIEF EXPERIENCE OFFICER',
    image: '/assets/team_felipe.webp',
    alt: "Felipe D'Avila, Chief Experience Officer",
    linkedin: '#',
  },
  {
    id: '5',
    name: 'Riche Makso',
    role: 'CTO - PRODUCT DESIGNER',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    alt: 'Riche Makso, CTO e Product Designer',
    twitter: '#',
    linkedin: '#',
  },
  {
    id: '6',
    name: 'Yasmin Alencar',
    role: 'CHIEF MARKETING OFFICER',
    image: '/assets/team_yasmin.webp',
    alt: 'Yasmin Alencar, Chief Marketing Officer',
    linkedin: '#',
  },
];

export default function TeamShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    setActiveId(null);
  };

  const handleClick = (id: string) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section className="w-full min-h-screen py-20 px-4 bg-[#0B0C0E] text-white flex flex-col items-center justify-center font-sans select-none">
      <div className="max-w-[1100px] w-full mx-auto">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-3">
            Nossa Equipe
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white font-serif">
            A Mente por trás da Excelência
          </h2>
        </div>

        {/* Container Principal */}
        <div
          className={`flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 transition-all duration-400 ${
            activeId !== null ? 'has-hover' : ''
          }`}
        >
          {/* Esquerda: Grid Assimétrico de Fotos */}
          <div className="flex gap-3 md:gap-4 shrink-0 justify-center">
            {/* Coluna 1 */}
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Member 1: Carla */}
              <div
                onClick={() => handleClick('1')}
                onMouseEnter={() => handleMouseEnter('1')}
                onMouseLeave={handleMouseLeave}
                className={`w-[130px] h-[140px] md:w-[155px] md:h-[165px] rounded-xl overflow-hidden cursor-pointer border transition-all duration-400 ${
                  activeId === '1'
                    ? 'scale-[1.03] border-[#C5A880]/60 shadow-[0_10px_30px_rgba(197,168,128,0.15)] opacity-100 z-10'
                    : activeId !== null
                    ? 'opacity-40 border-white/5'
                    : 'border-white/10 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={TEAM_MEMBERS[0].image}
                  alt={TEAM_MEMBERS[0].alt}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeId === '1'
                      ? 'grayscale-0 brightness-105'
                      : 'grayscale brightness-75'
                  }`}
                />
              </div>

              {/* Member 4: Felipe */}
              <div
                onClick={() => handleClick('4')}
                onMouseEnter={() => handleMouseEnter('4')}
                onMouseLeave={handleMouseLeave}
                className={`w-[130px] h-[140px] md:w-[155px] md:h-[165px] rounded-xl overflow-hidden cursor-pointer border transition-all duration-400 ${
                  activeId === '4'
                    ? 'scale-[1.03] border-[#C5A880]/60 shadow-[0_10px_30px_rgba(197,168,128,0.15)] opacity-100 z-10'
                    : activeId !== null
                    ? 'opacity-40 border-white/5'
                    : 'border-white/10 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={TEAM_MEMBERS[3].image}
                  alt={TEAM_MEMBERS[3].alt}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeId === '4'
                      ? 'grayscale-0 brightness-105'
                      : 'grayscale brightness-75'
                  }`}
                />
              </div>
            </div>

            {/* Coluna 2 (Offset Large) */}
            <div className="flex flex-col gap-3 md:gap-4 mt-8 md:mt-16">
              {/* Member 2: Mak */}
              <div
                onClick={() => handleClick('2')}
                onMouseEnter={() => handleMouseEnter('2')}
                onMouseLeave={handleMouseLeave}
                className={`w-[145px] h-[155px] md:w-[172px] md:h-[182px] rounded-xl overflow-hidden cursor-pointer border transition-all duration-400 ${
                  activeId === '2'
                    ? 'scale-[1.03] border-[#C5A880]/60 shadow-[0_10px_30px_rgba(197,168,128,0.15)] opacity-100 z-10'
                    : activeId !== null
                    ? 'opacity-40 border-white/5'
                    : 'border-white/10 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={TEAM_MEMBERS[1].image}
                  alt={TEAM_MEMBERS[1].alt}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeId === '2'
                      ? 'grayscale-0 brightness-105'
                      : 'grayscale brightness-75'
                  }`}
                />
              </div>

              {/* Member 5: Riche */}
              <div
                onClick={() => handleClick('5')}
                onMouseEnter={() => handleMouseEnter('5')}
                onMouseLeave={handleMouseLeave}
                className={`w-[145px] h-[155px] md:w-[172px] md:h-[182px] rounded-xl overflow-hidden cursor-pointer border transition-all duration-400 ${
                  activeId === '5'
                    ? 'scale-[1.03] border-[#C5A880]/60 shadow-[0_10px_30px_rgba(197,168,128,0.15)] opacity-100 z-10'
                    : activeId !== null
                    ? 'opacity-40 border-white/5'
                    : 'border-white/10 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={TEAM_MEMBERS[4].image}
                  alt={TEAM_MEMBERS[4].alt}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeId === '5'
                      ? 'grayscale-0 brightness-105'
                      : 'grayscale brightness-75'
                  }`}
                />
              </div>
            </div>

            {/* Coluna 3 (Offset Small) */}
            <div className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-8">
              {/* Member 3: Osiris */}
              <div
                onClick={() => handleClick('3')}
                onMouseEnter={() => handleMouseEnter('3')}
                onMouseLeave={handleMouseLeave}
                className={`w-[136px] h-[146px] md:w-[162px] md:h-[172px] rounded-xl overflow-hidden cursor-pointer border transition-all duration-400 ${
                  activeId === '3'
                    ? 'scale-[1.03] border-[#C5A880]/60 shadow-[0_10px_30px_rgba(197,168,128,0.15)] opacity-100 z-10'
                    : activeId !== null
                    ? 'opacity-40 border-white/5'
                    : 'border-white/10 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={TEAM_MEMBERS[2].image}
                  alt={TEAM_MEMBERS[2].alt}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeId === '3'
                      ? 'grayscale-0 brightness-105'
                      : 'grayscale brightness-75'
                  }`}
                />
              </div>

              {/* Member 6: Yasmin */}
              <div
                onClick={() => handleClick('6')}
                onMouseEnter={() => handleMouseEnter('6')}
                onMouseLeave={handleMouseLeave}
                className={`w-[136px] h-[146px] md:w-[162px] md:h-[172px] rounded-xl overflow-hidden cursor-pointer border transition-all duration-400 ${
                  activeId === '6'
                    ? 'scale-[1.03] border-[#C5A880]/60 shadow-[0_10px_30px_rgba(197,168,128,0.15)] opacity-100 z-10'
                    : activeId !== null
                    ? 'opacity-40 border-white/5'
                    : 'border-white/10 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={TEAM_MEMBERS[5].image}
                  alt={TEAM_MEMBERS[5].alt}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeId === '6'
                      ? 'grayscale-0 brightness-105'
                      : 'grayscale brightness-75'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Direita: Lista Interativa de Nomes */}
          <div className="flex flex-col gap-4 w-full max-w-[420px] lg:max-w-[400px]">
            {TEAM_MEMBERS.map(member => {
              const isActive = activeId === member.id;
              return (
                <div
                  key={member.id}
                  onClick={() => handleClick(member.id)}
                  onMouseEnter={() => handleMouseEnter(member.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`group cursor-pointer border-b border-white/5 pb-3 transition-all duration-300 ${
                    activeId !== null && !isActive ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2.5 rounded transition-all duration-300 ${
                        isActive
                          ? 'w-6 bg-[#C5A880]'
                          : 'w-3.5 bg-white/20 group-hover:bg-white/40'
                      }`}
                    />
                    <span
                      className={`text-lg font-medium transition-colors duration-300 ${
                        isActive
                          ? 'text-[#C5A880]'
                          : 'text-white/80 group-hover:text-white'
                      }`}
                    >
                      {member.name}
                    </span>

                    {/* Redes Sociais Integradas */}
                    <div
                      className={`flex items-center gap-2 ml-3 transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 translate-x-0 pointer-events-auto'
                          : 'opacity-0 -translate-x-2 pointer-events-none'
                      }`}
                    >
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-white/50 hover:text-[#C5A880] transition-colors"
                          title="X / Twitter"
                          onClick={e => e.stopPropagation()}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                          </svg>
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-white/50 hover:text-[#C5A880] transition-colors"
                          title="LinkedIn"
                          onClick={e => e.stopPropagation()}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mt-1.5 pl-6 text-[10px] font-semibold tracking-[0.2em] text-[#8E8B85] uppercase">
                    {member.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
