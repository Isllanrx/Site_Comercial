import { Vehicle, Testimonial, BankConfigs } from './types';

export const DataService = {
  async getInventory(): Promise<Vehicle[]> {
    const response = await fetch('/src/data/inventory.json');
    return response.json();
  },

  async getTestimonials(): Promise<Testimonial[]> {
    const response = await fetch('/src/data/testimonials.json');
    return response.json();
  },

  async getBankConfigs(): Promise<BankConfigs> {
    const response = await fetch('/src/data/bank-configs.json');
    return response.json();
  }
};
