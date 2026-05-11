import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './features/hero/Hero';
import { Inventory } from './features/inventory/Inventory';
import { Simulator } from './features/simulator/Simulator';
import { Testimonials } from './features/testimonials/Testimonials';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-primary selection:bg-accent selection:text-secondary">
      <Navbar />
      <main>
        <Hero />
        <Inventory />
        <Simulator />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
