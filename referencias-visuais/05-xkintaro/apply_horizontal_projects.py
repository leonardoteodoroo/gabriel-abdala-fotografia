import os, re

projects_section_html = '''<section id="projects">
    <section data-slot="projects" class="relative py-16 md:py-24 lg:py-32 xl:py-0" style="height: 3800px;">
        <div id="projects-sticky-container" class="w-full sticky top-0 h-screen flex items-center overflow-hidden bg-background">
            <div id="projects-horizontal-track" class="flex px-6 sm:px-12 xl:px-20 w-max items-center will-change-transform" style="transform: translateX(0px);">
                
                <!-- 1. Intro Header Card -->
                <div class="shrink-0 flex flex-col justify-center pr-8 sm:pr-12 xl:pr-16" style="width: 40vw; min-width: 360px; max-width: 600px;">
                    <div class="flex flex-col gap-4">
                        <div>
                            <span class="title-counter text-xs font-mono text-muted-foreground uppercase tracking-widest">[003]</span>
                        </div>
                        <div>
                            <h2 class="title text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-foreground">Projects</h2>
                        </div>
                        <div>
                            <p class="mt-4 text-xl sm:text-2xl xl:text-4xl font-light leading-snug text-foreground/90">
                                A collection of <span class="text-foreground/80 italic font-serif font-light">experiments</span>, 
                                <span class="text-foreground/80 italic font-serif font-light">products</span>, and 
                                <span class="text-foreground/80 italic font-serif font-light">digital artifacts</span> 
                                forged in the <span class="text-foreground font-semibold">void</span>.
                            </p>
                        </div>
                        <div>
                            <div class="mt-8 xl:mt-12 flex items-center gap-4">
                                <div class="h-px w-16 xl:w-24 bg-border"></div>
                                <span class="text-xs xl:text-sm font-mono text-foreground/50 uppercase tracking-widest flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right animate-pulse"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                    Scroll to explore
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Project 1: Aether Media -->
                <div class="group relative aspect-4/3 shrink-0 mx-4 xl:mx-8 perspective-1000 cursor-pointer" style="width: 48vw; min-width: 480px; max-width: 820px;">
                    <div class="relative w-full h-full overflow-hidden rounded-3xl bg-muted border border-border/50 transition-all duration-700 ease-out group-hover:border-foreground/30 shadow-2xl group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                        <div class="absolute inset-0 z-0">
                            <img alt="Aether Media" loading="lazy" decoding="async" class="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" src="./projects/20260427093247885.jpg">
                            <div class="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
                        </div>
                        <div class="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 xl:p-12">
                            <div class="flex justify-between items-start">
                                <div class="overflow-hidden">
                                    <span class="block text-xs xl:text-sm font-mono tracking-widest text-muted-foreground uppercase transition-transform duration-500 font-semibold">Media Tool</span>
                                </div>
                                <div class="overflow-hidden">
                                    <span class="block text-xs xl:text-sm font-mono text-muted-foreground font-semibold">2026</span>
                                </div>
                            </div>
                            <h3 class="absolute bottom-6 md:bottom-8 2xl:bottom-12 left-6 md:left-8 2xl:left-12 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase text-foreground opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">Aether Media</h3>
                        </div>
                    </div>
                </div>

                <!-- 3. Project 2: Aether JS -->
                <div class="group relative aspect-4/3 shrink-0 mx-4 xl:mx-8 perspective-1000 cursor-pointer" style="width: 48vw; min-width: 480px; max-width: 820px;">
                    <div class="relative w-full h-full overflow-hidden rounded-3xl bg-muted border border-border/50 transition-all duration-700 ease-out group-hover:border-foreground/30 shadow-2xl group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                        <div class="absolute inset-0 z-0">
                            <img alt="Aether JS" loading="lazy" decoding="async" class="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" src="./projects/20260427093247620.jpg">
                            <div class="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
                        </div>
                        <div class="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 xl:p-12">
                            <div class="flex justify-between items-start">
                                <div class="overflow-hidden">
                                    <span class="block text-xs xl:text-sm font-mono tracking-widest text-muted-foreground uppercase transition-transform duration-500 font-semibold">Library</span>
                                </div>
                                <div class="overflow-hidden">
                                    <span class="block text-xs xl:text-sm font-mono text-muted-foreground font-semibold">2026</span>
                                </div>
                            </div>
                            <h3 class="absolute bottom-6 md:bottom-8 2xl:bottom-12 left-6 md:left-8 2xl:left-12 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase text-foreground opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">Aether JS</h3>
                        </div>
                    </div>
                </div>

                <!-- 4. Project 3: File Manager -->
                <div class="group relative aspect-4/3 shrink-0 mx-4 xl:mx-8 perspective-1000 cursor-pointer" style="width: 48vw; min-width: 480px; max-width: 820px;">
                    <div class="relative w-full h-full overflow-hidden rounded-3xl bg-muted border border-border/50 transition-all duration-700 ease-out group-hover:border-foreground/30 shadow-2xl group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                        <div class="absolute inset-0 z-0">
                            <img alt="File Manager" loading="lazy" decoding="async" class="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0" src="./projects/20260305210513749.jpg">
                            <div class="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
                        </div>
                        <div class="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 xl:p-12">
                            <div class="flex justify-between items-start">
                                <div class="overflow-hidden">
                                    <span class="block text-xs xl:text-sm font-mono tracking-widest text-muted-foreground uppercase transition-transform duration-500 font-semibold">Web Application</span>
                                </div>
                                <div class="overflow-hidden">
                                    <span class="block text-xs xl:text-sm font-mono text-muted-foreground font-semibold">2025</span>
                                </div>
                            </div>
                            <h3 class="absolute bottom-6 md:bottom-8 2xl:bottom-12 left-6 md:left-8 2xl:left-12 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase text-foreground opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">File Manager</h3>
                        </div>
                    </div>
                </div>

                <!-- 5. End of Track -->
                <div class="shrink-0 flex flex-col justify-center items-center px-12" style="width: 30vw; min-width: 280px;">
                    <h3 class="text-6xl xl:text-[8vw] font-black tracking-tighter text-foreground/15 uppercase select-none">End</h3>
                </div>
            </div>
        </div>
    </section>
</section>'''

