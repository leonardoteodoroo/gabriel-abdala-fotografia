import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
  alt: string;
  audio: string;
  duration: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 0,
    name: 'Roberto S.',
    role: 'Diretor Financeiro (CFO)',
    text: 'O serviço da LuxeDrive redefiniu meu conceito de transporte corporativo. A pontualidade e a extrema discrição do motorista são indispensáveis para o meu dia a dia.',
    image: '/assets/avatar_depoimentos.png',
    alt: 'Roberto S., CFO de multinacional de tecnologia, cliente VIP de mobilidade corporativa.',
    audio: '/audio/audio_1.mp3',
    duration: '0:14',
  },
  {
    id: 1,
    name: 'Carla M.',
    role: 'CEO & Fundadora',
    text: 'Utilizamos o serviço para recepcionar investidores estrangeiros no aeroporto. A cortesia, os carros de luxo e a atenção aos detalhes geram a melhor primeira impressão possível.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    alt: 'Carla M., CEO e fundadora de startup, cliente fidelizada de transporte executivo.',
    audio: '/audio/audio_2.mp3',
    duration: '0:16',
  },
  {
    id: 2,
    name: 'Felipe D.',
    role: 'Sócio Executivo',
    text: 'Privacidade total. Posso fazer reuniões e ligações confidenciais no banco de trás sabendo que o profissional à frente segue rígidos padrões éticos. Vale cada centavo.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    alt: 'Felipe D., Sócio Executivo de consultoria, recomendando o serviço executivo.',
    audio: '/audio/audio_3.mp3',
    duration: '0:18',
  },
];

export default function TypewriterTestimonials() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTestimonial = selectedIndex !== null ? TESTIMONIALS_DATA[selectedIndex] : null;

  // Gerencia Áudio e Typewriter
  useEffect(() => {
    // Para áudio anterior
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (selectedIndex === null) {
      setDisplayText('Selecione um de nossos clientes abaixo para ler e ouvir o depoimento...');
      setIsPlaying(false);
      return;
    }

    const currentItem = TESTIMONIALS_DATA[selectedIndex];
    const fullText = currentItem.text;
    setDisplayText('');

    // Inicia Typewriter
    let i = 0;
    const typeNextChar = () => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
        timeoutRef.current = setTimeout(typeNextChar, 30);
      }
    };
    typeNextChar();

    // Inicia Áudio
    if (!isMuted && currentItem.audio) {
      const audio = new Audio(currentItem.audio);
      audioRef.current = audio;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.warn('Autoplay de áudio aguardando interação do usuário:', err);
          setIsPlaying(false);
        });

      audio.onended = () => {
        setIsPlaying(false);
      };
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedIndex, isMuted]);

  const togglePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) {
      if (activeTestimonial) {
        const audio = new Audio(activeTestimonial.audio);
        audioRef.current = audio;
        audio.play().then(() => setIsPlaying(true));
        audio.onended = () => setIsPlaying(false);
      }
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
    if (audioRef.current && !isMuted) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="w-full min-h-screen py-24 px-4 bg-[#0B0C0E] text-white flex flex-col items-center justify-center font-sans select-none">
      <div className="max-w-[920px] w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-3">
            Depoimentos & Áudio Real
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white font-serif">
            A Opinião de Quem Confia
          </h2>
        </div>

        {/* Container do Balão + Setas + Avatares */}
        <div className="w-full flex flex-col items-center gap-12">
          {/* Balão de Depoimento Flutuante */}
          <div
            className={`relative w-full bg-black/40 border rounded-2xl p-8 md:p-10 min-h-[240px] md:min-h-[260px] flex flex-col justify-between backdrop-blur-xl shadow-2xl transition-all duration-500 ${
              selectedIndex !== null
                ? 'border-[#C5A880]/30 shadow-[0_30px_70px_rgba(197,168,128,0.06)] -translate-y-1'
                : 'border-[#C5A880]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Barra Superior do Balão: Equalizador e Controles de Áudio */}
            {activeTestimonial && (
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  {/* Botão Play / Pause */}
                  <button
                    onClick={togglePlayAudio}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] border border-[#C5A880]/30 text-xs font-mono font-medium transition-all"
                  >
                    {isPlaying ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                        <span>Pausar Áudio</span>
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        <span>Ouvir Depoimento ({activeTestimonial.duration})</span>
                      </>
                    )}
                  </button>

                  {/* Equalizador de Ondas Sonoras Animadas */}
                  {isPlaying && (
                    <div className="flex items-end gap-1 h-4 px-2">
                      <span className="w-1 bg-[#C5A880] rounded-full animate-[bounce_0.6s_infinite] h-3" />
                      <span className="w-1 bg-[#C5A880] rounded-full animate-[bounce_0.8s_infinite_0.1s] h-4" />
                      <span className="w-1 bg-[#C5A880] rounded-full animate-[bounce_0.5s_infinite_0.2s] h-2" />
                      <span className="w-1 bg-[#C5A880] rounded-full animate-[bounce_0.7s_infinite_0.15s] h-4" />
                      <span className="w-1 bg-[#C5A880] rounded-full animate-[bounce_0.6s_infinite_0.3s] h-3" />
                    </div>
                  )}
                </div>

                {/* Botão Mute */}
                <button
                  onClick={toggleMute}
                  className="text-white/50 hover:text-[#C5A880] transition-colors p-1"
                  title={isMuted ? 'Desmutar Áudio' : 'Mutar Áudio'}
                >
                  {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  )}
                </button>
              </div>
            )}

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

                    {/* Indicador Flutuante de Áudio no Avatar */}
                    {isSelected && isPlaying && (
                      <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#C5A880] text-black flex items-center justify-center shadow-lg border-2 border-black">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                      </span>
                    )}
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
