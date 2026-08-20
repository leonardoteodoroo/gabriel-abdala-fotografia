import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
  alt: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 0,
    name: 'Roberto S.',
    role: 'Diretor Financeiro (CFO)',
    text: 'O serviço da LuxeDrive redefiniu meu conceito de transporte corporativo. A pontualidade e a extrema discrição do motorista são indispensáveis para o meu dia a dia.',
    image: '/assets/avatar_depoimentos.png',
    alt: 'Roberto S., CFO de multinacional de tecnologia, cliente VIP de mobilidade corporativa.',
  },
  {
    id: 1,
    name: 'Carla M.',
    role: 'CEO & Fundadora',
    text: 'Utilizamos o serviço para recepcionar investidores estrangeiros no aeroporto. A cortesia, os carros de luxo e a atenção aos detalhes geram a melhor primeira impressão possível.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    alt: 'Carla M., CEO e fundadora de startup, cliente fidelizada de transporte executivo.',
  },
  {
    id: 2,
    name: 'Felipe D.',
    role: 'Sócio Executivo',
    text: 'Privacidade total. Posso fazer reuniões e ligações confidenciais no banco de trás sabendo que o profissional à frente segue rígidos padrões éticos. Vale cada centavo.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    alt: 'Felipe D., Sócio Executivo de consultoria, recomendando o serviço executivo.',
  },
];

export default function TypewriterTestimonials() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [displayText, setDisplayText] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeTestimonial = selectedIndex !== null ? TESTIMONIALS_DATA[selectedIndex] : null;

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (selectedIndex === null) {
      setDisplayText('Selecione um de nossos clientes abaixo para ler o depoimento...');
      return;
    }

    const fullText = TESTIMONIALS_DATA[selectedIndex].text;
    setDisplayText('');

    let i = 0;
    const typeNextChar = () => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
        timeoutRef.current = setTimeout(typeNextChar, 30);
      }
    };

    typeNextChar();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedIndex]);

  return (
    <section className="w-full min-h-screen py-24 px-4 bg-[#0B0C0E] text-white flex flex-col items-center justify-center font-sans select-none">
      <div className="max-w-[920px] w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-3">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white font-serif">
            A Opinião de Quem Confia
          </h2>
        </div>

        {/* Container do Balão + Setas + Avatares */}
        <div className="w-full flex flex-col items-center gap-12">
          {/* Balão de Depoimento Flutuante */}
          <div
            className={`relative w-full bg-black/40 border rounded-2xl p-8 md:p-10 min-h-[220px] md:min-h-[240px] flex flex-col justify-between backdrop-blur-xl shadow-2xl transition-all duration-500 ${
              selectedIndex !== null
                ? 'border-[#C5A880]/30 shadow-[0_30px_70px_rgba(197,168,128,0.06)] -translate-y-1'
                : 'border-[#C5A880]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Texto com Efeito Máquina de Escrever */}
            <div className="text-lg md:text-2xl font-light italic leading-relaxed text-white/90 min-h-[90px] md:min-h-[100px]">
              “{displayText}”
              <span className="inline-block text-[#C5A880] font-bold ml-1 animate-pulse">|</span>
            </div>

            {/* Autor & Cargo */}
            <div
              className={`mt-6 self-end text-right transition-all duration-400 ${
                activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <p className="font-serif text-lg font-semibold text-[#C5A880]">
                {activeTestimonial?.name}
              </p>
              <p className="text-xs text-white/50 tracking-wider mt-0.5">
                {activeTestimonial?.role}
              </p>
            </div>

            {/* Setinha de Bolinhas 3D */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex !== null
                    ? 'bg-[#C5A880] scale-125 shadow-[0_0_8px_rgba(197,168,128,0.8)]'
                    : 'bg-[#C5A880]/40'
                }`}
              />
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  selectedIndex !== null ? 'bg-[#C5A880]/60' : 'bg-[#C5A880]/25'
                }`}
              />
              <div
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  selectedIndex !== null ? 'bg-[#C5A880]/40' : 'bg-[#C5A880]/15'
                }`}
              />
            </div>
          </div>

          {/* Grade de Avatares dos Clientes */}
          <div className="flex justify-center items-center gap-8 md:gap-14 pt-4">
            {TESTIMONIALS_DATA.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIndex(isSelected ? null : idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex flex-col items-center cursor-pointer transition-all duration-400 ${
                    isSelected
                      ? 'scale-105 opacity-100'
                      : selectedIndex !== null
                      ? 'opacity-40 hover:opacity-80'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Wrapper Circular com Borda Dourada */}
                  <div
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border-2 transition-all duration-400 mb-3 ${
                      isSelected
                        ? 'border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.35)]'
                        : 'border-white/15 group-hover:border-white/40'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {/* Nome do Cliente */}
                  <h3
                    className={`text-sm md:text-base font-medium transition-colors duration-300 ${
                      isSelected ? 'text-[#C5A880]' : 'text-white/80 group-hover:text-white'
                    }`}
                  >
                    {item.name}
                  </h3>

                  {/* Cargo Curto */}
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 mt-0.5">
                    {item.id === 0 ? 'CFO' : item.id === 1 ? 'CEO' : 'Sócio Executivo'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
