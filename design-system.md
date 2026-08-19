# Design System Oficial — Gabriel Abdala Fotografia

> **Conceito & Posicionamento:** *Quiet Luxury, Intimate Documentary & Organic Romance*  
> **Arquitetura de Tokens:** Baseada na especificação canônica de 3 camadas (Primitivos &rarr; Semânticos &rarr; Componentes)  
> **Fonte Estratégica:** `planejamento_estrategia_copy.md`  
> **Versão:** 1.0.0 (Fase de Produção)

---

## 1. Fundamentos & Princípios de Design

1. **Atemporalidade Editorial (*Quiet Luxury*):** Evitar clichês visuais berrantes (preto `#000000` chapado, dourados espelhados de formatura ou vermelho de varejo). A estética deve evocar revistas editoriais internacionais de casamento (*Vogue Weddings*, *Kinfolk*, *Showit*).
2. **Prioridade Visual & Respiração:** O espaço negativo (*whitespace*) não é espaço vazio; é respiração para as imagens brilharem.
3. **Legibilidade & Contraste Seguro:** Textos em grafite profundo (`#231F20`) sobre fundos de linho quente (`#F8F6F0`), atingindo conformidade WCAG AA/AAA.
4. **Movimento Orgânico & Micro-Interações:** Transições suaves com curvas cúbicas naturais (`cubic-bezier(0.16, 1, 0.3, 1)`), respeitando a preferência de acessibilidade `prefers-reduced-motion`.

---

## 2. Camada 1: Tokens Primitivos (Primitive Tokens)

Valores brutos imutáveis de cor, tipografia, espaçamento, sombras e raios.

### A. Paleta de Cores Bruta (Raw Palette)

```json
{
  "color": {
    "ivory": {
      "50": "#FDFCFB",
      "100": "#F8F6F0",
      "200": "#F3EFE8"
    },
    "sand": {
      "100": "#EDE7DE",
      "200": "#DFD7CB",
      "300": "#CBBFB6"
    },
    "charcoal": {
      "700": "#413D3E",
      "800": "#2D292A",
      "900": "#231F20",
      "950": "#181515"
    },
    "slate": {
      "400": "#8C8885",
      "500": "#686461",
      "600": "#4F4B49"
    },
    "sage": {
      "100": "#E5ECE0",
      "300": "#A8BA9C",
      "500": "#718265",
      "700": "#56654D",
      "900": "#3C4835"
    },
    "terracotta": {
      "100": "#F4ECE7",
      "300": "#D4BCB0",
      "500": "#A37B63",
      "700": "#7D5842"
    },
    "neutral": {
      "white": "#FFFFFF",
      "black": "#000000",
      "whatsapp": "#25D366"
    }
  }
}
```

---

### B. Tipografia Primitiva

*   **Família Display / Editorial (Títulos & Citações):**
    *   Fonte Principal: `'Cormorant Garamond', Georgia, 'Times New Roman', serif`
    *   Pesos: `300 (Light Italic)`, `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`
*   **Família Sans-Serif (Corpo, Navegação, Botões & Labels):**
    *   Fonte Principal: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
    *   Pesos: `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)`

#### Escala Tipográfica Fluida (Fluid Scale)

| Token | Tamanho Clamp | Line Height | Letter Spacing | Aplicação |
| :--- | :--- | :--- | :--- | :--- |
| `font-size-display-2xl` | `clamp(2.6rem, 4.8vw, 4.4rem)` | `1.10` | `-0.02em` | H1 Hero Fullscreen |
| `font-size-display-xl` | `clamp(2.2rem, 3.8vw, 3.4rem)` | `1.14` | `-0.01em` | H2 Títulos de Seção |
| `font-size-display-lg` | `clamp(1.8rem, 2.8vw, 2.6rem)` | `1.20` | `-0.01em` | H3 Subtítulos de Atos / Filosofia |
| `font-size-heading-md` | `1.50rem (24px)` | `1.25` | `0em` | Títulos de Cards / Serviços |
| `font-size-heading-sm` | `1.25rem (20px)` | `1.30` | `0em` | Títulos de FAQ / Experiência |
| `font-size-lead` | `1.125rem (18px)` | `1.75` | `0em` | Parágrafos de Destaque / Respiro |
| `font-size-body` | `1.00rem (16px)` | `1.68` | `0em` | Texto Corrido Principal |
| `font-size-body-sm` | `0.875rem (14px)` | `1.60` | `0.01em` | Descrições de Cards & Detalhes |
| `font-size-caption` | `0.75rem (12px)` | `1.40` | `0.02em` | Micro-cópias & Garantias |
| `font-size-eyebrow` | `0.75rem (12px)` | `1.20` | `0.22em` | Tags de Seção (Caixa Alta) |

---

### C. Escala de Espaçamento (Spacing Scale - Grid de 8px)

