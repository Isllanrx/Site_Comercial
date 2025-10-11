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
        image: './Imagens/Honda_City.webp',
        caption: 'Honda City 2020 — IPVA Pago, 1 Ano de Garantia',
        price: 'R$ 65.900',
        badge: 'IPVA PAGO',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 2,
        image: './Imagens/Fox.webp',
        caption: 'Fox 2019 — Revisado + Baixa Quilometragem',
        price: 'R$ 45.900',
        badge: 'REVISADO',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 3,
        image: './Imagens/Voyage.webp',
        caption: 'Voyage 2018 — Completo + Multimídia + Econômico',
        price: 'R$ 52.900',
        badge: 'COMPLETO',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 4,
        image: './Imagens/Clio.webp',
        caption: 'Clio 2020 — Completo + Ar Condicionado',
        price: 'R$ 48.900',
        badge: 'AR GELANDO',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 5,
        image: './Imagens/Siena.webp',
        caption: 'Siena 2019 — Documentação em dia + Revisado',
        price: 'R$ 42.900',
        badge: 'DOC OK',
        link: INSTAGRAM_CONFIG.baseUrl
      },
      {
        id: 6,
        image: './Imagens/Honda.webp',
        caption: 'Honda Civic 2021 — Novo + Garantia de Fábrica',
        price: 'R$ 89.900',
        badge: 'GARANTIA',
        link: INSTAGRAM_CONFIG.baseUrl
      }
    ];
  }

  async init() {
    try {
      log('Inicializando módulo Instagram...');
      
      this.grid = getElement(SELECTORS.instagramGrid);
      
      if (!this.grid) {
        log('Grid do Instagram não encontrado');
        return;
      }

      await this.loadPosts();
      
      this.isInitialized = true;
      log('Instagram inicializado com sucesso');
      
    } catch (error) {
      console.error('Erro ao inicializar Instagram:', error);
    }
  }

  async loadPosts() {
    try {
      log('Carregando posts do Instagram...');
      
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
            <img src="${post.image}" alt="${post.caption}" loading="lazy" onerror="this.src='./Imagens/logo.webp'; this.onerror=null;">
            <div class="instagram__overlay">
              <div class="car__info">
                <div class="car__price">${post.price}</div>
                <a href="https://wa.me/5527997356397?text=Interesse%20no%20${post.caption.split(' —')[0]}" target="_blank" rel="noopener" class="car__whatsapp">
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
    }
  }

  destroy() {
    this.isInitialized = false;
    log('Módulo Instagram destruído');
  }
}

// Export singleton instance
export default new InstagramManager();
