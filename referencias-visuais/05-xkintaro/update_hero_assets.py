import re

def generate_column_html(images, col_class):
    items = ""
    for img in images:
        items += f'''
        <div class="w-full aspect-3/4 relative overflow-hidden rounded-3xl sm:rounded-4xl border border-white/10 shadow-2xl bg-[#121214] mb-3 sm:mb-4">
            <img alt="Fotografia de Casamento Autoral" class="object-cover w-full h-full grayscale contrast-[1.12] brightness-[0.88] transition-all duration-700" src="./assets/{img}" loading="eager" />
        </div>'''
    # Duplica os itens para criar o loop visual contínuo e infinito perfeito
    full_content = items + items
    return f'''
    <div class="flex-1 h-full overflow-hidden relative">
        <div class="flex flex-col pt-4 {col_class}">
            {full_content}
        </div>
    </div>'''

col1_images = [
    "ato1-vestido-makingof.webp",
    "ato2-noivo-lagrima.webp",
    "ato3-abraco-goldenhour.webp",
    "servico-prewedding.webp",
    "respiro-casal-sorrindo.webp",
    "hero-casamento.webp"
]

col2_images = [
    "hero-slide-2.webp",
    "ato3-caminhada-casal.webp",
    "ato4-pista-festa.webp",
    "servico-casamento.webp",
    "perfil-fotografo-gabriel.webp",
    "feed-olhar.webp"
]

col3_images = [
    "experiencia-passo1.webp",
    "experiencia-passo2.webp",
    "experiencia-passo3.webp",
    "ato1-joia-perfume.webp",
    "respiro-abraco.webp",
    "servico-aniversario.webp"
]

col1_html = generate_column_html(col1_images, "xk-col-up")
col2_html = generate_column_html(col2_images, "xk-col-down")
col3_html = generate_column_html(col3_images, "xk-col-up-2")

hero_slider_container = f'''
<div class="absolute top-0 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 bottom-0 h-full w-[280px] sm:w-[420px] md:w-[580px] lg:w-[720px] xl:w-[840px] flex gap-3 sm:gap-4 px-2 overflow-hidden z-5 pointer-events-none select-none opacity-40 hover:opacity-90 dark:opacity-45 transition-opacity duration-500">
    <div class="hidden xl:block flex-1 h-full overflow-hidden relative">
        {col3_html}
    </div>
    <div class="hidden sm:block flex-1 h-full overflow-hidden relative">
        {col1_html}
    </div>
    <div class="flex-1 h-full overflow-hidden relative">
        {col2_html}
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none z-10"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none z-10"></div>
</div>'''

css_animations = '''
<style>
/* ==========================================================================
   Animações de Movimento Vertical Infinito das Colunas de Fotos
   ========================================================================== */
@keyframes xkintaroScrollUp {
    0% { transform: translateY(0%); }
    100% { transform: translateY(-50%); }
}

@keyframes xkintaroScrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0%); }
}

@keyframes xkintaroScrollUpAlt {
    0% { transform: translateY(0%); }
    100% { transform: translateY(-50%); }
}

.xk-col-up {
    animation: xkintaroScrollUp 32s linear infinite !important;
    will-change: transform;
}

.xk-col-down {
    animation: xkintaroScrollDown 38s linear infinite !important;
    will-change: transform;
}

.xk-col-up-2 {
    animation: xkintaroScrollUpAlt 28s linear infinite !important;
    will-change: transform;
}

/* Visibilidade e transições universais */
[class*="will-change"] {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
    visibility: visible !important;
}

/* Custom Cursor Magnético */
#xk-custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 999999;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: transparent;
}

#xk-custom-cursor.hovering {
    width: 64px;
    height: 64px;
    background-color: #ffffff;
    border-color: #ffffff;
}

#xk-custom-cursor .cursor-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ffffff;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

#xk-custom-cursor.hovering .cursor-dot {
    transform: scale(0);
    opacity: 0;
}

.z-99999.preloader-hidden {
    opacity: 0 !important;
    pointer-events: none !important;
    transform: translateY(-100%) !important;
    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
</style>
'''

