// ===== INSTAGRAM (INVENTORY) MODULE =====
import { SELECTORS } from '../utils/constants.js';
import { getElement, log } from '../utils/helpers.js';

class InstagramManager {
  constructor() {
    this.grid = null;
    this.posts = [];
    this.isInitialized = false;
  }

  async init() {
    try {
      log('Inicializando modulo de inventario...');
      this.grid = getElement(SELECTORS.instagramGrid) || document.querySelector('#instagram-grid');
      
      if (!this.grid) return;

      await this.fetchPosts();
      this.renderPosts();
      
      this.isInitialized = true;
      log('Inventario inicializado');
    } catch (error) {
      console.error('Erro ao inicializar inventario:', error);
      this.forceFallbackContent();
    }
  }

  async fetchPosts() {
    try {
      const response = await fetch('/src/data/inventory.json');
      this.posts = await response.json();
    } catch (error) {
      log('Falha ao buscar inventário, usando fallback');
      throw error;
    }
  }

  renderPosts() {
    if (!this.posts.length) return;
    
    this.grid.innerHTML = this.posts.map(post => `
      <div class="instagram__post" data-post-id="${post.id}">
        <div class="instagram__image">
          <div class="car__badge">${post.badge}</div>
          <img src="${post.image}" alt="${post.caption}" loading="lazy">
          <div class="instagram__overlay">
            <a href="https://wa.me/5527997356397?text=Interesse%20no%20${encodeURIComponent(post.caption)}" target="_blank" class="car__whatsapp">
              <i class="fab fa-whatsapp"></i> Tenho Interesse
            </a>
          </div>
        </div>
        <p class="instagram__caption">${post.caption}</p>
      </div>
    `).join('');
  }

  forceFallbackContent() {
    if (this.grid) {
      this.grid.innerHTML = '<p>Inventário temporariamente indisponível.</p>';
    }
  }
}

export default new InstagramManager();
