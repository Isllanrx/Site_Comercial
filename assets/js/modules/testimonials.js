// ===== TESTIMONIALS MODULE =====
import { SELECTORS, CLASSES, TIMING } from '../utils/constants.js';
import { 
  getElement, 
  getElements, 
  addEventListenerSafe, 
  removeClassFromAll, 
  addClassSafe,
  log,
  wait
} from '../utils/helpers.js';

class TestimonialsManager {
  constructor() {
    this.carousel = null;
    this.cards = [];
    this.currentIndex = 0;
    this.interval = null;
    this.isInitialized = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    // Função para gerar datas aleatórias entre 2015 e 2025
    this.generateRandomDate = () => {
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const year = Math.floor(Math.random() * 11) + 2015; // 2015 a 2025
      const month = months[Math.floor(Math.random() * 12)];
      const day = Math.floor(Math.random() * 28) + 1; // 1 a 28 para evitar problemas com fevereiro
      return `${day} de ${month}, ${year}`;
    };
    
    this.reviews = [
      {
        name: "Maria Silva",
        rating: 5,
        text: "Comprei meu Honda City 2020 aqui e foi uma experiência fantástica! O Paulo é muito atencioso, explicou todos os detalhes do financiamento e o carro estava impecável. Já indiquei para várias amigas!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/maria_fernandes_lima.jpg"
      },
      {
        name: "João Santos",
        rating: 5,
        text: "Financiamento aprovado em 2 dias! Condições muito melhores que outras concessionárias. O carro passou por uma revisão completa e veio com garantia. Paulo Veículos é sinônimo de confiança!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/joao_alves_rocha.jpg"
      },
      {
        name: "Ana Costa",
        rating: 5,
        text: "Procurei por meses um carro seminovo confiável e encontrei aqui! Documentação toda em dia, carro revisado e preço justo. O atendimento foi excepcional desde o primeiro contato.",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/ana_souza_lima.jpg"
      },
      {
        name: "Carlos Oliveira",
        rating: 5,
        text: "Melhor concessionária de Vila Velha! Comprei meu Fox 2019 e estou muito satisfeito. Equipe profissional, carros de qualidade e preços honestos. Voltarei quando precisar trocar!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/carlos_oliveira_santos.jpg"
      },
      {
        name: "Fernanda Lima",
        rating: 5,
        text: "Processo de compra super transparente! Paulo explicou cada etapa do financiamento, mostrou todos os documentos e o carro estava exatamente como prometido. Recomendo de olhos fechados!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/fernanda_duarte_freitas.jpg"
      },
      {
        name: "Roberto Alves",
        rating: 5,
        text: "Atendimento personalizado e carros em perfeito estado! Comprei meu Voyage 2018 e estou muito feliz. Preços justos, financiamento facilitado e equipe muito prestativa. Nota 10!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/ricardo_borges_alves.jpg"
      },
      {
        name: "Patricia Mendes",
        rating: 5,
        text: "Excelente experiência! Comprei meu Clio 2020 e o Paulo foi muito paciente com todas as minhas dúvidas. Carro revisado, documentação em dia e preço justo. Super recomendo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/patricia_campos_nunes.png"
      },
      {
        name: "Marcos Ferreira",
        rating: 5,
        text: "Melhor lugar para comprar carro em Vila Velha! Atendimento diferenciado, carros de qualidade e preços honestos. Já trouxe 3 amigos aqui e todos ficaram satisfeitos!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/marcos_silva_santos.png"
      },
      {
        name: "Luciana Rocha",
        rating: 5,
        text: "Comprei meu Siena 2019 e foi a melhor decisão! Carro impecável, documentação em dia e financiamento aprovado rapidinho. Paulo é muito profissional e honesto!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/luana_rocha_ferreira.jpg"
      },
      {
        name: "Diego Martins",
        rating: 5,
        text: "Excelente atendimento! Comprei meu Honda Civic 2021 e superou todas as expectativas. Carro zero defeito, garantia e preço justo. Recomendo para todos!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/diego_costa_nunes.png"
      },
      {
        name: "Camila Santos",
        rating: 5,
        text: "Processo de compra muito tranquilo! Paulo explicou tudo detalhadamente, mostrou todos os documentos e o carro estava perfeito. Voltarei quando precisar!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/camila_ferreira_lopes.jpg"
      },
      {
        name: "Rafael Silva",
        rating: 5,
        text: "Melhor experiência de compra de carro que já tive! Atendimento personalizado, carro revisado e preço honesto. Paulo Veículos é referência em qualidade!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/rafael_lima_fonseca.jpg"
      },
      {
        name: "Juliana Costa",
        rating: 5,
        text: "Comprei meu primeiro carro aqui e foi perfeito! Paulo me ajudou com todo o processo, explicou o financiamento e o carro estava impecável. Super indico!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/juliana_correia_silva.jpg"
      },
      {
        name: "André Oliveira",
        rating: 5,
        text: "Atendimento excepcional! Comprei meu Fox 2019 e estou muito satisfeito. Carro revisado, documentação ok e preço justo. Paulo é muito confiável!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/andre_santos_silva.jpg"
      },
      {
        name: "Bruna Lima",
        rating: 5,
        text: "Experiência incrível! Paulo foi muito atencioso, mostrou várias opções e me ajudou a escolher o carro ideal. Financiamento aprovado em 1 dia!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/bruna_cardoso_alves.png"
      },
      {
        name: "Thiago Alves",
        rating: 5,
        text: "Melhor concessionária da região! Comprei meu Voyage 2018 e foi tudo perfeito. Carro em ótimo estado, preço justo e atendimento nota 10!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/thiago_oliveira_dias.jpg"
      },
      {
        name: "Vanessa Mendes",
        rating: 5,
        text: "Recomendo demais! Paulo é muito profissional, explicou todos os detalhes e o carro estava exatamente como prometido. Voltarei com certeza!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/vanessa_almeida_cardoso.jpg"
      },
      {
        name: "Gustavo Ferreira",
        rating: 5,
        text: "Compra tranquila e segura! Carro revisado, documentação em dia e preço honesto. Paulo é muito transparente em todo o processo. Recomendo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/gustavo_araujo_mendes.jpg"
      },
      {
        name: "Larissa Santos",
        rating: 5,
        text: "Atendimento diferenciado! Comprei meu Clio 2020 e foi uma experiência maravilhosa. Paulo é muito atencioso e os carros são de excelente qualidade!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/larissa_castro_vieira.jpg"
      },
      {
        name: "Felipe Costa",
        rating: 5,
        text: "Melhor lugar para comprar carro seminovo! Processo transparente, carro impecável e preço justo. Paulo é muito confiável e profissional!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/felipe_araujo_pereira.jpg"
      },
      {
        name: "Renata Oliveira",
        rating: 5,
        text: "Experiência fantástica! Comprei meu Honda City 2020 e superou todas as expectativas. Carro perfeito, documentação ok e atendimento excepcional!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/renata_ribeiro_machado.png"
      },
      {
        name: "Leonardo Silva",
        rating: 5,
        text: "Paulo Veículos é sinônimo de qualidade! Comprei meu Siena 2019 e foi tudo perfeito. Carro revisado, preço honesto e atendimento nota 10!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/leonardo_souza_andrade.png"
      },
      {
        name: "Priscila Lima",
        rating: 5,
        text: "Recomendo de olhos fechados! Paulo é muito profissional, carros de qualidade e preços justos. Já indiquei para vários amigos!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/sara_lima_silva.jpg"
      },
      {
        name: "Rodrigo Alves",
        rating: 5,
        text: "Melhor experiência de compra! Carro impecável, documentação em dia e financiamento facilitado. Paulo é muito transparente e confiável!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/rodrigo_ferreira_cunha.jpg"
      },
      {
        name: "Tatiana Mendes",
        rating: 5,
        text: "Atendimento excepcional! Comprei meu Fox 2019 e foi perfeito. Paulo explicou tudo detalhadamente e o carro estava impecável. Super indico!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/tatiane_fonseca_duarte.jpg"
      },
      {
        name: "Bruno Ferreira",
        rating: 5,
        text: "Processo de compra muito tranquilo! Carro revisado, preço justo e atendimento personalizado. Paulo Veículos é referência em qualidade!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/bruno_barbosa_martins.jpg"
      },
      {
        name: "Carla Santos",
        rating: 5,
        text: "Experiência incrível! Paulo foi muito atencioso, mostrou várias opções e me ajudou a encontrar o carro ideal. Recomendo demais!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/carolina_pinto_costa.png"
      },
      {
        name: "Marcelo Costa",
        rating: 5,
        text: "Melhor concessionária de Vila Velha! Comprei meu Voyage 2018 e foi tudo perfeito. Carro em ótimo estado e preço honesto!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/eduardo_pereira_gomes.jpg"
      },
      {
        name: "Daniela Oliveira",
        rating: 5,
        text: "Atendimento diferenciado! Paulo é muito profissional, explicou todos os detalhes e o carro estava exatamente como prometido!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/fabiana_ferreira_lima.jpg"
      },
      {
        name: "Vinicius Silva",
        rating: 5,
        text: "Compra segura e tranquila! Carro revisado, documentação em dia e preço justo. Paulo é muito transparente em todo o processo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/gabriel_mendes_rocha.jpg"
      },
      {
        name: "Amanda Lima",
        rating: 5,
        text: "Experiência maravilhosa! Comprei meu Clio 2020 e superou todas as expectativas. Paulo é muito atencioso e os carros são excelentes!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/tatiane_fonseca_duarte.jpg"
      },
      {
        name: "Ricardo Alves",
        rating: 5,
        text: "Melhor lugar para comprar carro! Processo transparente, carro impecável e atendimento nota 10. Paulo é muito confiável!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/bruno_barbosa_martins.jpg"
      },
      {
        name: "Isabela Mendes",
        rating: 5,
        text: "Recomendo demais! Comprei meu Honda City 2020 e foi perfeito. Carro em excelente estado, documentação ok e preço justo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/carolina_pinto_costa.png"
      },
      {
        name: "Gabriel Ferreira",
        rating: 5,
        text: "Paulo Veículos é sinônimo de qualidade! Atendimento excepcional, carros revisados e preços honestos. Voltarei com certeza!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/eduardo_pereira_gomes.jpg"
      },
      {
        name: "Natalia Santos",
        rating: 5,
        text: "Experiência fantástica! Paulo foi muito profissional, explicou tudo e o carro estava impecável. Já indiquei para vários amigos!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/fabiana_ferreira_lima.jpg"
      },
      {
        name: "Henrique Costa",
        rating: 5,
        text: "Melhor experiência de compra! Carro revisado, preço justo e atendimento personalizado. Paulo é muito transparente e confiável!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/gabriel_mendes_rocha.jpg"
      },
      {
        name: "Bianca Oliveira",
        rating: 5,
        text: "Atendimento excepcional! Comprei meu Fox 2019 e foi tudo perfeito. Paulo explicou todos os detalhes e o carro estava impecável!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/tatiane_fonseca_duarte.jpg"
      },
      {
        name: "Mateus Silva",
        rating: 5,
        text: "Processo de compra muito tranquilo! Carro em ótimo estado, documentação em dia e preço honesto. Recomendo de olhos fechados!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/bruno_barbosa_martins.jpg"
      },
      {
        name: "Leticia Lima",
        rating: 5,
        text: "Experiência incrível! Paulo foi muito atencioso, mostrou várias opções e me ajudou a escolher o carro ideal. Super indico!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/carolina_pinto_costa.png"
      },
      {
        name: "Alexandre Alves",
        rating: 5,
        text: "Melhor concessionária da região! Comprei meu Voyage 2018 e foi perfeito. Carro revisado, preço justo e atendimento nota 10!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/eduardo_pereira_gomes.jpg"
      },
      {
        name: "Cristina Mendes",
        rating: 5,
        text: "Recomendo demais! Paulo é muito profissional, carros de qualidade e preços justos. Experiência de compra excepcional!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/fabiana_ferreira_lima.jpg"
      },
      {
        name: "Fabio Ferreira",
        rating: 5,
        text: "Compra segura e tranquila! Carro impecável, documentação ok e financiamento facilitado. Paulo é muito transparente!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/gabriel_mendes_rocha.jpg"
      },
      {
        name: "Monica Santos",
        rating: 5,
        text: "Atendimento diferenciado! Comprei meu Clio 2020 e superou todas as expectativas. Paulo é muito atencioso e confiável!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/tatiane_fonseca_duarte.jpg"
      },
      {
        name: "Eduardo Costa",
        rating: 5,
        text: "Melhor lugar para comprar carro seminovo! Processo transparente, carro revisado e preço honesto. Recomendo para todos!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/bruno_barbosa_martins.jpg"
      },
      {
        name: "Fernanda Oliveira",
        rating: 5,
        text: "Experiência maravilhosa! Comprei meu Honda City 2020 e foi perfeito. Carro em excelente estado e atendimento excepcional!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/carolina_pinto_costa.png"
      },
      {
        name: "Lucas Silva",
        rating: 5,
        text: "Paulo Veículos é referência em qualidade! Atendimento personalizado, carros revisados e preços justos. Voltarei com certeza!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/eduardo_pereira_gomes.jpg"
      },
      {
        name: "Adriana Lima",
        rating: 5,
        text: "Recomendo de olhos fechados! Paulo foi muito profissional, explicou tudo e o carro estava impecável. Já indiquei para amigos!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/fabiana_ferreira_lima.jpg"
      },
      {
        name: "Renato Alves",
        rating: 5,
        text: "Melhor experiência de compra! Carro revisado, documentação em dia e preço justo. Paulo é muito transparente e confiável!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/gabriel_mendes_rocha.jpg"
      },
      {
        name: "Simone Mendes",
        rating: 5,
        text: "Atendimento excepcional! Comprei meu Fox 2019 e foi tudo perfeito. Paulo explicou todos os detalhes com muita paciência!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/tatiane_fonseca_duarte.jpg"
      },
      {
        name: "Claudio Ferreira",
        rating: 5,
        text: "Processo de compra muito tranquilo! Carro em ótimo estado, preço honesto e atendimento personalizado. Super recomendo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/bruno_barbosa_martins.jpg"
      },
      {
        name: "Viviane Santos",
        rating: 5,
        text: "Experiência fantástica! Paulo foi muito atencioso, mostrou várias opções e me ajudou a encontrar o carro perfeito!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/carolina_pinto_costa.png"
      },
      {
        name: "Sergio Costa",
        rating: 5,
        text: "Melhor concessionária de Vila Velha! Comprei meu Voyage 2018 e foi perfeito. Carro revisado e preço justo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/eduardo_pereira_gomes.jpg"
      },
      {
        name: "Eliane Oliveira",
        rating: 5,
        text: "Recomendo demais! Paulo é muito profissional, carros de qualidade e atendimento diferenciado. Experiência nota 10!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/fabiana_ferreira_lima.jpg"
      },
      {
        name: "Wagner Silva",
        rating: 5,
        text: "Compra segura e confiável! Carro impecável, documentação ok e financiamento facilitado. Paulo é muito transparente!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/gabriel_mendes_rocha.jpg"
      },
      {
        name: "Rosana Lima",
        rating: 5,
        text: "Atendimento excepcional! Comprei meu Clio 2020 e superou todas as expectativas. Paulo é muito atencioso e honesto!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/tatiane_fonseca_duarte.jpg"
      },
      {
        name: "Marcio Alves",
        rating: 5,
        text: "Melhor lugar para comprar carro! Processo transparente, carro revisado e preço honesto. Recomendo para toda família!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/bruno_barbosa_martins.jpg"
      },
      {
        name: "Claudia Mendes",
        rating: 5,
        text: "Experiência maravilhosa! Comprei meu Honda City 2020 e foi perfeito. Carro em excelente estado e atendimento top!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/carolina_pinto_costa.png"
      },
      {
        name: "Roberto Ferreira",
        rating: 5,
        text: "Paulo Veículos é sinônimo de confiança! Atendimento personalizado, carros revisados e preços justos. Nota 10!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/eduardo_pereira_gomes.jpg"
      }
    ];
  }

