import React from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'Sobre', href: '#about' },
    { name: 'Estoque', href: '#inventory' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Simulador', href: '#simulator' },
  ];

  return (
    <nav className="fixed w-full z-50 glass py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/assets/img/logo.webp" alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="font-bold text-xl tracking-tight text-secondary uppercase">
            Paulo <span className="text-accent">Veículos</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-secondary/80 hover:text-accent transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="https://wa.me/5527997356397"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-primary px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-accent hover:text-secondary transition-all shadow-md"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-primary border-t border-gray-100 flex flex-col p-6 gap-4 md:hidden shadow-xl animate-in slide-in-from-top duration-300">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-secondary"
            >
              {item.name}
            </a>
          ))}
          <button className="bg-accent text-secondary w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-2">
            <MessageCircle size={20} />
            Falar no WhatsApp
          </button>
        </div>
      )}
    </nav>
  );
};
