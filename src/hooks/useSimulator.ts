import { useState, useEffect } from 'react';
import { DataService } from '../services/data.service';
import { BankConfigs } from '../services/types';

interface SimulatorData {
  vehicleValue: number;
  downPayment: number;
  term: number;
  vehicleType: 'car' | 'motorcycle';
  year: number;
  income: number;
  system: 'price' | 'sac';
  creditScore: 'excellent' | 'good' | 'regular' | 'basic';
}

export const useSimulator = () => {
  const [bankConfigs, setBankConfigs] = useState<BankConfigs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataService.getBankConfigs().then(configs => {
      setBankConfigs(configs);
      setLoading(false);
    });
  }, []);

  const calculate = (data: SimulatorData) => {
    if (!bankConfigs) return [];

    const financedAmount = data.vehicleValue - data.downPayment;
    const currentYear = new Date().getFullYear();
    const age = currentYear - data.year;
    
    const results = Object.keys(bankConfigs).map(key => {
      const bank = bankConfigs[key];
      const maxAge = data.vehicleType === 'car' ? 20 : 10;
      
      if (age > maxAge) return null;

      const baseRate = (data.vehicleType === 'motorcycle' ? bank.motorcycleRates[data.creditScore] : bank.carRates[data.creditScore]) / 100;
      const insuranceRate = data.vehicleType === 'motorcycle' ? bank.motorcycleInsurance : bank.carInsurance;
      const totalMonthlyRate = baseRate + bank.iof + insuranceRate + (bank.riskSpread[data.creditScore] / 100);
      
      let monthlyPayment: number;
      if (data.system === 'sac') {
        const amortization = financedAmount / data.term;
        monthlyPayment = amortization + (financedAmount * totalMonthlyRate); // First installment
      } else {
        monthlyPayment = financedAmount * (totalMonthlyRate * Math.pow(1 + totalMonthlyRate, data.term)) / (Math.pow(1 + totalMonthlyRate, data.term) - 1);
      }

      return {
        bank: bank.name,
        monthlyPayment,
        totalCost: (monthlyPayment * data.term) + bank.fixedFees[data.creditScore] + bank.registrationFee,
        rate: totalMonthlyRate * 100
      };
    }).filter(Boolean);

    return results;
  };

  return { calculate, loading };
};