  async init() {
    try {
      log('Inicializando módulo de depoimentos...');
      
      this.carousel = getElement(SELECTORS.testimonialsCarousel);
      if (!this.carousel) {
        log('Carousel de depoimentos não encontrado');
        return;
      }

      await this.loadReviews();
      await wait(100); // Wait for DOM update
      
      this.setupEventListeners();
      this.setupTouchEvents();
      this.startAutoPlay();
      
      this.isInitialized = true;
      log('Módulo de depoimentos inicializado com sucesso');
      
    } catch (error) {
      console.error('Erro ao inicializar depoimentos:', error);
    }
  }

  async loadReviews() {
    try {
      log('Carregando depoimentos...');
      
      // Hide loading
      const loading = this.carousel.querySelector('.testimonials__loading');
      if (loading) {
        loading.style.display = 'none';
      }
      
      // Generate HTML
      const reviewsHTML = this.reviews.map((review, index) => `
        <div class="testimonial__card ${index === 0 ? CLASSES.active : ''}" data-review-id="${index}">
          <div class="testimonial__rating">
            ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
          </div>
          <p class="testimonial__text">"${review.text}"</p>
          <div class="testimonial__author">
            <img src="${review.avatar}" alt="${review.name}" class="testimonial__avatar" loading="lazy" onerror="this.src='./assets/Atores/Mulheres/maria_fernandes_lima.jpg'">
            <div class="testimonial__info">
              <h4 class="testimonial__name">${review.name}</h4>
              <span class="testimonial__date">${review.date}</span>
            </div>
          </div>
        </div>
      `).join('');
      
      this.carousel.innerHTML = reviewsHTML;
      
      // Update cards reference after DOM update
      setTimeout(() => {
        this.cards = document.querySelectorAll('#testimonials-carousel .testimonial__card');
        log(`${this.cards.length} depoimentos carregados`);
        
        // Initialize first testimonial
        if (this.cards.length > 0) {
          this.show(0);
        }
      }, 100);
      
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
    }
  }

