import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { DataService } from '../../services/data.service';
import { Testimonial } from '../../services/types';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    DataService.getTestimonials().then(setTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Experiências Reais</h2>
          <p className="text-gray-600">O que nossos clientes dizem sobre a Paulo Veículos.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="bg-white rounded-[40px] p-12 shadow-xl border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-8">
                <Quote size={40} fill="currentColor" />
              </div>
              
              <div className="flex gap-1 mb-6 text-accent">
                {Array(current.rating).fill(0).map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>

              <p className="text-2xl text-secondary font-medium leading-relaxed mb-10 italic">
                "{current.text}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={current.avatar} 
                  alt={current.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <div className="text-left">
                  <h4 className="font-bold text-secondary">{current.name}</h4>
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">{current.date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={() => setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-3 rounded-full bg-white border border-gray-200 text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentIndex(prev => (prev + 1) % testimonials.length)}
              className="p-3 rounded-full bg-white border border-gray-200 text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