script_engine = '''
<script>
// Motor de Scroll Horizontal Pinado Ultra Fluido para Projects
(function() {
    function initProjectsHorizontal() {
        const sec = document.querySelector('section[data-slot="projects"]');
        const track = document.querySelector('#projects-horizontal-track');
        if (!sec || !track) return;

        let ticking = false;

        function update() {
            const isDesktop = window.innerWidth >= 900;
            
            if (!isDesktop) {
                sec.style.height = 'auto';
                track.style.transform = 'none';
                track.style.flexWrap = 'nowrap';
                track.style.overflowX = 'auto';
                ticking = false;
                return;
            }

            track.style.flexWrap = 'nowrap';
            track.style.overflowX = 'visible';

            const trackWidth = track.scrollWidth;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Distância exata de deslocamento
            const maxScrollDistance = Math.max(0, trackWidth - windowWidth + 120);
            sec.style.height = `${windowHeight + maxScrollDistance}px`;

            const rect = sec.getBoundingClientRect();
            const currentScroll = -rect.top;

            if (currentScroll <= 0) {
                track.style.transform = 'translateX(0px)';
            } else if (currentScroll >= maxScrollDistance) {
                track.style.transform = `translateX(-${maxScrollDistance}px)`;
            } else {
                track.style.transform = `translateX(-${currentScroll}px)`;
            }

            ticking = false;
        }

        function requestUpdate() {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', () => {
            update();
            requestUpdate();
        });

        // Recalibração pós renderização
        setTimeout(update, 100);
        setTimeout(update, 500);
        setTimeout(update, 1200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectsHorizontal);
    } else {
        initProjectsHorizontal();
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

    # Replace section
    p_start = html.find('<section id="projects">')
    if p_start != -1:
        p_end = html.find('</section></section>', p_start)
        if p_end != -1:
            html = html[:p_start] + projects_section_html + html[p_end + len('</section></section>'):]

    # Clean old scripts and insert new
    html = re.sub(r'<script>\s*// Motor de Scroll Horizontal Pinado.*?</script>', '', html, flags=re.DOTALL)
    html = html.replace('</body>', f'{script_engine}</body>')

    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Successfully applied robust Horizontal Scroll Projects to {target_file}')
