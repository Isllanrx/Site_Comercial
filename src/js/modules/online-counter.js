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
      log('Inicializando contador online...');
      this.counter = getElement('.online-counter');
      if (!this.counter) {
        log('Contador online nao encontrado');
        return;
      }
      this.startCounter();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar contador online:', error);
    }
  }

  startCounter() {
    this.updateCount();
    setInterval(() => {
      this.updateCount();
    }, this.getRandomInterval());
  }

  updateCount() {
    const variation = Math.floor(Math.random() * this.maxVariation);
    const newCount = this.baseCount + variation;
    if (this.counter) {
      this.animateToCount(parseInt(this.counter.textContent) || 0, newCount);
    }
  }

  animateToCount(from, to) {
    const duration = 1000;
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
    return (10 + Math.random() * 20) * 1000;
  }

  destroy() {
    this.isInitialized = false;
    log('Contador online destruido');
  }
}

export default new OnlineCounterManager();
