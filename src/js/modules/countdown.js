import { SELECTORS } from '../utils/constants.js';
import { 
  getElements, 
  padNumber,
  log
} from '../utils/helpers.js';

class CountdownManager {
  constructor() {
    this.countdowns = [];
    this.interval = null;
    this.isInitialized = false;
  }

  async init() {
    try {
      log('Iniciando modulo Countdown...');
      this.countdowns = getElements(SELECTORS.countdownElements);
      if (!this.countdowns.length) return;
      this.setEndTimes();
      this.startUpdating();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar countdown:', error);
    }
  }

  setEndTimes() {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 7);
    endTime.setHours(23, 59, 59, 999);
    this.countdowns.forEach(countdown => {
      countdown.setAttribute('data-end', endTime.toISOString());
    });
  }

  updateCountdowns() {
    this.countdowns.forEach((countdown) => {
      const endTimeStr = countdown.getAttribute('data-end');
      if (!endTimeStr) return;
      
      const endTime = new Date(endTimeStr).getTime();
      const now = new Date().getTime();
      const timeLeft = endTime - now;
      
      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        const daysEl = countdown.querySelector('.countdown__number');
        const hoursEl = countdown.querySelectorAll('.countdown__number')[1];
        const minutesEl = countdown.querySelectorAll('.countdown__number')[2];
        
        if (daysEl) daysEl.textContent = padNumber(days);
        if (hoursEl) hoursEl.textContent = padNumber(hours);
        if (minutesEl) minutesEl.textContent = padNumber(minutes);
      } else {
        countdown.innerHTML = '<div class="countdown__expired">Oferta Expirada</div>';
      }
    });
  }

  startUpdating() {
    this.stopUpdating();
    this.updateCountdowns();
    this.interval = setInterval(() => {
      this.updateCountdowns();
    }, 60000);
  }

  stopUpdating() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  destroy() {
    this.stopUpdating();
    this.isInitialized = false;
    log('Modulo Countdown destruido');
  }
}

export default new CountdownManager();
