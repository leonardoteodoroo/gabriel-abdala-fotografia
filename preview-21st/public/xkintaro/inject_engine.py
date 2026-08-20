import os, re

html_path = 'referencias-visuais/05-xkintaro/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

exact_animations_code = """
<style>
/* Estilos e animações fiéis ao xkintaro.com */
.reveal-item {
    opacity: 1 !important;
    filter: blur(0px) !important;
    transform: translateY(0px) !important;
}

[class*="will-change"],
.will-change-\\[opacity\\,filter\\,transform\\] {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
    visibility: visible !important;
}

/* Animação Contínua Infinita do Slider Vertical */
@keyframes xkintaroScrollUp {
    0% { transform: translateY(0%); }
    100% { transform: translateY(-50%); }
}

@keyframes xkintaroScrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0%); }
}

.xk-col-up {
    animation: xkintaroScrollUp 35s linear infinite !important;
    will-change: transform;
}

.xk-col-down {
    animation: xkintaroScrollDown 42s linear infinite !important;
    will-change: transform;
}

/* Custom Cursor */
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
    border: 1px solid rgba(255, 255, 255, 0.5);
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
"""

script_injection = """
<!-- Custom Cursor HTML -->
<div id="xk-custom-cursor">
    <div class="cursor-dot"></div>
</div>

<script>
// ==========================================================================
// 1. Interactive Particles Engine (Fiel ao código original do xkintaro)
// ==========================================================================
(function() {
    class Particle {
        constructor(width, height, dpr) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.baseVx = (Math.random() - 0.5) * 0.6 * dpr;
            this.baseVy = (Math.random() - 0.5) * 0.6 * dpr;
            this.vx = this.baseVx;
            this.vy = this.baseVy;
            this.radius = (1.5 * Math.random() + 0.5) * dpr;
            this.alpha = 0.5 * Math.random() + 0.15;
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

    // ==========================================================================
    // 2. Custom Spring Cursor (Fiel ao Framer Motion Spring)
    // ==========================================================================
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

    // ==========================================================================
    // 3. Hero Slider Duplicação e Movimento Infinito
    // ==========================================================================
    function initHeroSlider() {
        const containers = document.querySelectorAll('#home .h-full.overflow-hidden.relative > .flex.flex-col');
        containers.forEach((col, index) => {
            const clones = col.innerHTML;
            col.innerHTML = clones + clones;
            if (index % 2 === 0) {
                col.classList.add('xk-col-up');
            } else {
                col.classList.add('xk-col-down');
            }
        });
    }

    // Auto Dismiss Preloader
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
            initHeroSlider();
            setupSmoothScroll();
        });
    } else {
        initPreloader();
        initParticles();
        initCustomCursor();
        initHeroSlider();
        setupSmoothScroll();
    }
})();
</script>
"""

# Clean any existing custom additions
html = re.sub(r'<style>\s*/\* Estilos e animações.*?</style>', '', html, flags=re.DOTALL)
html = re.sub(r'<style>\s*/\* Universal visibility.*?</style>', '', html, flags=re.DOTALL)
html = re.sub(r'<!-- Custom Cursor HTML -->.*?</script>', '', html, flags=re.DOTALL)

# Insert clean code
html = html.replace('</head>', f'{exact_animations_code}</head>')
html = html.replace('</body>', f'{script_injection}</body>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Successfully patched index.html with interactive particle engine, cursor and slider!')
