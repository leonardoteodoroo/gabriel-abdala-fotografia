# 🏆 Estudo de Referência Visual: Xkintaro (Awwwards Creative Developer Portfolio)

**URL Original:** `https://www.xkintaro.com/en`  
**Autor / Perfil:** Kintaro — Creative Developer & Designer  
**Premiações:** Site do Dia / Indicado Awwwards / Showcase WebGL & Next.js  
**Pasta do Workspace:** [`referencias-visuais/05-xkintaro/`](file:///home/leossd/.agents/Memoria/Base%20de%20Projetos/Sites/Landing%20Pages/mendes-fotografia/referencias-visuais/05-xkintaro/)

---

## 🎨 1. Arquitetura Visual & Direção de Arte

### A. Paleta de Cores e Atmosfera:
* **Fundo:** Dark mode profundo (`#050505` / `hsl(var(--background))`) com contraste de tons de cinza suave e gradientes sutis de iluminação focal.
* **Tipografia:** Combinação de **Syne** (display futurista de alto impacto com tracking condensado nos títulos e menus) e **Inter** (alta legibilidade em textos de apoio e dados técnicos).
* **Tratamento de Imagem:** Fotografias e renderizações tratadas com alto contraste (`contrast-[1.08]`), luminosidade reduzida (`brightness-[0.8]`) e filtro preto e branco dinâmico (`grayscale`) que ganham vida e cor com interações.

---

## ⚡ 2. Seções & Engenharia Interativa

### 1. Preloader Circular com Canvas & Micro-animação
* Logo central com anel de progresso SVG circular (`stroke-dasharray="289"`) com rotação de -90 graus e efeito de desfoque de saída (`filter: blur(10px)` e `scale(0.8)`).

### 2. Hero Section com Slider Vertical em Grade Assimetrica
* Grid lateral com colunas verticais deslocadas contendo retratos em proporção `3:4` com bordas suaves (`rounded-4xl`).
* Efeito de animação contínua (*endless scroll/ticker*) mesclado em modo `luminosity` com o background.
* Canvas interativo com partículas e mesh de distorção fluida.

### 3. Stack Tecnológica Interativa
* Grade com cartões de tecnologias modernas (Next.js, TypeScript, Three.js/WebGL, Framer Motion, Tailwind CSS, Rust, Python, etc.) com ícones SVG vetorizados e brilho neon pontual (`neon.png`).

### 4. Vitrine de Projetos (Projects Showcase)
* Cartões expansíveis com pré-visualizações em alta fidelidade, badges de stack técnica e links dinâmicos para demonstrações interativas.

### 5. Seletor Multilíngue e Modo Noturno
* Botões circulares flutuantes com backdrop blur, efeito de brilho com varredura diagonal (`-skew-x-13`) e rotação de ícones ao passar o mouse.

---

## 💡 3. O que podemos reaproveitar no Projeto de Fotografia Gabriel Abdala?

1. **Slider Vertical em Parallax no Hero:** O conceito de colunas assimétricas com retratos em escala de cinza e luminosidade reduzida cria um impacto editorial cinematográfico perfeito para a abertura de um site de casamento ou ensaios premium.
2. **Micro-interações de Vidro Fosco (*Glassmorphism*):** Os botões de ação e modais usam `backdrop-blur-md` e bordas ultra sutis (`border-white/10`) que transmitem alta sofisticação.
3. **Cursor Dinâmico & Canvas de Partículas:** Uma camada sutil de partículas reativas ao mouse sobre o banner de hero adiciona vida sem comprometer a performance.

---

## 🔗 Como Visualizar Localmente:
* **Ambiente Integrado:** [http://localhost:5173/](http://localhost:5173/) *(Selecione a aba "🌐 05. Xkintaro (Awwwards)")*
* **Servidor Direto Dedicado:** [http://localhost:5174/](http://localhost:5174/)
