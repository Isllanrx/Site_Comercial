import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Heart, MessageSquare, Play } from 'lucide-react';
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  if (loading) return (
    <div className="py-20 text-center flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-500 font-medium">Sincronizando Showroom...</p>
    </div>
  );

  return (
    <section id="inventory" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-accent">
              <Instagram size={28} />
              <span className="font-bold uppercase tracking-[0.2em] text-sm">Live Showroom</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
              Acompanhe nosso <br className="hidden md:block" />
              <span className="text-gold-gradient">Estoque em Tempo Real</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Tudo o que chega na loja vai direto para o nosso feed. 
              Siga-nos para não perder as ofertas exclusivas e novos seminovos.
            </p>
          </div>
          
          <a 
            href="https://www.instagram.com/pauloveiculos027/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center group"
          >
            <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-xl">
              <Instagram size={32} />
            </div>
            <span className="font-bold text-secondary text-sm tracking-wide">@pauloveiculos027</span>
            <span className="text-xs text-gray-400">Siga no Instagram</span>
          </a>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          {vehicles.map((vehicle) => (
            <motion.div 
              key={vehicle.id}
              variants={item}
              className="relative group aspect-square overflow-hidden bg-surface cursor-pointer"
            >
              {/* Media */}
              <img 
                src={vehicle.image} 
                alt={vehicle.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-100 group-hover:brightness-50"
              />
              
              {/* Icon indicators (Mocking IG feel) */}
              <div className="absolute top-4 right-4 text-white z-10 drop-shadow-md">
                {vehicle.id % 2 === 0 ? <Play size={20} fill="currentColor" /> : <div className="w-5 h-5 border-2 border-white rounded-md flex items-center justify-center text-[10px] font-bold">1/4</div>}
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                  vehicle.badge === 'Vendido' ? 'bg-red-500 text-white' : 'bg-accent text-secondary'
                }`}>
                  {vehicle.badge}
                </span>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-8 text-center bg-black/40 backdrop-blur-[2px]">
                <div className="flex gap-6 text-white mb-6">
                  <div className="flex items-center gap-2 font-bold">
                    <Heart size={20} fill="white" /> {Math.floor(Math.random() * 50) + 20}
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <MessageSquare size={20} fill="white" /> {Math.floor(Math.random() * 10) + 2}
                  </div>
                </div>
                
                <p className="text-white text-sm font-medium line-clamp-3 mb-6 leading-relaxed">
                  {vehicle.caption}
                </p>

                <div className="flex gap-3 w-full max-w-[240px]">
                  <a 
                    href={vehicle.instagramUrl}
                    target="_blank"
                    className="flex-1 bg-white text-secondary py-3 rounded-lg text-xs font-bold hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Instagram size={14} /> Ver Post
                  </a>
                  <a 
                    href={`https://wa.me/5527997356397?text=Vi%20no%20Instagram%20o%20${encodeURIComponent(vehicle.caption)}`}
                    target="_blank"
                    className="w-12 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
           <a 
            href="https://www.instagram.com/pauloveiculos027/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-white px-10 py-4 rounded-2xl font-bold hover:bg-accent hover:text-secondary transition-all shadow-xl"
          >
            Explorar Feed Completo <Instagram size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};
