import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { DataService } from '../../services/data.service';
import { Vehicle } from '../../services/types';

export const Inventory = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataService.getInventory().then(data => {
      setVehicles(data);
      setLoading(false);
    });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return <div className="py-20 text-center">Carregando estoque...</div>;

  return (
    <section id="inventory" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-secondary mb-4">Nosso Estoque</h2>
            <p className="text-gray-600 max-w-md text-lg">
              Veículos selecionados com garantia de procedência e revisão completa.
            </p>
          </div>
          <a 
            href="https://www.instagram.com/pauloveiculos027/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent font-bold hover:underline"
          >
            Ver mais no Instagram <ExternalLink size={18} />
          </a>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {vehicles.map((vehicle) => (
            <motion.div 
              key={vehicle.id}
              variants={item}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {vehicle.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <a 
                    href={`https://wa.me/5527997356397?text=Olá, tenho interesse no ${encodeURIComponent(vehicle.caption)}`}
                    target="_blank"
                    className="bg-white text-secondary p-4 rounded-full hover:bg-accent hover:text-white transition-colors"
                   >
                     <MessageCircle size={24} />
                   </a>
                </div>
              </div>
              
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-accent transition-colors">
                  {vehicle.caption}
                </h3>
                <div className="w-12 h-1 bg-gray-100 mx-auto mb-6 group-hover:w-24 group-hover:bg-accent transition-all" />
                <button className="w-full py-3 rounded-xl border-2 border-secondary font-bold text-secondary hover:bg-secondary hover:text-white transition-all">
                  Ver Detalhes
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
