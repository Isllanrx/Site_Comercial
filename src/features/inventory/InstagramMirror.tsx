import React from 'react';
import { motion } from 'framer-motion';
import { 
  Grid3X3, 
  Play, 
  UserSquare2, 
  Heart, 
  MessageCircle, 
  CheckCircle2, 
  ChevronDown,
  Settings,
  PlusSquare,
  Menu
} from 'lucide-react';
import { Vehicle } from '../../services/types';

interface InstagramMirrorProps {
  vehicles: Vehicle[];
}

export const InstagramMirror: React.FC<InstagramMirrorProps> = ({ vehicles }) => {
  return (
    <div className="max-w-[935px] mx-auto bg-white min-h-screen">
      {/* Mobile Header Mock */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-20">
        <Settings size={24} />
        <div className="flex items-center gap-1 font-bold">
          pauloveiculos027 <ChevronDown size={16} />
        </div>
        <PlusSquare size={24} />
      </div>

      {/* Profile Header */}
      <header className="px-4 py-8 md:py-12 md:flex md:gap-24 border-b border-gray-100 md:border-none">
        {/* Avatar */}
        <div className="flex justify-center md:block mb-8 md:mb-0">
          <div className="w-20 h-20 md:w-40 md:h-40 p-1 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]">
            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
              <img src="/assets/img/logo.webp" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <h1 className="text-xl font-light text-secondary flex items-center gap-2">
              pauloveiculos027
              <CheckCircle2 size={18} className="fill-blue-500 text-white" />
            </h1>
            <div className="flex gap-2">
              <button className="bg-[#efefef] hover:bg-[#dbdbdb] text-secondary font-bold py-1.5 px-4 rounded-lg text-sm transition-colors">
                Seguir
              </button>
              <button className="bg-[#efefef] hover:bg-[#dbdbdb] text-secondary font-bold py-1.5 px-4 rounded-lg text-sm transition-colors">
                Mensagem
              </button>
            </div>
          </div>

          <div className="hidden md:flex gap-10">
            <div><span className="font-bold">{vehicles.length}</span> publicações</div>
            <div><span className="font-bold">12.5k</span> seguidores</div>
            <div><span className="font-bold">850</span> seguindo</div>
          </div>

          <div className="space-y-1">
            <h2 className="font-bold text-sm">Paulo Veículos | Seminovos Premium</h2>
            <p className="text-sm whitespace-pre-line leading-snug">
              🚗 Compra • Venda • Troca • Financia{"\n"}
              🏆 12 Anos de Tradição em Vila Velha - ES{"\n"}
              ✅ Procedência e Qualidade Garantida{"\n"}
              👇 Simule agora no link abaixo!{"\n"}
              <a href="#" className="text-[#00376b] font-bold">paulo-veiculos.vercel.app</a>
            </p>
          </div>
        </div>
      </header>

      {/* Mobile Stats Mock */}
      <div className="md:hidden flex justify-around py-3 border-b border-gray-200 text-center text-sm">
        <div className="flex flex-col">
          <span className="font-bold">{vehicles.length}</span>
          <span className="text-gray-500">publicações</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">12.5k</span>
          <span className="text-gray-500">seguidores</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">850</span>
          <span className="text-gray-500">seguindo</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-t md:border-gray-200">
        <div className="flex gap-16">
          <button className="flex items-center gap-2 h-14 border-t border-secondary -mt-[1px] uppercase tracking-widest text-xs font-bold">
            <Grid3X3 size={14} /> Publicações
          </button>
          <button className="flex items-center gap-2 h-14 text-gray-400 uppercase tracking-widest text-xs font-bold">
            <Play size={14} /> Reels
          </button>
          <button className="flex items-center gap-2 h-14 text-gray-400 uppercase tracking-widest text-xs font-bold">
            <UserSquare2 size={14} /> Marcados
          </button>
        </div>
      </div>

      {/* Feed Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-3 gap-1 md:gap-7 pb-12"
      >
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="relative group aspect-square bg-gray-100 overflow-hidden cursor-pointer">
            <img 
              src={vehicle.image} 
              alt={vehicle.caption}
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />
            
            {/* Media Icon Mock */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3 text-white">
              {vehicle.id % 2 === 0 ? <Play size={18} fill="currentColor" /> : <PlusSquare size={18} />}
            </div>

            {/* Hover Stats Mirror */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white gap-8 font-bold">
              <div className="flex items-center gap-2">
                <Heart fill="white" size={20} /> {Math.floor(Math.random() * 200) + 50}
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle fill="white" size={20} /> {Math.floor(Math.random() * 20) + 5}
              </div>
            </div>

            <a 
              href={vehicle.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label="Ver no Instagram"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
