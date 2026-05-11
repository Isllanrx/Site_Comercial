// ===== SERVICE WORKER REGISTRATION =====
import { log } from './helpers.js';

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => log('SW registrado:', reg.scope))
        .catch(err => console.error('SW falhou:', err));
    });
  }
};