script_engine = '''
<!-- Custom Cursor HTML -->
<div id="xk-custom-cursor">
    <div class="cursor-dot"></div>
</div>

<script>
(function() {
    // 1. Motor de Partículas Interativo
    class Particle {
        constructor(width, height, dpr) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseVx = (Math.random() - 0.5) * 0.6 * dpr;
            this.baseVy = (Math.random() - 0.5) * 0.6 * dpr;
            this.vx = this.baseVx;
            this.vy = this.baseVy;
            this.radius = (1.5 * Math.random() + 0.5) * dpr;
            this.alpha = 0.5 * Math.random() + 0.18;
        }

        update(width, height, mouse, dpr) {
            if (this.x < 0 || this.x > width) {
                this.baseVx *= -1;
                this.vx *= -1;
                this.x = Math.max(0, Math.min(this.x, width));
            }
            if (this.y < 0 || this.y > height) {
                this.baseVy *= -1;
                this.vy *= -1;
                this.y = Math.max(0, Math.min(this.y, height));
            }

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                let force = (mouse.radius - dist) / mouse.radius;
                this.vx += -(dx / dist) * force * 3 * dpr;
                this.vy += -(dy / dist) * force * 3 * dpr;
            }

            this.vx += (this.baseVx - this.vx) * 0.04;
            this.vy += (this.baseVy - this.vy) * 0.04;

            let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            let maxSpeed = 4 * dpr;
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }

            this.x += this.vx;
            this.y += this.vy;
        }

        draw(ctx, isDark) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.alpha})` : `rgba(0, 0, 0, ${this.alpha})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles = [];
        let rect = canvas.getBoundingClientRect();
        let dpr = window.devicePixelRatio || 1;
        let mouse = { x: -1000, y: -1000, radius: 140 * dpr };
        let isDark = document.documentElement.classList.contains('dark') || true;

        function resize() {
            rect = canvas.getBoundingClientRect();
            dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            mouse.radius = 140 * dpr;

            particles = [];
            let count = Math.floor((rect.width * rect.height) / 12000);
            count = Math.max(35, Math.min(count, 160));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(canvas.width, canvas.height, dpr));
            }
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(canvas.width, canvas.height, mouse, dpr);
                particles[i].draw(ctx, isDark);
            }
            requestAnimationFrame(render);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX - rect.left) * dpr;
            mouse.y = (e.clientY - rect.top) * dpr;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        resize();
        render();
    }

    // 2. Custom Spring Cursor
    function initCustomCursor() {
        const cursor = document.getElementById('xk-custom-cursor');
        if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

        let mouseX = -100, mouseY = -100;
        let curX = -100, curY = -100;
        let isVisible = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) {
                isVisible = true;
                curX = mouseX;
                curY = mouseY;
            }
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });

        const hoverSelector = 'a, button, input, select, textarea, [role="button"], .cursor-pointer';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverSelector)) {
                cursor.classList.add('hovering');
            } else {
                cursor.classList.remove('hovering');
            }
        });

        function animateCursor() {
            curX += (mouseX - curX) * 0.18;
            curY += (mouseY - curY) * 0.18;
            cursor.style.left = `${curX}px`;
            cursor.style.top = `${curY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // 3. Auto Dismiss Preloader
    function initPreloader() {
        const preloader = document.querySelector('.z-99999');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
                setTimeout(() => preloader.style.display = 'none', 750);
            }, 600);
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initPreloader();
            initParticles();
            initCustomCursor();
            setupSmoothScroll();
        });
    } else {
        initPreloader();
        initParticles();
        initCustomCursor();
        setupSmoothScroll();
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

    # Replace old slider container with new 3-column real asset slider
    # Matches <div class="absolute top-0 right-6 ... to </div></div>
    slider_pattern = r'<div class="absolute top-0 right-6.*?</section>'
    
    # We replace the slider portion before <div class="relative z-20 flex-1 flex flex-col
    # Let us locate id="home"
    if 'id="home"' in html:
        # Find start of home section and inner replacement
        home_pos = html.find('id="home"')
        canvas_pos = html.find('<canvas', home_pos)
        content_pos = html.find('<div class="relative z-20 flex-1 flex flex-col', home_pos)
        
        if canvas_pos != -1 and content_pos != -1:
            # Construct new home inner
            new_html = html[:canvas_pos] + '<canvas class="absolute inset-0 w-full h-full pointer-events-none z-10"></canvas>' + hero_slider_container + html[content_pos:]
            html = new_html

    # Clean and insert CSS + Script
    html = re.sub(r'<style>\s*/\* ==========================================================================\s*Animações de Movimento Vertical.*?</style>', '', html, flags=re.DOTALL)
    html = re.sub(r'<style>\s*/\* Estilos e animações.*?</style>', '', html, flags=re.DOTALL)
    html = re.sub(r'<!-- Custom Cursor HTML -->.*?</script>', '', html, flags=re.DOTALL)

    html = html.replace('</head>', f'{css_animations}</head>')
    html = html.replace('</body>', f'{script_engine}</body>')

    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated {target_file} with 3-column real asset vertical slider!')
