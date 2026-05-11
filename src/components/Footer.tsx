import React from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, ChevronUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-secondary text-primary pt-24 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        {/* Brand */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <img src="/assets/img/logo.webp" alt="Logo" className="w-12 h-12 rounded-full border-2 border-accent" />
            <span className="font-bold text-2xl tracking-tighter">PAULO <span className="text-accent">VEÍCULOS</span></span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Há mais de uma década realizando sonhos e entregando qualidade sobre rodas em Vila Velha. 
            Sua confiança é o nosso maior patrimônio.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/pauloveiculos027/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-secondary transition-all">
              <Instagram size={20} />
            </a>
            <a href="https://wa.me/5527997356397" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-secondary transition-all">
              <MessageCircle size={20} />
            </a>
            <a href="mailto:contato@pauloveiculos.com.br" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-secondary transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-accent">Navegação</h4>
          <ul className="space-y-4 text-gray-400">
            {['Home', 'Estoque', 'Simulador', 'Depoimentos', 'Sobre Nós'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-accent">Contato</h4>
          <ul className="space-y-6 text-gray-400">
            <li className="flex gap-4">
              <MapPin className="text-accent shrink-0" size={24} />
              <span>R. Jucati - Alvorada, Vila Velha - ES, 29117-390</span>
            </li>
            <li className="flex gap-4">
              <Phone className="text-accent shrink-0" size={24} />
              <span>(27) 99735-6397</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-accent">Novidades</h4>
          <p className="text-sm text-gray-400 mb-6">Receba ofertas exclusivas e novos carros no seu e-mail.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-accent transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-accent text-secondary px-4 rounded-lg font-bold hover:bg-white transition-colors">
              OK
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-sm text-gray-500">© 2024 Paulo Veículos. Todos os direitos reservados.</p>
        <button 
          onClick={scrollToTop}
          className="bg-white/5 p-4 rounded-full hover:bg-accent hover:text-secondary transition-all group"
        >
          <ChevronUp className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
