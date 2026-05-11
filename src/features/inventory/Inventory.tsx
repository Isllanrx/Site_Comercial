import React, { useEffect, useState } from 'react';
import { InstagramMirror } from './InstagramMirror';
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

  if (loading) return (
    <div className="py-20 text-center flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-500 font-medium">Sincronizando Showroom...</p>
    </div>
  );

  return (
    <section id="inventory" className="py-12 md:py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-0 md:px-6">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Showroom <span className="text-gold-gradient">Digital</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore nosso estoque atualizado em tempo real através do nosso feed oficial. 
            Transparência e qualidade em cada post.
          </p>
        </div>
        
        {/* Literal Instagram Mirror */}
        <InstagramMirror vehicles={vehicles} />
        
      </div>
    </section>
  );
};