| Token | Valor em Rem | Valor em Pixels | Aplicação Típica |
| :--- | :--- | :--- | :--- |
| `space-1` | `0.25rem` | `4px` | Micro-ajustes de ícones e badges |
| `space-2` | `0.50rem` | `8px` | Gaps de badges e botões |
| `space-3` | `0.75rem` | `12px` | Paddings internos compactos |
| `space-4` | `1.00rem` | `16px` | Padding padrão de cards mobile |
| `space-6` | `1.50rem` | `24px` | Gaps de grids e margens de títulos |
| `space-8` | `2.00rem` | `32px` | Espaçamento entre blocos internos |
| `space-12` | `3.00rem` | `48px` | Separação de atos da galeria |
| `space-16` | `4.00rem` | `64px` | Margens de topo de seções |
| `space-20` | `5.00rem` | `80px` | Padding vertical de seções padrão |
| `space-28` | `7.00rem` | `112px` | Padding de seções amplas (Hero/CTA) |

---

### D. Formatos & Proporções de Imagem (Aspect Ratios)

| Token | Ratio | Aplicação e Enquadramento |
| :--- | :--- | :--- |
| `ratio-cinema` | `16 / 9` | Hero Background, Vídeo Cinematográfico, Entrada na Nave da Igreja, Pista de Dança Ampla |
| `ratio-editorial` | `4 / 5` | Retratos Verticais, Making of, Casal ao Pôr do Sol, Foto do Gabriel com Câmera, Cards de Serviços |
| `ratio-experience`| `3 / 4` | Cards de Processo / Experiência, Ensaios Descontraídos |
| `ratio-square` | `1 / 1` | Detalhes Afetivos (Alianças, Mãos, Buquê, Perfume), Fotos do Feed Social |

---

### E. Raios de Borda (Border Radius) & Elevações (Shadows)

*   `radius-sharp`: `4px` (Molduras de fotos, inputs e containers editoriais)
*   `radius-card`: `8px` (Cards de serviços, cards de experiência e caixas de FAQ)
*   `radius-modal`: `16px` (Lightbox modal)
*   `radius-pill`: `9999px` (Botões de CTA, tags de status e badges)

*   `elevation-subtle`: `0 4px 20px rgba(35, 31, 32, 0.04)`
*   `elevation-card`: `0 12px 36px rgba(35, 31, 32, 0.07)`
*   `elevation-editorial`: `0 16px 40px rgba(0, 0, 0, 0.12)` (Molduras com sobreposição de fotos)
*   `elevation-modal`: `0 30px 80px rgba(0, 0, 0, 0.50)` (Lightbox em foco)

---

## 3. Camada 2: Tokens Semânticos (Semantic Tokens)

Atribuição de propósito e contexto aos tokens primitivos.

```css
:root {
  /* Superfícies */
  --surface-canvas: var(--color-ivory-100);
  --surface-card: var(--color-neutral-white);
  --surface-sand: var(--color-sand-100);
  --surface-sand-light: var(--color-ivory-200);
  --surface-dark: var(--color-charcoal-950);
  --surface-overlay-dark: rgba(20, 18, 18, 0.88);
  --surface-modal-backdrop: rgba(18, 16, 16, 0.94);
  
  /* Textos */
  --text-primary: var(--color-charcoal-900);
  --text-secondary: var(--color-slate-500);
  --text-inverse: var(--color-ivory-100);
  --text-inverse-muted: rgba(248, 246, 240, 0.85);
  --text-accent-sage: var(--color-sage-700);
  --text-accent-terracotta: var(--color-terracotta-500);
  
  /* Interações & Ações */
  --action-primary-bg: var(--color-sage-500);
  --action-primary-hover: var(--color-sage-700);
  --action-primary-text: var(--color-neutral-white);
  --action-primary-shadow: rgba(113, 130, 101, 0.28);
  
  --action-whatsapp-bg: var(--color-neutral-whatsapp);
  --action-whatsapp-hover: #1EBE5D;
  --action-whatsapp-shadow: rgba(37, 211, 102, 0.35);
  
  /* Bordas */
  --border-subtle: rgba(35, 31, 32, 0.08);
  --border-medium: rgba(35, 31, 32, 0.16);
  --border-editorial-frame: var(--color-neutral-white);
  --border-active: var(--color-sage-500);
}
```

---

## 4. Camada 3: Especificação de Componentes (Component Architecture)

### 1. Hero Fullscreen (`c-hero-fullscreen`)
*   **Comportamento:** Ocupa 100vw e 100vh com limite de altura em telas ultrawide (`max-height: 880px`, `min-height: 650px`).
*   **Anatomia:**
    *   `hero-bg-layer`: Background com transição suave entre o vídeo de entrada (6s) e o slideshow de fotos de capa.
    *   `hero-overlay`: Gradiente de 90deg (`rgba(20, 18, 18, 0.88)` para `rgba(20, 18, 18, 0.30)`).
    *   `hero-content`: Alinhado à esquerda no container com H1 em serifada editorial e botão de CTA.
    *   `hero-status-badge`: Indicador flutuante discreto com animação de pulso na borda inferior direita.

