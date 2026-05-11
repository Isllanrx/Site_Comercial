import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, CheckCircle2 } from 'lucide-react';
import { useSimulator } from '../../hooks/useSimulator';

export const Simulator = () => {
  const { calculate, loading } = useSimulator();
  const [results, setResults] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    vehicleValue: 50000,
    downPayment: 10000,
    term: 48,
    vehicleType: 'car' as const,
    year: 2020,
    income: 5000,
    system: 'price' as const,
    creditScore: 'good' as const
  });

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculate(formData);
    setResults(res);
  };

  return (
    <section id="simulator" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4 text-gold-gradient">Simulador Inteligente</h2>
            <p className="text-gray-600 text-lg">Compare as melhores taxas do mercado em tempo real.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <form onSubmit={handleSimulate} className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">
                    Valor do Veículo (R$)
                  </label>
                  <input 
                    type="number"
                    value={formData.vehicleValue}
                    onChange={e => setFormData({...formData, vehicleValue: Number(e.target.value)})}
                    className="w-full bg-surface border-0 rounded-2xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">
                    Entrada (R$)
                  </label>
                  <input 
                    type="number"
                    value={formData.downPayment}
                    onChange={e => setFormData({...formData, downPayment: Number(e.target.value)})}
                    className="w-full bg-surface border-0 rounded-2xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Prazo</label>
                    <select 
                      value={formData.term}
                      onChange={e => setFormData({...formData, term: Number(e.target.value)})}
                      className="w-full bg-surface border-0 rounded-2xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                    >
                      {[12, 24, 36, 48, 60].map(v => <option key={v} value={v}>{v}x</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Tipo</label>
                    <select 
                      value={formData.vehicleType}
                      onChange={e => setFormData({...formData, vehicleType: e.target.value as any})}
                      className="w-full bg-surface border-0 rounded-2xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                    >
                      <option value="car">Carro</option>
                      <option value="motorcycle">Moto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Ano</label>
                  <input 
                    type="number"
                    value={formData.year}
                    onChange={e => setFormData({...formData, year: Number(e.target.value)})}
                    className="w-full bg-surface border-0 rounded-2xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Perfil de Crédito</label>
                  <select 
                    value={formData.creditScore}
                    onChange={e => setFormData({...formData, creditScore: e.target.value as any})}
                    className="w-full bg-surface border-0 rounded-2xl p-4 text-secondary focus:ring-2 focus:ring-accent outline-none font-medium transition-all"
                  >
                    <option value="excellent">Excelente (800+)</option>
                    <option value="good">Bom (600-800)</option>
                    <option value="regular">Regular (400-600)</option>
                    <option value="basic">Básico (&lt;400)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-secondary text-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-secondary transition-all shadow-xl"
              >
                <Calculator />
                Simular Agora
              </button>
            </form>

            {/* Results */}
            <div className="lg:col-span-3">
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((res, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={res.bank}
                      className="bg-surface rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center border border-gray-100 hover:border-accent transition-colors group"
                    >
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                          <CheckCircle2 />
                        </div>
                        <div>
                          <h4 className="font-bold text-secondary text-lg">{res.bank}</h4>
                          <span className="text-accent font-bold">{res.rate.toFixed(2)}% a.m.</span>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-8">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold mb-1">Parcela</p>
                          <p className="text-2xl font-bold text-secondary">
                            R$ {res.monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <a 
                          href="https://wa.me/5527997356397"
                          target="_blank"
                          className="bg-white text-secondary px-6 py-3 rounded-xl font-bold hover:bg-secondary hover:text-white transition-all shadow-sm"
                        >
                          Detalhes
                        </a>
                      </div>
                    </motion.div>
                  ))}
                  <div className="p-6 bg-accent/5 rounded-3xl border border-accent/20 mt-8">
                    <div className="flex gap-3 text-accent mb-2 font-bold">
                      <Info size={20} />
                      Aviso Importante
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Os valores apresentados são simulações aproximadas. Taxas finais, CET e condições estão sujeitos a análise de crédito e políticas vigentes dos bancos parceiros.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-surface rounded-[40px] border-2 border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-300 mb-6 shadow-sm">
                    <Calculator size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Simulação Pendente</h3>
                  <p className="text-gray-400 max-w-xs">Preencha os dados ao lado e clique em simular para ver as melhores ofertas.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
