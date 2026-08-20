/**
 * ==========================================================================
 * Infinite 3D Gallery (Three.js WebGL)
 * Palco Full-Width Widescreen com Linha do Tempo (Timeline Scrubber) Interativa
 * Otimizado para 60 FPS com Scroll Mobile Suave (Touch Pan-Y & Delta Time)
 * ==========================================================================
 */

(function() {
  // Acervo fotográfico autoral dos nossos assets
  const GALLERY_IMAGES = [
    'assets/images/respiro-casal-sorrindo.webp',
    'assets/images/respiro-abraco.webp',
    'assets/images/respiro-maos-aliancas.webp',
    'assets/images/ato1-vestido-makingof.webp',
    'assets/images/ato2-noivo-lagrima.webp',
    'assets/images/ato3-abraco-goldenhour.webp',
    'assets/images/servico-prewedding.webp',
    'assets/images/feed-olhar.webp'
  ];

  // Configurações de Física, Proporção e Velocidade
  const CONFIG = {
    zSpacing: 6.0,
    visibleCount: 8,
    depthRange: 48.0, // visibleCount * zSpacing
    baseSpeed: 0.034, // Velocidade base fluida e constante
    dragSensitivity: 0.008,
    damping: 0.94,
    maxDPR: 1.75,
    planeWidth: 4.8,
    planeHeight: 5.6
  };

  function init3DGallery() {
    const container = document.getElementById('infinite-3d-gallery-frame');
    const canvas = document.getElementById('infinite-3d-canvas');
    const timelineTrack = document.getElementById('gallery-timeline-track');
    const timelineProgress = document.getElementById('gallery-timeline-progress');
    const timelineHandle = document.getElementById('gallery-timeline-handle');
    const timelineLabels = document.querySelectorAll('.gallery-timeline-labels span');

    if (!container || !canvas || typeof THREE === 'undefined') return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF8F6F0, 0.022);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 120);
    camera.position.set(0, 0, 11);

    // 2. Renderer com DPR Clamping e fundo transparente
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxDPR));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 3. Shaders Customizados (Cloth Wave Shader + Curvatura Lateral + Highlight)
    const vertexShader = `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        vec3 pos = position;
        
        // Curvatura suave e dinâmica baseada na velocidade
        float distCenter = length(pos.xy);
        float curve = distCenter * distCenter * scrollForce * 0.14;
        
        // Ondulação suave de tecido
        float rippleX = sin(pos.x * 2.0 + time * 2.0 + scrollForce * 2.5) * 0.025 * (1.0 + abs(scrollForce) * 2.0);
        float rippleY = cos(pos.y * 1.8 + time * 1.5) * 0.018;
        
        pos.z -= (curve + rippleX + rippleY);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D map;
      uniform float opacity;
      uniform float scrollForce;
      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Realce de luz sutil nas curvas
        float highlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(highlight);
        
        // Borda sutil interna de acabamento editorial
        vec2 borderDist = min(vUv, 1.0 - vUv);
        float edge = min(borderDist.x, borderDist.y);
        float borderFade = smoothstep(0.0, 0.015, edge);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity * borderFade);
      }
    `;

    // 4. Carregamento de Texturas com Filtro Linear
    const textureLoader = new THREE.TextureLoader();
    const textures = GALLERY_IMAGES.map(src => {
      const tex = textureLoader.load(src);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    });

    // 5. Geometria Subdividida e Meshs
    const geometry = new THREE.PlaneGeometry(CONFIG.planeWidth, CONFIG.planeHeight, 28, 28);
    const planes = [];

    for (let i = 0; i < CONFIG.visibleCount; i++) {
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        vertexShader,
        fragmentShader,
        uniforms: {
          map: { value: textures[i % textures.length] },
          opacity: { value: 1.0 },
          scrollForce: { value: 0.0 },
          time: { value: 0.0 }
        }
      });

      const mesh = new THREE.Mesh(geometry, mat);
      
      // Espalhamento orgânico de profundidade
      const offsetX = ((i % 3) - 1) * 1.6;
      const offsetY = (((i + 1) % 2) - 0.5) * 0.7;
      const initialZ = -i * CONFIG.zSpacing;

      mesh.position.set(offsetX, offsetY, initialZ);
      scene.add(mesh);

      planes.push({
        mesh,
        material: mat,
        baseOffsetX: offsetX,
        baseOffsetY: offsetY
      });
    }

    // 6. Variáveis de Estado e Interação Touch/Mouse
    let scrollPosition = 0;
    let velocity = CONFIG.baseSpeed;
    let isDragging = false;
    let isTouchMove = false;
    let startPointerX = 0;
    let startPointerY = 0;
    let lastPointerX = 0;
    let isTimelineScrubbing = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isIntersecting = true;
    let clock = new THREE.Clock();

    // ------------------------------------------------------------------------
    // Controles de Arraste com Proteção Total para Scroll Vertical Mobile
    // ------------------------------------------------------------------------
    container.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.gallery-timeline-container')) return;
      isDragging = true;
      isTouchMove = false;
      startPointerX = e.clientX;
      startPointerY = e.clientY;
      lastPointerX = e.clientX;
      container.style.cursor = 'grabbing';
    });

    window.addEventListener('pointerup', () => {
      isDragging = false;
      isTouchMove = false;
      container.style.cursor = 'grab';
      if (isTimelineScrubbing) {
        isTimelineScrubbing = false;
      }
    });

    window.addEventListener('pointercancel', () => {
      isDragging = false;
      isTouchMove = false;
      container.style.cursor = 'grab';
    });

    window.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const totalDeltaX = e.clientX - startPointerX;
        const totalDeltaY = e.clientY - startPointerY;

        // Se o usuário estiver deslizando o dedo na vertical para rolar a página no mobile,
        // NÃO interfere na velocidade do 3D nem causa travamento
        if (!isTouchMove) {
          if (Math.abs(totalDeltaY) > Math.abs(totalDeltaX) && Math.abs(totalDeltaY) > 6) {
            isDragging = false;
            return;
          } else if (Math.abs(totalDeltaX) > 6) {
            isTouchMove = true;
          }
        }

        if (isTouchMove || e.pointerType === 'mouse') {
          const deltaX = e.clientX - lastPointerX;
          lastPointerX = e.clientX;
          velocity += deltaX * CONFIG.dragSensitivity;
        }
      }

      // Parallax de Câmera com Mouse (apenas desktop)
      if (e.pointerType === 'mouse') {
        const rect = container.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
          targetRotY = mouseX * 0.10;
          targetRotX = mouseY * 0.06;
        } else {
          targetRotX = 0;
          targetRotY = 0;
        }
      }
    });

    // ------------------------------------------------------------------------
    // Linha do Tempo (Timeline Scrubber Interativo)
    // ------------------------------------------------------------------------
    function handleTimelineScrub(e) {
      if (!timelineTrack) return;
      const rect = timelineTrack.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      
      const targetScroll = progress * CONFIG.depthRange;
      const currentMod = ((scrollPosition % CONFIG.depthRange) + CONFIG.depthRange) % CONFIG.depthRange;
      const diff = targetScroll - currentMod;
      
      velocity = diff * 0.15;
      updateTimelineUI(progress);
    }

    if (timelineTrack) {
      timelineTrack.addEventListener('pointerdown', (e) => {
        isTimelineScrubbing = true;
        handleTimelineScrub(e);
      });

      window.addEventListener('pointermove', (e) => {
        if (isTimelineScrubbing) {
          handleTimelineScrub(e);
        }
      });
    }

    // Marcadores de Momentos da Timeline
    timelineLabels.forEach(label => {
      label.addEventListener('click', () => {
        const step = parseFloat(label.dataset.step || '0');
        const targetScroll = step * CONFIG.depthRange;
        const currentMod = ((scrollPosition % CONFIG.depthRange) + CONFIG.depthRange) % CONFIG.depthRange;
        velocity = (targetScroll - currentMod) * 0.2;
      });
    });

    function updateTimelineUI(progress) {
      const pct = (progress * 100).toFixed(1);
      if (timelineProgress) timelineProgress.style.width = `${pct}%`;
      if (timelineHandle) timelineHandle.style.left = `${pct}%`;
    }

    // 7. Loop de Renderização a 60/120 FPS Normalizado por Delta Time
    let animationFrameId = null;

    function render() {
      if (!isIntersecting) return;

      const delta = clock.getDelta();
      // Normalização de delta para 60 FPS (evita saltos ou engasgos de frame)
      const timeScale = Math.min(delta, 0.1) * 60;
      const elapsedTime = clock.getElapsedTime();

      // Aplica amortecimento e auto-play com velocidade constante
      velocity *= Math.pow(CONFIG.damping, timeScale);
      if (Math.abs(velocity) < CONFIG.baseSpeed && !isDragging && !isTimelineScrubbing) {
        velocity = velocity >= 0 ? CONFIG.baseSpeed : -CONFIG.baseSpeed;
      }

      scrollPosition += velocity * timeScale;

      // Atualiza a Timeline Scrubber automaticamente
      if (!isTimelineScrubbing) {
        const currentProgress = (((scrollPosition % CONFIG.depthRange) + CONFIG.depthRange) % CONFIG.depthRange) / CONFIG.depthRange;
        updateTimelineUI(currentProgress);
      }

      // Rotação suave da câmera
      camera.rotation.y += (targetRotY - camera.rotation.y) * 0.05 * timeScale;
      camera.rotation.x += (targetRotX - camera.rotation.x) * 0.05 * timeScale;

      // Posicionamento e Shaders dos Planos 3D
      planes.forEach((item, i) => {
        const rawZ = (-i * CONFIG.zSpacing + scrollPosition);
        const modZ = ((rawZ % CONFIG.depthRange) + CONFIG.depthRange) % CONFIG.depthRange;
        const currentZ = modZ - (CONFIG.depthRange - 9);

        item.mesh.position.z = currentZ;

        // Fade in suave no fundo e fade out suave ao ultrapassar a câmera
        let opacity = 1.0;
        if (currentZ < -28) {
          opacity = THREE.MathUtils.smoothstep(currentZ, -CONFIG.depthRange + 9, -28);
        } else if (currentZ > 4.5) {
          opacity = 1.0 - THREE.MathUtils.smoothstep(currentZ, 4.5, 9);
        }

        item.material.uniforms.opacity.value = opacity;
        item.material.uniforms.time.value = elapsedTime;
        item.material.uniforms.scrollForce.value = THREE.MathUtils.clamp(velocity * 10.0, -1.0, 1.0);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    }

    // 8. IntersectionObserver com Margem Generosa (Elimina Micro-Pausas durante o Scroll)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          clock.start();
          cancelAnimationFrame(animationFrameId);
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      });
    }, { rootMargin: '300px 0px 300px 0px', threshold: 0 });

    observer.observe(container);

    // 9. Resize Listener
    function onResize() {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxDPR));
    }

    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init3DGallery, 150));
  } else {
    setTimeout(init3DGallery, 150);
  }
})();
