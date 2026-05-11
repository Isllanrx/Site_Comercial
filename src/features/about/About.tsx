import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, ThumbsUp } from 'lucide-react';

export const About = () => {
  const stats = [
    { icon: <ShieldCheck className="text-accent" />, title: 'Segurança', desc: 'Garantia de procedência em 100% do estoque.' },
    { icon: <Award className="text-accent" />, title: 'Qualidade', desc: 'Veículos rigorosamente revisados e periciados.' },
    { icon: <ThumbsUp className="text-accent" />, title: 'Confiança', desc: '12 anos realizando o sonho de nossos clientes.' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-secondary">
              Excelência e Tradição no <br />
              <span className="text-gold-gradient">Mercado Automotivo</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A Paulo Veículos nasceu em Vila Velha com a missão de transformar a compra de seminovos em uma experiência premium. 
              Com mais de uma década de história, nos tornamos referência em qualidade e transparência.
            </p>
            <div className="grid gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-surface border border-gray-50">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">{stat.title}</h4>
                    <p className="text-sm text-gray-500">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img 
              src="/assets/img/1.webp" 
              alt="Nossa Loja" 
              className="w-full h-full object-cover min-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-12">
              <p className="text-white text-xl font-medium">
                "Nosso compromisso é com a sua satisfação e segurança em cada quilômetro."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
