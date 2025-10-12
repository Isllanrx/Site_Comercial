// ===== HELPER FUNCTIONS =====

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if device supports touch
 * @returns {boolean} True if touch is supported
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get element safely with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null} Element or null if not found
 */
export const getElement = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Element not found: ${selector}`, error);
    return null;
  }
};

/**
 * Get multiple elements safely with error handling
 * @param {string} selector - CSS selector
 * @returns {NodeList} NodeList of elements
 */
export const getElements = (selector) => {
  try {
    return document.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Elements not found: ${selector}`, error);
    return [];
  }
};

/**
 * Add event listener with error handling
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 */
export const addEventListenerSafe = (element, event, handler, options = {}) => {
  if (!element) {
    console.warn('Cannot add event listener: element is null');
    return;
  }
  
  try {
    element.addEventListener(event, handler, options);
  } catch (error) {
    console.error('Error adding event listener:', error);
  }
};

/**
 * Remove CSS class from all elements in a collection
 * @param {NodeList} elements - Collection of elements
 * @param {string} className - Class name to remove
 */
export const removeClassFromAll = (elements, className) => {
  elements.forEach(element => {
    if (element && element.classList) {
      element.classList.remove(className);
    }
  });
};

/**
 * Add CSS class to element safely
 * @param {Element} element - Target element
 * @param {string} className - Class name to add
 */
export const addClassSafe = (element, className) => {
  if (element && element.classList) {
    element.classList.add(className);
  }
};

/**
 * Remove CSS class from element safely
 * @param {Element} element - Target element
 * @param {string} className - Class name to remove
 */
export const removeClassSafe = (element, className) => {
  if (element && element.classList) {
    element.classList.remove(className);
  }
};

/**
 * Toggle CSS class on element safely
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 */
export const toggleClassSafe = (element, className) => {
  if (element && element.classList) {
    element.classList.toggle(className);
  }
};

/**
 * Check if element has class
 * @param {Element} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} True if element has class
 */
export const hasClass = (element, className) => {
  return element && element.classList && element.classList.contains(className);
};

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector of target element
 */
export const smoothScrollTo = (selector) => {
  const element = getElement(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Format number with leading zeros
 * @param {number} num - Number to format
 * @param {number} digits - Number of digits
 * @returns {string} Formatted number
 */
export const padNumber = (num, digits = 2) => {
  return num.toString().padStart(digits, '0');
};

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is visible
 */
export const isInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after specified time
 */
export const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Log with timestamp
 * @param {string} message - Message to log
 * @param {any} data - Additional data to log
 */
export const log = (message, data = null) => {
  const timestamp = new Date().toLocaleTimeString();
  if (data) {
    console.log(`[${timestamp}] ${message}`, data);
  } else {
    console.log(`[${timestamp}] ${message}`);
  }
};
