import os, re

script_engine = '''
<script>
// ==========================================================================
// Motor Avançado de Projetos: Horizontal Pin + Distance Blur/Zoom + 3D Tilt
// ==========================================================================
(function() {
    function initProjectsExperience() {
        const sec = document.querySelector('section[data-slot="projects"]');
        const track = document.querySelector('#projects-horizontal-track');
        if (!sec || !track) return;

        const cards = Array.from(track.querySelectorAll('.group.relative'));
        let ticking = false;

        // 1. Atualização do Scroll Horizontal e Interpolação de Zoom/Blur por Proximidade
        function updateScrollAndEffects() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const isDesktop = windowWidth >= 900;
            
            if (!isDesktop) {
                sec.style.height = 'auto';
                track.style.transform = 'none';
                cards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.filter = 'none';
                    card.style.transform = 'none';
                });
                ticking = false;
                return;
            }

            const trackWidth = track.scrollWidth;
            const maxScrollDistance = Math.max(0, trackWidth - windowWidth + 140);
            sec.style.height = `${windowHeight + maxScrollDistance}px`;

            const rect = sec.getBoundingClientRect();
            const currentScroll = -rect.top;

            let currentTranslate = 0;
            if (currentScroll <= 0) {
                currentTranslate = 0;
            } else if (currentScroll >= maxScrollDistance) {
                currentTranslate = maxScrollDistance;
            } else {
                currentTranslate = currentScroll;
            }

            track.style.transform = `translateX(-${currentTranslate}px)`;

            // 2. Interpolação de Blur, Zoom e Opacidade de cada Card com base na distância do centro da tela
            const viewportCenter = windowWidth / 2;

            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + (cardRect.width / 2);
                const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
                const maxDistance = windowWidth * 0.75;
                
                // Normaliza a distância de 0 (centro exato) a 1 (longe)
                const distanceFactor = Math.min(1, distanceFromCenter / maxDistance);

                // Cálculo das propriedades visuais
                const opacity = 1 - (distanceFactor * 0.55); // de 1.0 a 0.45
                const blur = distanceFactor * 10; // de 0px a 10px de desfoque
                const scale = 1 - (distanceFactor * 0.12); // de 1.0 a 0.88 de zoom

                card.style.opacity = opacity.toFixed(3);
                card.style.filter = `blur(${blur.toFixed(1)}px)`;
                
                // Se o card não estiver com tilt de mouse ativo, aplica a escala do scroll
                if (!card.dataset.tilting) {
                    card.style.transform = `scale(${scale.toFixed(3)})`;
                }

                // Ajuste de brilho e destaque do título interno
                const title = card.querySelector('h3');
                if (title && !card.matches(':hover')) {
                    const titleOpacity = 0.15 + ((1 - distanceFactor) * 0.4);
                    title.style.opacity = titleOpacity.toFixed(2);
                }
            });

            ticking = false;
        }

        function requestUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollAndEffects);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', () => {
            requestUpdate();
        });

        // 3. 3D Tilt Magnético Interativo no Mouse
        cards.forEach(card => {
            const inner = card.querySelector('.overflow-hidden');
            const img = card.querySelector('img');

            card.addEventListener('mouseenter', () => {
                card.dataset.tilting = 'true';
                card.style.transition = 'transform 0.1s ease-out, filter 0.3s ease-out, opacity 0.3s ease-out';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -9; // rotação vertical
                const rotateY = ((x - centerX) / centerX) * 9;  // rotação horizontal

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
                if (img) {
                    img.style.transform = `scale(1.1) translate(${(-rotateY * 0.8).toFixed(1)}px, ${(-rotateX * 0.8).toFixed(1)}px)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                delete card.dataset.tilting;
                card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease-out, opacity 0.6s ease-out';
                if (img) {
                    img.style.transform = '';
                }
                requestUpdate();
            });
        });

        setTimeout(updateScrollAndEffects, 100);
        setTimeout(updateScrollAndEffects, 600);
        setTimeout(updateScrollAndEffects, 1200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectsExperience);
    } else {
        initProjectsExperience();
    }
})();
</script>
'''

targets = [
    'referencias-visuais/05-xkintaro/index.html',
    'preview-21st/public/xkintaro/index.html',
    'ref/xkintaro/index.html'
]

for target_file in targets:
    with open(target_file, 'r', encoding='utf-8') as f:
        html = f.read()

    # Clean old scroll engine and insert new full-featured engine with zoom, distance blur & 3D tilt
    html = re.sub(r'<script>\s*// Motor de Scroll Horizontal Pinado.*?</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'<script>\s*// ==========================================================================\s*Motor Avançado de Projetos:.*?</script>', '', html, flags=re.DOTALL)
    
    html = html.replace('</body>', f'{script_engine}</body>')

    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Applied distance blur, zoom & 3D tilt to {target_file}')
