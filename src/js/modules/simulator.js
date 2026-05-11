// ===== SIMULATOR MODULE =====
import { log } from '../utils/helpers.js';

class SimulatorManager {
  constructor() {
    this.bankConfigs = null;
    this.form = null;
    this.isInitialized = false;
  }

  async init() {
    try {
      log('Iniciando modulo de simulador...');
      this.form = document.getElementById('financing-form');
      if (!this.form) return;

      await this.loadConfigs();
      this.setupEventListeners();
      this.updateCurrentYear();
      
      this.isInitialized = true;
      log('Modulo de simulador inicializado');
    } catch (error) {
      console.error('Erro ao inicializar simulador:', error);
    }
  }

  async loadConfigs() {
    try {
      const response = await fetch('/src/data/bank-configs.json');
      this.bankConfigs = await response.json();
      log('Configurações dos bancos carregadas');
    } catch (error) {
      console.error('Erro ao carregar configurações dos bancos:', error);
    }
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.calculateFinancing();
    });

    // Auto-formatting and limiting
    const yearInput = document.getElementById('vehicle-year');
    if (yearInput) {
      yearInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
      });
    }

    ['vehicle-value', 'down-payment', 'monthly-income'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('blur', (e) => this.formatCurrencyInput(e.target));
        element.addEventListener('input', (e) => {
          element.classList.remove('error');
          const errorElement = document.getElementById(id + '-error');
          if (errorElement) errorElement.style.display = 'none';
        });
      }
    });

    // Help tooltips
    document.querySelectorAll('.help-btn').forEach(btn => {
        btn.addEventListener('click', (e) => this.showHelp(e));
    });
  }

  updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const errorElement = document.getElementById('vehicle-year-error');
    if (errorElement) {
      errorElement.textContent = `Ano deve ter 4 dígitos e estar entre 1900 e ${currentYear}`;
    }
  }

  formatCurrencyInput(element) {
    try {
      const value = this.parseNumericInput(element.value);
      if (value) {
        element.value = value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
      }
    } catch (error) {
      // Keep as is
    }
  }

  parseNumericInput(value) {
    if (!value || value.trim() === '') throw new Error('Campo obrigatório');
    let cleanValue = value.trim().replace(/[^\d,.-]/g, '');
    if (cleanValue.includes(',') && cleanValue.includes('.')) {
      cleanValue = cleanValue.replace(/\./g, '').replace(',', '.');
    } else if (cleanValue.includes(',')) {
      cleanValue = cleanValue.replace(',', '.');
    }
    const numericValue = parseFloat(cleanValue);
    if (isNaN(numericValue) || numericValue <= 0) throw new Error('Valor inválido');
    return numericValue;
  }

  validateField(fieldId, value) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    try {
      let validatedValue;
      if (fieldId === 'vehicle-value') {
        validatedValue = this.parseNumericInput(value);
        if (validatedValue < 5000) throw new Error('Valor mínimo: R$ 5.000,00');
        if (validatedValue > 1000000) throw new Error('Valor máximo: R$ 1.000.000,00');
      } else if (fieldId === 'vehicle-year') {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || value.length !== 4 || year < 1900 || year > currentYear) {
          throw new Error(`Ano inválido (1900-${currentYear})`);
        }
        validatedValue = { year, age: currentYear - year };
      } else if (fieldId === 'financing-term') {
        validatedValue = parseInt(value);
        if (isNaN(validatedValue) || validatedValue < 12 || validatedValue > 84) throw new Error('Prazo entre 12 e 84 meses');
      } else if (fieldId === 'monthly-income') {
        validatedValue = this.parseNumericInput(value);
        if (validatedValue < 1000) throw new Error('Renda mínima: R$ 1.000,00');
      } else if (fieldId === 'down-payment') {
        validatedValue = this.parseNumericInput(value);
        const vValue = this.parseNumericInput(document.getElementById('vehicle-value').value);
        if (validatedValue < vValue * 0.1) throw new Error('Entrada mínima de 10%');
      } else {
        validatedValue = value;
        if (!value) throw new Error('Campo obrigatório');
      }

      field.classList.remove('error');
      if (errorElement) errorElement.style.display = 'none';
      return validatedValue;
    } catch (error) {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
      }
      return null;
    }
  }

  showNotification(type, title, message, duration = 5000) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    const icons = { error: 'fas fa-exclamation-triangle', success: 'fas fa-check-circle' };
    
    notification.innerHTML = `
        <div class="notification__header">
            <div class="notification__title"><i class="${icons[type] || 'fas fa-info-circle'}"></i> ${title}</div>
            <button class="notification__close"><i class="fas fa-times"></i></button>
        </div>
        <div class="notification__message">${message}</div>
    `;
    
    document.body.appendChild(notification);
    notification.querySelector('.notification__close').onclick = () => notification.remove();
    setTimeout(() => notification.classList.add('show'), 10);
    if (duration > 0) setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, duration);
  }

  showHelp(event) {
    const button = event.currentTarget;
    const fieldId = button.getAttribute('data-field');
    const helpTexts = {
        'vehicle-value': 'Valor total do veículo que você deseja financiar.',
        'down-payment': 'Valor de entrada. Mínimo 10% do valor do veículo.',
        'financing-term': 'Prazo em meses para pagar o financiamento.',
        'vehicle-type': 'Tipo do veículo: Carro ou Moto.',
        'vehicle-year': 'Ano de fabricação do veículo.',
        'monthly-income': 'Sua renda mensal bruta.',
        'credit-score': 'Seu perfil de crédito baseado no Serasa/SPC.'
    };

    const existing = document.querySelector('.help__tooltip');
    if (existing) existing.remove();

    const tooltip = document.createElement('div');
    tooltip.className = 'help__tooltip';
    tooltip.textContent = helpTexts[fieldId] || 'Informação não disponível';
    
    const fieldGroup = button.closest('.form__group');
    fieldGroup.appendChild(tooltip);
    
    const buttonRect = button.getBoundingClientRect();
    const groupRect = fieldGroup.getBoundingClientRect();
    
    tooltip.style.left = (buttonRect.left - groupRect.left + buttonRect.width / 2) + 'px';
    tooltip.style.top = (buttonRect.bottom - groupRect.top + 5) + 'px';
    
    setTimeout(() => tooltip.classList.add('show'), 10);
    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => tooltip.remove(), 300);
    }, 4000);
  }

  calculateFinancing() {
    const data = {
      vehicleValue: this.validateField('vehicle-value', document.getElementById('vehicle-value').value),
      downPayment: this.validateField('down-payment', document.getElementById('down-payment').value),
      term: parseInt(document.getElementById('financing-term').value),
      vehicleType: document.getElementById('vehicle-type').value,
      yearData: this.validateField('vehicle-year', document.getElementById('vehicle-year').value),
      income: this.validateField('monthly-income', document.getElementById('monthly-income').value),
      system: document.getElementById('amortization-system').value,
      creditScore: document.getElementById('credit-score').value
    };

    if (Object.values(data).some(v => v === null || v === undefined)) {
      this.showNotification('error', 'Erro', 'Preencha todos os campos corretamente');
      return;
    }

    const financedAmount = data.vehicleValue - data.downPayment;
    const results = [];
    
    Object.keys(this.bankConfigs).forEach(key => {
      const bank = this.bankConfigs[key];
      const maxAge = data.vehicleType === 'car' ? 20 : 10;
      if (data.yearData.age > maxAge) return;

      const baseRate = (data.vehicleType === 'motorcycle' ? bank.motorcycleRates[data.creditScore] : bank.carRates[data.creditScore]) / 100;
      const insuranceRate = data.vehicleType === 'motorcycle' ? bank.motorcycleInsurance : bank.carInsurance;
      const totalMonthlyRate = baseRate + bank.iof + insuranceRate + (bank.riskSpread[data.creditScore] / 100);
      
      let monthlyPayment;
      if (data.system === 'sac') {
        const amortization = financedAmount / data.term;
        monthlyPayment = amortization + (financedAmount * totalMonthlyRate); // First installment
      } else {
        monthlyPayment = financedAmount * (totalMonthlyRate * Math.pow(1 + totalMonthlyRate, data.term)) / (Math.pow(1 + totalMonthlyRate, data.term) - 1);
      }

      results.push({
        bank: bank.name,
        monthlyPayment,
        totalInterest: (monthlyPayment * data.term) - financedAmount,
        totalCost: (monthlyPayment * data.term) + bank.fixedFees[data.creditScore] + bank.registrationFee,
        rate: totalMonthlyRate * 100
      });
    });

    this.displayResults(results);
    this.showNotification('success', 'Sucesso', 'Simulação concluída');
  }

  displayResults(results) {
    const container = document.getElementById('bank-results');
    container.innerHTML = '<div class="bank__results-grid"></div>';
    const grid = container.querySelector('.bank__results-grid');

    results.forEach(res => {
      const card = document.createElement('div');
      card.className = 'bank__result';
      card.innerHTML = `
        <div class="bank__content">
            <div class="bank__header">
                <div class="bank__name">${res.bank}</div>
                <div class="bank__rate">${res.rate.toFixed(2)}% a.m.</div>
            </div>
            <div class="bank__metrics">
                <div class="metric__item">
                    <div class="metric__label">Parcela</div>
                    <div class="metric__value">R$ ${res.monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
                <div class="metric__item">
                    <div class="metric__label">Custo Total</div>
                    <div class="metric__value">R$ ${res.totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>
            </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
}

export default new SimulatorManager();
