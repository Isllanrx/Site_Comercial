import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ChevronRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface skew-x-12 translate-x-24 hidden lg:block" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
            12 Anos de Tradição
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold text-secondary leading-tight mb-6">
            Sua jornada <br />
            <span className="text-gold-gradient">Premium</span> começa aqui.
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
            Descubra a melhor seleção de seminovos em Vila Velha. 
            Qualidade rigorosa, transparência total e as melhores taxas de financiamento do mercado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#inventory"
              className="bg-secondary text-primary px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-secondary transition-all shadow-xl group"
            >
              Ver Estoque
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#simulator"
              className="bg-surface text-secondary px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
            >
              <Calculator size={20} />
              Simular Financiamento
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-secondary">+500</p>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Carros Vendidos</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-3xl font-bold text-secondary">4.9/5</p>
              <p className="text-sm text-gray-500 uppercase tracking-wide">Avaliação Google</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-20" />
          <img 
            src="/assets/img/carros-esportivos-cor-e-unidade.webp" 
            alt="Carros Premium" 
            className="relative w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};
