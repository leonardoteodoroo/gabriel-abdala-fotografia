/**
 * ==========================================================================
 * Infinite 3D Gallery (Three.js WebGL)
 * Memórias Vivas em Profundidade Tridimensional com Shader de Tecido / Curvatura
 * Otimizado para 60 FPS com IntersectionObserver e Clamping de DPR
 * ==========================================================================
 */

(function() {
  // Lista de fotos autorais de alta resolução dos nossos assets
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

  // Configurações de Física e Renderização
  const CONFIG = {
    zSpacing: 5.5,
    visibleCount: 7,
    depthRange: 38.5, // visibleCount * zSpacing
    baseSpeed: 0.015,
    dragSensitivity: 0.006,
    damping: 0.94,
    maxDPR: 1.75,
    planeWidth: 3.2,
    planeHeight: 4.0
  };

  function init3DGallery() {
    const container = document.getElementById('infinite-3d-gallery-frame');
    const canvas = document.getElementById('infinite-3d-canvas');
    if (!container || !canvas || typeof THREE === 'undefined') return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    // Fundo neutro sofisticado alinhado ao tema
    scene.fog = new THREE.FogExp2(0x121214, 0.038);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    // 2. Renderer com DPR Clamping para economia de bateria e 60 FPS estáveis
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxDPR));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 3. Shaders Customizados (Cloth Ripple + Curvatura + Blur + Highlight)
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
        
        // Curvatura suave nas bordas
        float distCenter = length(pos.xy);
        float curve = distCenter * distCenter * scrollForce * 0.18;
        
        // Ondulação suave de tecido
        float ripple = sin(pos.x * 2.5 + time * 1.5 + scrollForce * 2.0) * 0.02 * (1.0 + abs(scrollForce) * 2.0);
        float rippleY = cos(pos.y * 2.0 + time * 1.2) * 0.015;
        
        pos.z -= (curve + ripple + rippleY);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Iluminação de realce na borda curva
        float highlight = abs(scrollForce) * 0.04;
        color.rgb += vec3(highlight);
        
        // Borda sutil interna de moldura editorial
        vec2 borderDist = min(vUv, 1.0 - vUv);
        float edge = min(borderDist.x, borderDist.y);
        float borderFade = smoothstep(0.0, 0.02, edge);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity * borderFade);
      }
    `;

    // 4. Carregamento de Texturas
    const textureLoader = new THREE.TextureLoader();
    const textures = GALLERY_IMAGES.map(src => {
      const tex = textureLoader.load(src);
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    });

    // 5. Criação dos Planos 3D com Geometria Subdividida
    const geometry = new THREE.PlaneGeometry(CONFIG.planeWidth, CONFIG.planeHeight, 24, 24);
    const planes = [];

    for (let i = 0; i < CONFIG.visibleCount; i++) {
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        vertexShader,
        fragmentShader,
        uniforms: {
          map: { value: textures[i % textures.length] },
          opacity: { value: 1.0 },
          blurAmount: { value: 0.0 },
          scrollForce: { value: 0.0 },
          time: { value: 0.0 },
          isHovered: { value: 0.0 }
        }
      });

      const mesh = new THREE.Mesh(geometry, mat);
      
      // Variação orgânica suave de X e Y para criar o layout tridimensional em camadas
      const offsetX = ((i % 3) - 1) * 0.85;
      const offsetY = (((i + 1) % 2) - 0.5) * 0.5;
      const initialZ = -i * CONFIG.zSpacing;

      mesh.position.set(offsetX, offsetY, initialZ);
      scene.add(mesh);

      planes.push({
        mesh,
        material: mat,
        baseOffsetX: offsetX,
        baseOffsetY: offsetY,
        imageIndex: i % textures.length
      });
    }

    // 6. Variáveis de Estado e Interação (Drag & Mouse)
    let scrollPosition = 0;
    let velocity = CONFIG.baseSpeed;
    let isDragging = false;
    let lastPointerY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isIntersecting = true;
    let clock = new THREE.Clock();

    // Eventos de Mouse e Touch no Container
    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      lastPointerY = e.clientY;
      container.style.cursor = 'grabbing';
    });

    window.addEventListener('pointerup', () => {
      if (isDragging) {
        isDragging = false;
        container.style.cursor = 'grab';
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const deltaY = e.clientY - lastPointerY;
        lastPointerY = e.clientY;
        velocity += deltaY * CONFIG.dragSensitivity;
      }

      const rect = container.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = mouseX * 0.15;
        targetRotX = mouseY * 0.12;
      } else {
        targetRotX = 0;
        targetRotY = 0;
      }
    });

    // Roda do mouse no container acelera a navegação
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      velocity += e.deltaY * 0.001;
    }, { passive: false });

    // 7. Loop de Renderização 60 FPS com Otimização de Distância
    let animationFrameId = null;

    function render() {
      if (!isIntersecting) return;

      const elapsedTime = clock.getElapsedTime();

      // Aplica velocidade e amortecimento
      velocity *= CONFIG.damping;
      // Garante velocidade base de auto-play contínuo
      if (Math.abs(velocity) < CONFIG.baseSpeed) {
        velocity = velocity >= 0 ? CONFIG.baseSpeed : -CONFIG.baseSpeed;
      }

      scrollPosition += velocity;

      // Movimento suave da câmera para seguir o mouse com perspectiva
      camera.rotation.y += (targetRotY - camera.rotation.y) * 0.06;
      camera.rotation.x += (targetRotX - camera.rotation.x) * 0.06;

      // Atualiza cada plano no túnel infinito
      planes.forEach((item, i) => {
        // Cálculo modular da posição Z com loop infinito perfeito
        const rawZ = (-i * CONFIG.zSpacing + scrollPosition);
        const modZ = ((rawZ % CONFIG.depthRange) + CONFIG.depthRange) % CONFIG.depthRange;
        const currentZ = modZ - (CONFIG.depthRange - 8); // Varia de -30.5 a +8

        item.mesh.position.z = currentZ;

        // Fade in suave no fundo e fade out suave ao ultrapassar a câmera
        let opacity = 1.0;
        if (currentZ < -20) {
          // Surgindo no horizonte
          opacity = THREE.MathUtils.smoothstep(currentZ, -CONFIG.depthRange + 8, -20);
        } else if (currentZ > 4) {
          // Ultrapassando a lente
          opacity = 1.0 - THREE.MathUtils.smoothstep(currentZ, 4, 8);
        }

        // Atualiza uniforms do shader
        item.material.uniforms.opacity.value = opacity;
        item.material.uniforms.time.value = elapsedTime;
        item.material.uniforms.scrollForce.value = THREE.MathUtils.clamp(velocity * 12.0, -1.0, 1.0);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    }

    // 8. IntersectionObserver (Congela 100% o render fora da tela)
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
    }, { threshold: 0.1 });

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

  // Inicializa quando o DOM e o Three.js estiverem disponíveis
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(init3DGallery, 150);
    });
  } else {
    setTimeout(init3DGallery, 150);
  }
})();
