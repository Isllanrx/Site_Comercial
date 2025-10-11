// ===== ONLINE COUNTER MODULE =====
import { getElement, log } from '../utils/helpers.js';

class OnlineCounterManager {
  constructor() {
    this.counter = null;
    this.baseCount = 15;
    this.maxVariation = 15;
    this.isInitialized = false;
  }

  async init() {
    try {
      log('Inicializando contador de visitantes online...');
      
      this.counter = getElement('.online-counter');
      if (!this.counter) {
        log('Contador online não encontrado');
        return;
      }

      this.startCounter();
      this.isInitialized = true;
      log('Contador de visitantes online inicializado');
      
    } catch (error) {
      console.error('Erro ao inicializar contador online:', error);
    }
  }

  startCounter() {
    // Set initial random count
    this.updateCount();
    
    // Update every 10-30 seconds with slight variations
    setInterval(() => {
      this.updateCount();
    }, this.getRandomInterval());
  }

  updateCount() {
    const variation = Math.floor(Math.random() * this.maxVariation);
    const newCount = this.baseCount + variation;
    
    if (this.counter) {
      // Animate to new count
      this.animateToCount(parseInt(this.counter.textContent) || 0, newCount);
    }
  }

  animateToCount(from, to) {
    const duration = 1000; // 1 second
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(from + (to - from) * progress);
      this.counter.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  getRandomInterval() {
    // Random interval between 10-30 seconds
    return (10 + Math.random() * 20) * 1000;
  }

  destroy() {
    this.isInitialized = false;
    log('Contador online destruído');
  }
}

// Export singleton instance
export default new OnlineCounterManager();