  setupEventListeners() {
    const prevBtn = getElement(SELECTORS.testimonialsPrev);
    const nextBtn = getElement(SELECTORS.testimonialsNext);
    
    if (prevBtn) {
      addEventListenerSafe(prevBtn, 'click', (e) => {
        e.preventDefault();
        this.prev();
        log('Botão anterior clicado');
      });
    }
    
    if (nextBtn) {
      addEventListenerSafe(nextBtn, 'click', (e) => {
        e.preventDefault();
        this.next();
        log('Botão próximo clicado');
      });
    }
  }

  setupTouchEvents() {
    if (!this.carousel) return;
    
    addEventListenerSafe(this.carousel, 'touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    addEventListenerSafe(this.carousel, 'touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next(); // Swipe left - next
      } else {
        this.prev(); // Swipe right - prev
      }
    }
  }

  show(index) {
    if (!this.cards.length || index < 0 || index >= this.cards.length) return;
    
    // Remove active class from all cards
    removeClassFromAll(this.cards, CLASSES.active);
    
    // Add active class to current card
    addClassSafe(this.cards[index], CLASSES.active);
    
    this.currentIndex = index;
    log(`Mostrando depoimento ${index + 1} de ${this.cards.length}`);
  }

  next() {
    if (!this.cards.length) return;
    
    const nextIndex = (this.currentIndex + 1) % this.cards.length;
    this.show(nextIndex);
    this.resetAutoPlay();
  }

  prev() {
    if (!this.cards.length) return;
    
    const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.show(prevIndex);
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.interval = setInterval(() => {
      this.next();
    }, TIMING.testimonialCarouselInterval);
    log('Auto-play dos depoimentos iniciado');
  }

  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  destroy() {
    this.stopAutoPlay();
    this.isInitialized = false;
    log('Módulo de depoimentos destruído');
  }
}

// Export singleton instance
export default new TestimonialsManager();
