// ===== INSTAGRAM MODULE =====
import { SELECTORS, INSTAGRAM_CONFIG } from '../utils/constants.js';
import { 
  getElement, 
  log
} from '../utils/helpers.js';

class InstagramManager {
  constructor() {
    this.grid = null;
    this.isInitialized = false;
    this.posts = [
      {
        id: 1,
        image: '/Imagens/Honda_City.webp',
        caption: 'Honda City 2020 — IPVA Pago, 1 Ano de Garantia',
        badge: 'Revisado',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 2,
        image: '/Imagens/Fox.webp',
        caption: 'Fox 2019 — Revisado + Baixa Quilometragem',
        badge: 'Revisado',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 3,
        image: '/Imagens/Voyage.webp',
        caption: 'Voyage 2018 — Completo + Multimídia + Econômico',
        badge: 'Revisado',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 4,
        image: '/Imagens/Clio.webp',
        caption: 'Clio 2020 — Completo + Ar Condicionado',
        badge: 'Revisado',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 5,
        image: '/Imagens/Siena.webp',
        caption: 'Siena 2019 — Documentação em dia + Revisado',
        badge: 'Revisado',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 6,
        image: '/Imagens/Honda.webp',
        caption: 'Honda Civic 2021 — Novo + Garantia de Fábrica',
        badge: 'Revisado',
        link: INSTAGRAM_CONFIG.baseUrl
      }
    ];
  }

  async init() {
    try {
      log('Inicializando módulo Instagram...');
      
      // Try multiple selectors to find the grid
      this.grid = getElement(SELECTORS.instagramGrid) || 
                 document.querySelector('#instagram-grid') ||
                 document.querySelector('.instagram__grid');
      
      if (!this.grid) {
        console.error('Grid do Instagram não encontrado. Tentando novamente...');
        // Try again after a short delay
        await new Promise(resolve => setTimeout(resolve, 500));
        this.grid = getElement(SELECTORS.instagramGrid) || 
                   document.querySelector('#instagram-grid') ||
                   document.querySelector('.instagram__grid');
        
        if (!this.grid) {
          console.error('Grid do Instagram ainda não encontrado após retry');
          return;
        }
      }

      log('Grid encontrado, carregando posts...');
      await this.loadPosts();
      
      this.isInitialized = true;
      log('Instagram inicializado com sucesso');
      
    } catch (error) {
      console.error('Erro ao inicializar Instagram:', error);
      // Force fallback content
      this.forceFallbackContent();
    }
  }

  forceFallbackContent() {
    const grid = document.querySelector('#instagram-grid') || 
                document.querySelector('.instagram__grid');
    
    if (grid) {
      grid.innerHTML = `
        <div class="instagram__post" data-post-id="fallback">
          <div class="instagram__image">
            <div class="car__badge">Revisado</div>
            <img src="/Imagens/logo.webp" alt="Veículo disponível" loading="lazy">
            <div class="instagram__overlay">
              <div class="car__info">
                <a href="https://wa.me/5527997356397" target="_blank" rel="noopener" class="car__whatsapp">
                  <i class="fab fa-whatsapp"></i>
                  <span>Tenho Interesse</span>
                </a>
              </div>
            </div>
          </div>
          <p class="instagram__caption">Veículos seminovos disponíveis - Consulte-nos!</p>
        </div>
      `;
      log('Conteúdo de fallback do Instagram carregado');
    }
  }

  async loadPosts() {
    try {
      log('Carregando posts do Instagram...');
      
      if (!this.grid) {
        console.error('Grid do Instagram não encontrado para carregar posts');
        return;
      }
      
      // Hide loading
      const loading = this.grid.querySelector('.instagram__loading');
      if (loading) {
        loading.style.display = 'none';
      }
      
      // Generate HTML
      const postsHTML = this.posts.map(post => `
        <div class="instagram__post" data-post-id="${post.id}">
          <div class="instagram__image">
            <div class="car__badge">${post.badge}</div>
            <img src="${post.image}" alt="${post.caption}" loading="lazy" onerror="this.src='/Imagens/logo.webp'; this.onerror=null;" onload="console.log('Imagem carregada:', this.src);">
            <div class="instagram__overlay">
              <div class="car__info">
                <a href="https://wa.me/5527997356397?text=Interesse%20no%20${encodeURIComponent(post.caption.split(' —')[0])}" target="_blank" rel="noopener" class="car__whatsapp">
                  <i class="fab fa-whatsapp"></i>
                  <span>Tenho Interesse</span>
                </a>
              </div>
            </div>
          </div>
          <p class="instagram__caption">${post.caption}</p>
        </div>
      `).join('');
      
      this.grid.innerHTML = postsHTML;
      
      log(`${this.posts.length} posts do Instagram carregados`);
      
    } catch (error) {
      console.error('Erro ao carregar posts do Instagram:', error);
      // Show fallback content
      if (this.grid) {
        this.grid.innerHTML = `
          <div class="instagram__post" data-post-id="fallback">
            <div class="instagram__image">
              <div class="car__badge">DISPONÍVEL</div>
              <img src="/Imagens/logo.webp" alt="Veículo disponível" loading="lazy">
              <div class="instagram__overlay">
                <div class="car__info">
                  <div class="car__price">Consulte</div>
                  <a href="https://wa.me/5527997356397" target="_blank" rel="noopener" class="car__whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    <span>Tenho Interesse</span>
                  </a>
                </div>
              </div>
            </div>
            <p class="instagram__caption">Veículos seminovos disponíveis - Consulte-nos!</p>
          </div>
        `;
      }
    }
  }

  destroy() {
    this.isInitialized = false;
    log('Módulo Instagram destruído');
  }
}

// Export singleton instance
export default new InstagramManager();
