# Gabriel Abdala — Fotografia de Casamento & Ensaios Autorais

Landing Page de alta conversão, autoridade e presença digital oficial para o fotógrafo **Gabriel Abdala** (Goiânia - GO, Brasília - DF e Casamentos em todo o Brasil).

---

## 💎 1. Conceito Visual & Filosofia (Quiet Luxury)
- **Posicionamento:** Fotografia afetiva, espontânea e documental (*"Sem poses forçadas, sem sorrisos congelados"*).
- **Design System Editorial:** Paleta cromática de 3 camadas (*Warm Ivory, Soft Sand, Deep Charcoal, Muted Slate, Muted Sage e Warm Terracotta*).
- **Hero Imersiva Fullscreen:** Slideshow suave de fotografias em alta resolução com micro-garantia de agenda exclusiva e chamada direta para verificação de data no WhatsApp.
- **Galeria 3D Infinita (Three.js WebGL):** Palco Edge-to-Edge full-width com shaders de ondulação de tecido (*cloth wave*), curvatura suave em Z e *Timeline Scrubber* interativo sem sequestro de scroll.
- **A História do Seu Dia (Cronologia Completa):** Apresentação afetiva dividida em 4 momentos (*01. O Making Of*, *02. A Cerimônia*, *03. O Pôr do Sol a Dois*, *04. A Festa & A Pista*).
- **A Experiência Tátil do Álbum Fine Art:** Seção dedicada ao patrimônio físico da família com capa em linho natural cru, gravação personalizada em baixo-relevo fosco, papel 100% algodão museológico de 800g/m² e abertura panorâmica 180° (Layflat).
- **Carrossel de Coberturas & Serviços:** Visualização interativa de Casamentos & Mini Weddings, Pré-Wedding, Gestante & Família, Sessões em Estúdio, Aniversários Marcantes e Eventos Sociais.
- **Morfismo de Ação no Scroll:** O CTA principal da Hero transiciona de forma fluida para o botão flutuante (*Sticky Morph*) no canto inferior ao rolar a página.

---

## 🚀 2. Infraestrutura Técnica, SEO & GEO (AI Search Ready)

O projeto foi construído seguindo as melhores práticas de SEO moderno e GEO (*Generative Engine Optimization* para ChatGPT, Perplexity, Claude e Gemini):

- **Favicons & PWA Manifest:**
  - `favicon.svg` com monograma editorial `GA` em ouro nobre.
  - `favicon.ico` multi-resolução (16x16, 32x32, 48x48).
  - `favicon-96x96.png`, `apple-touch-icon.png` (180x180), `web-app-manifest-192x192.png` e `web-app-manifest-512x512.png`.
  - `site.webmanifest` configurado para Progressive Web Apps.
- **Robots & Crawlers de IA:**
  - `robots.txt` com liberação canônica geral e permissões explícitas para crawlers de IA (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`).
- **Sitemap com Google Image SEO:**
  - `sitemap.xml` com prioridade `1.0`, frequência semanal e tags completas de `image:image` vinculando as fotografias documentais da galeria.
- **Padrão llmstxt.org (GEO):**
  - `llms.txt`: Resumo estruturado com proposta de valor, localização e serviços para citações em IA.
  - `llms-full.txt`: Contexto completo com manifesto, tabela de processos, escopo do Álbum Fine Art e FAQ expandido para indexação profunda em RAG.
- **Schema.org JSON-LD (@graph):**
  - Entidade `LocalBusiness` / `Photographer` / `Person` (Gabriel Abdala) com geolocalização e raio de atendimento.
  - Dados estruturados de `FAQPage` para exibição de *Rich Snippets* nas buscas do Google.

---

## 📁 3. Estrutura do Repositório

```text
├── index.html                    # Estrutura HTML5 com SEO completo, Schema.org e Lightbox
├── style.css                     # Design System Vanilla CSS com tipografia fluida e animações
├── robots.txt                    # Controle de indexação para bots de busca e IA
├── sitemap.xml                   # Sitemap XML com Google Image SEO integrado
├── llms.txt                      # Resumo de IA no padrão llmstxt.org
├── llms-full.txt                 # Contexto integral para IA e RAG
├── site.webmanifest              # Web App Manifest PWA
├── favicon.svg / .ico / .png     # Suíte completa de ícones e favicons
├── CNAME                         # Apontamento gabrielabdala.semprenamoda.com.br
│
├── assets/
│   ├── js/
│   │   └── infinite-gallery-3d.js  # Motor Three.js WebGL com Timeline Scrubber
│   └── images/                     # Acervo fotográfico autoral otimizado em WebP
│
├── preview-21st/                 # Aplicação React/Vite com componentes avançados de referência
├── ref/                          # Build estático público sincronizado do laboratório 3D
│
├── design-system.md              # Especificação formal dos Design Tokens
└── planejamento_estrategia_copy.md # Arquitetura de persuasão e psicologia da noiva
```

---

## 🌐 4. Configuração DNS no Cloudflare

Para apontar o subdomínio `gabrielabdala.semprenamoda.com.br` para este site:
1. Acesse o painel da **Cloudflare** na zona `semprenamoda.com.br`.
2. Vá em **DNS** &rarr; **Records** &rarr; **Add Record**.
3. **Tipo:** `CNAME`
4. **Name:** `gabrielabdala`
5. **Target:** `leonardoteodoroo.github.io`
6. **Proxy status:** Ativo (Nuvem Laranja ☁️)
7. **SSL/TLS:** Modo *Full* ou *Full (Strict)*.
