// ===== POLYFILLS =====

export const initPolyfills = () => {
  // Polyfill para CSS Custom Properties
  if (!window.CSS || !window.CSS.supports || !window.CSS.supports('color', 'var(--fake-var)')) {
    document.documentElement.className += ' no-css-vars';
  }

  // Polyfill para Promise
  if (!window.Promise) {
    window.Promise = function(executor) {
      return new Promise(executor);
    };
  }

  // Polyfill para fetch (minimal)
  if (!window.fetch) {
    window.fetch = function(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve({ json: () => JSON.parse(xhr.responseText) });
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.open('GET', url);
        xhr.send();
      });
    };
  }
};
