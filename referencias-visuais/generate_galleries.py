import os

base_dir = "referencias-visuais"
refs = [
    {
        "folder": "01-emily-broadbent",
        "title": "Emily Broadbent Photography",
        "subtitle": "Editorial Minimalista, Tons Pastel e Storytelling Emocional",
        "slices": [
            ("01_topo_header_hero.jpg", "01. Topo & Hero Section (Storytelling)"),
            ("02_sobre_behind_the_lens.jpg", "02. Sobre / Behind the Lens"),
            ("03_experiencia_noivas_portfolio.jpg", "03. Experiência & Portfólio Noivas"),
            ("04_cta_agendamento_noivado.jpg", "04. CTA Agendamento & Contato"),
            ("05_instagram_feed_footer.jpg", "05. Instagram Feed & Rodapé")
        ]
    },
    {
        "folder": "02-elle-danielle",
        "title": "Elle Danielle Photography",
        "subtitle": "Editorial Preto e Branco Sofisticado, Tipografia Serifada e Alta Autoridade",
        "slices": [
            ("01_hero_header.jpg", "01. Hero & Top Header"),
            ("02_menu_modern_love_recent_posts.jpg", "02. Menu & Modern Love Posts"),
            ("03_portfolio_categorias.jpg", "03. Portfólio por Categorias"),
            ("04_midia_publicacoes_features.jpg", "04. Mídia & Publicações de Autoridade"),
            ("05_sobre_bio_interativa.jpg", "05. Bio Interativa & Filosofia"),
            ("06_depoimentos_love_notes.jpg", "06. Love Notes (Depoimentos)"),
            ("07_formulario_contato.jpg", "07. Formulário de Contato Qualificado"),
            ("08_instagram_footer.jpg", "08. Grid Instagram & Rodapé")
        ]
    },
    {
        "folder": "03-jasmine-star",
        "title": "Jasmine Star Blog & Brand",
        "subtitle": "Marketing de Conversão, Lead Magnets de Alta Performance e Escala",
        "slices": [
            ("01_hero_header_apresentacao.jpg", "01. Hero & Apresentação da Marca"),
            ("02_recursos_gratuitos_planner.jpg", "02. Lead Magnet & Recursos Gratuitos"),
            ("03_programas_cursos_produtos.jpg", "03. Programas, Mentorias & Produtos"),
            ("04_artigo_destaque_blog.jpg", "04. Artigo em Destaque do Blog"),
            ("05_conectar_redes_contato.jpg", "05. Conexão Social & Canais"),
            ("06_instagram_midia_footer.jpg", "06. Instagram & Rodapé Estratégico")
        ]
    },
    {
        "folder": "04-amy-and-jordan",
        "title": "Amy & Jordan Photography",
        "subtitle": "Excelência em Ensino, Funil Educacional de Alta Conversão e Casamentos Reais",
        "slices": [
            ("01_hero_header_coaching.jpg", "01. Hero & Coaching Header"),
            ("02_tres_caminhos_aprendizado.jpg", "02. Três Caminhos de Aprendizado"),
            ("03_conheca_professores_midia.jpg", "03. Conheça os Mentores & Mídia"),
            ("04_historias_sucesso_antes_depois.jpg", "04. Histórias de Sucesso Antes & Depois"),
            ("05_depoimento_video_alunos.jpg", "05. Depoimentos em Vídeo de Alunos"),
            ("06_transformacoes_carreira_casos.jpg", "06. Transformações de Carreira"),
            ("07_cursos_produtos_mockups.jpg", "07. Cursos, Workshops & Mockups"),
            ("08_noivas_casamentos_luxo.jpg", "08. Seção Noivas & Casamentos de Luxo"),
            ("09_posts_populares_blog.jpg", "09. Posts Populares do Blog"),
            ("10_aula_gratuita_rodape.jpg", "10. Aula Gratuita & Rodapé")
        ]
    }
]

template = """<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} — Estudo de Referência Visual</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {{
            font-family: 'Inter', sans-serif;
            background-color: #08080A;
            color: #E2E8F0;
        }}
        .font-serif-luxury {{
            font-family: 'Cormorant Garamond', Georgia, serif;
        }}
    </style>
</head>
<body class="min-h-screen flex flex-col items-center">
    <!-- Top Nav -->
    <header class="w-full sticky top-0 z-50 bg-[#08080A]/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <a href="../../ref/" class="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 border border-white/15">
                <span>← Voltar ao Hub /ref</span>
            </a>
            <span class="text-xs text-white/40">|</span>
            <h1 class="text-sm font-semibold tracking-wide text-white font-serif-luxury text-base">{title}</h1>
        </div>
        <div class="flex items-center gap-2">
            <span class="text-[11px] bg-[#C5A880]/20 text-[#C5A880] px-2.5 py-1 rounded-full font-mono border border-[#C5A880]/30">Fatias em Alta Definição</span>
        </div>
    </header>

    <!-- Header Hero -->
    <section class="max-w-4xl w-full px-6 pt-10 pb-6 text-center">
        <span class="text-xs tracking-[0.2em] uppercase text-[#C5A880] font-semibold mb-2 block">Referência Visual & Direção de Arte</span>
        <h2 class="text-3xl sm:text-4xl font-light text-white font-serif-luxury mb-3">{title}</h2>
        <p class="text-sm sm:text-base text-white/60 max-w-2xl mx-auto font-light leading-relaxed">{subtitle}</p>
    </section>

    <!-- Visual Slices Showcase -->
    <main class="max-w-5xl w-full px-4 sm:px-6 py-6 flex flex-col gap-10">
        {slices_html}
    </main>

    <!-- Footer -->
    <footer class="w-full border-t border-white/10 mt-16 py-8 text-center text-xs text-white/40">
        <p>Gabriel Abdala Fotografia — Estudo de Referências Visuais</p>
    </footer>
</body>
</html>
"""

for ref in refs:
    slices_html = ""
    for filename, caption in ref["slices"]:
        slices_html += f"""
        <article class="bg-[#111114] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20">
            <div class="px-5 py-3.5 bg-[#16161A] border-b border-white/10 flex items-center justify-between">
                <span class="text-xs font-semibold text-white/90 tracking-wide">{caption}</span>
                <a href="./{filename}" target="_blank" class="text-[11px] text-[#C5A880] hover:underline font-mono">Abrir Original HD ↗</a>
            </div>
            <div class="p-2 sm:p-4 bg-black/40 flex justify-center">
                <img src="./{filename}" alt="{caption}" class="w-full max-w-4xl h-auto rounded-lg shadow-inner object-contain" loading="lazy" />
            </div>
        </article>
        """
    
    html_content = template.format(
        title=ref["title"],
        subtitle=ref["subtitle"],
        slices_html=slices_html
    )
    
    target_path = os.path.join(base_dir, ref["folder"], "index.html")
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Generated gallery for {ref['folder']} at {target_path}")