### 2. Composição de Fotos Sobrepostas (`c-editorial-overlap`)
*   **Comportamento:** Cria sensação de álbum aberto ou galeria de arte física.
*   **Estrutura:**
    *   Foto Base (Vertical `4:5`): Ocupa 75% a 85% da largura da coluna, posicionada no topo/esquerda.
    *   Foto Secundária (Quadrada `1:1` ou Vertical `3:4`): Posicionada sobreposta no canto inferior/direito com deslocamento negativo (*offset* de 15% a 20%) e `z-index: 4`.
    *   Todas as fotos usam `border: 6px solid #FFFFFF` e `box-shadow: var(--elevation-editorial)`.

### 3. Galeria Narrativa em 4 Atos (`c-story-arc`)
*   **Ato 1 (Making of):** Composição sobreposta `4:5` (Vestido/Noiva) + `1:1` (Detalhes de Joias/Perfume).
*   **Ato 2 (A Cerimônia):** Foto panorâmica `16:9` (Nave da Igreja/Entrada) + Foto vertical `4:5` (Lágrima/SIM do Noivo).
*   **Ato 3 (O Pôr do Sol):** Dupla de fotos verticais `4:5` (Abraço Íntimo + Caminhada Espontânea a Dois).
*   **Ato 4 (A Festa):** Foto dinâmica `16:9` (Pista de Dança Fervendo) + Foto `1:1` (Brinde com Padrinhos).

### 4. Carrossel de Serviços Prestados (`c-services-carousel`)
*   **Comportamento:** Track horizontal com `scroll-snap-type: x mandatory` e `overflow-x: auto`.
*   **Card Anatomia:**
    *   Largura fixa: `320px` (desktop/tablet) / `280px` (mobile).
    *   Foto de cabeçalho no ratio `4:5` com tag contextual.
    *   Título H3, descrição de benefício emocional e link de CTA para o WhatsApp.
    *   Botões de navegação circulares independentes (Prev/Next) no cabeçalho.

### 5. Acordeão de FAQ (`c-accordion-faq`)
*   **Comportamento:** Expansão suave via transição de `max-height` (0 a 300px).
*   **Feedback Visual:** Ícone `+` rotaciona 45 graus (virando `×`) quando o item está ativo, e a borda recebe destaque em Sage (`#718265`).

### 6. Lightbox Modal com Zoom (`c-lightbox-modal`)
*   **Comportamento:** Ativação instantânea no clique de qualquer foto com bloqueio do scroll do body (`overflow: hidden`).
*   **Anatomia:**
    *   Backdrop escuro com `backdrop-filter: blur(16px)`.
    *   Botão Fechar (`lightbox-close-btn`): Círculo de `56px` com caractere `&times;` em `2.2rem` no canto superior direito.
    *   Caixa de Conteúdo: Animação de entrada `scale(0.85)` para `scale(1)` com área de preview em alta resolução e painel inferior de descrição.

### 7. Botão WhatsApp Flutuante Discreto (`c-whatsapp-floating`)
*   **Dimensões:** `52px × 52px` (circular perfeito).
*   **Posição:** `bottom: 1.75rem`, `right: 1.75rem`.
*   **Tooltip:** Pílula informativa que surge suavemente apenas no hover (`desktop`), sem bloquear a visão do mobile.

---

## 5. Diretrizes de Engenharia & Performance para Produção

1. **Formato das Imagens de Produção:**
   * Todas as fotos devem ser convertidas para `.webp` ou `.avif` com qualidade `82% - 85%`.
   * Resoluções padrão:
     * Fullscreen Hero: `1920 × 1080 px` (desktop) / `1080 × 1920 px` (mobile).
     * Retratos Verticais 4:5: `1080 × 1350 px`.
     * Detalhes Quadrados 1:1: `800 × 800 px`.
2. **Priorização de Carregamento:**
   * A imagem de capa da Hero deve conter `fetchpriority="high"` e `loading="eager"`.
   * Todas as fotos da galeria, serviços e rodapé devem conter `loading="lazy"` e `decoding="async"`.
3. **Acessibilidade & Semântica:**
   * Toda imagem deve conter `alt` descritivo com contexto emocional (ex: `alt="Noivo emocionado enxugando lágrima durante a cerimônia de casamento"`).
   * Links e botões de ação para WhatsApp devem conter atributos `target="_blank"`, `rel="noopener noreferrer"` e rótulos acessíveis `aria-label`.
