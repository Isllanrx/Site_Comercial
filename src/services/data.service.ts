import { Vehicle, Testimonial, BankConfigs } from './types';

export const DataService = {
  async getInventory(): Promise<Vehicle[]> {
    const response = await fetch('/data/inventory.json');
    if (!response.ok) throw new Error('Falha ao carregar inventario');
    return response.json();
  },

  async getTestimonials(): Promise<Testimonial[]> {
    const response = await fetch('/data/testimonials.json');
    if (!response.ok) throw new Error('Falha ao carregar depoimentos');
    return response.json();
  },

  async getBankConfigs(): Promise<BankConfigs> {
    const response = await fetch('/data/bank-configs.json');
    if (!response.ok) throw new Error('Falha ao carregar configuracoes bancarias');
    return response.json();
  }
};
