// ===== COUNTDOWN MODULE =====
import { SELECTORS, TIMING } from '../utils/constants.js';
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
      log('Inicializando módulo Countdown...');
      
      this.countdowns = getElements(SELECTORS.countdownElements);
      
      if (!this.countdowns.length) {
        log('Elementos de countdown não encontrados');
        return;
      }

      this.setEndTimes();
      this.startUpdating();
      
      this.isInitialized = true;
      log(`${this.countdowns.length} countdowns inicializados`);
      
    } catch (error) {
      console.error('Erro ao inicializar countdown:', error);
    }
  }

  setEndTimes() {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 7); // 7 days from now
    endTime.setHours(23, 59, 59, 999); // End of day
    
    log('Data final do countdown:', endTime.toISOString());
    
    this.countdowns.forEach((countdown, index) => {
      countdown.setAttribute('data-end', endTime.toISOString());
      log(`Countdown ${index} configurado para:`, endTime.toISOString());
    });
  }

  updateCountdowns() {
    this.countdowns.forEach((countdown, index) => {
      const endTimeStr = countdown.getAttribute('data-end');
      
      if (!endTimeStr) {
        log(`Countdown ${index} não tem data-end, configurando agora`);
        this.setEndTimes();
        return;
      }
      
      const endTime = new Date(endTimeStr).getTime();
      const now = new Date().getTime();
      const timeLeft = endTime - now;
      
      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // Find elements by class - more robust approach
        const countdownItems = countdown.querySelectorAll('.countdown__item');
        
        if (countdownItems.length >= 3) {
          const daysEl = countdownItems[0].querySelector('.countdown__number');
          const hoursEl = countdownItems[1].querySelector('.countdown__number');
          const minutesEl = countdownItems[2].querySelector('.countdown__number');
          
          if (daysEl) {
            daysEl.textContent = padNumber(days);
          }
          if (hoursEl) {
            hoursEl.textContent = padNumber(hours);
          }
          if (minutesEl) {
            minutesEl.textContent = padNumber(minutes);
          }
        } else {
          // Fallback: try direct selectors
          const daysEl = countdown.querySelector('.countdown__number');
          const hoursEl = countdown.querySelectorAll('.countdown__number')[1];
          const minutesEl = countdown.querySelectorAll('.countdown__number')[2];
          
          if (daysEl) {
            daysEl.textContent = padNumber(days);
          }
          if (hoursEl) {
            hoursEl.textContent = padNumber(hours);
          }
          if (minutesEl) {
            minutesEl.textContent = padNumber(minutes);
          }
        }
        
        log(`Countdown ${index} atualizado: ${days}d ${hours}h ${minutes}m`);
      } else {
        countdown.innerHTML = '<div class="countdown__expired">Oferta Expirada</div>';
      }
    });
  }

  startUpdating() {
    this.stopUpdating();
    
    // Update immediately
    this.updateCountdowns();
    
    // Update every minute
    this.interval = setInterval(() => {
      this.updateCountdowns();
    }, 60000);
    
    log('Atualização de countdown iniciada');
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
    log('Módulo Countdown destruído');
  }
}

// Export singleton instance
export default new CountdownManager();
