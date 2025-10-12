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
    
    // Função para gerar datas aleatórias
    this.generateRandomDate = () => {
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      
      const year = Math.random() > 0.5 ? 2024 : 2023;
      const month = months[Math.floor(Math.random() * 12)];
      const day = Math.floor(Math.random() * 28) + 1;
      return `${day} de ${month}, ${year}`;
    };
    
    // Função para gerar datas coerentes baseadas no ano do carro mencionado
    this.generateCoherentDate = (carYear) => {
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      
      // Se não há ano específico mencionado, usar data recente (2023-2024)
      if (!carYear) {
        const year = Math.random() > 0.5 ? 2024 : 2023;
        const month = months[Math.floor(Math.random() * 12)];
        const day = Math.floor(Math.random() * 28) + 1;
        return `${day} de ${month}, ${year}`;
      }
      
      // Se há ano do carro, gerar data significativamente posterior ao ano do carro
      // Garantir pelo menos 2 anos de diferença e não antes de 2022
      const minYear = Math.max(carYear + 2, 2022);
      const maxYear = 2024;
      
      // Se o ano mínimo for maior que o máximo, usar apenas 2024
      const year = minYear > maxYear ? 2024 : Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
      const month = months[Math.floor(Math.random() * 12)];
      const day = Math.floor(Math.random() * 28) + 1;
      return `${day} de ${month}, ${year}`;
    };
    
    this.reviews = [
      {
        name: "Maria Silva",
        rating: 5,
        text: "Nossa, que experiência incrível! Estava com medo de comprar carro usado, mas o Paulo me tranquilizou desde o primeiro contato. Meu Honda City está perfeito, nem parece que tem 4 anos. Minha filha adora andar nele!",
        date: this.generateCoherentDate(2020),
        avatar: "./assets/Atores/Mulheres/maria_fernandes_lima.jpg"
      },
      {
        name: "João Santos",
        rating: 5,
        text: "Cara, não acreditei quando o financiamento foi aprovado em 2 dias! Outros lugares demoravam semanas. O Paulo me ajudou com toda a papelada e ainda conseguiu um desconto na entrada. Valeu demais!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/joao_alves_rocha.jpg"
      },
      {
        name: "Ana Costa",
        rating: 5,
        text: "Estava procurando carro há meses e sempre desconfiada. Quando cheguei aqui, o Paulo me mostrou tudo certinho, até o histórico do carro. Meu marido ficou impressionado com a transparência. Recomendo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/ana_souza_lima.jpg"
      },
      {
        name: "Carlos Oliveira",
        rating: 5,
        text: "Meu Fox tá rodando que é uma beleza! Comprei há 2 anos e nunca deu problema. O Paulo é gente boa demais, sempre que passo na rua ele me cumprimenta. Isso que é atendimento!",
        date: this.generateCoherentDate(2019),
        avatar: "./assets/Atores/Homens/carlos_oliveira_santos.jpg"
      },
      {
        name: "Fernanda Lima",
        rating: 5,
        text: "Primeira vez comprando carro e estava super nervosa. O Paulo foi muito paciente, explicou tudo direitinho e ainda me deu dicas de como cuidar do carro. Meu Clio tá lindo!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/fernanda_duarte_freitas.jpg"
      },
      {
        name: "Roberto Alves",
        rating: 5,
        text: "Meu Voyage é meu xodó! Estava precisando de um carro econômico e confiável. O Paulo me mostrou várias opções e eu escolhi o melhor. Minha esposa também aprovou!",
        date: this.generateCoherentDate(2018),
        avatar: "./assets/Atores/Homens/ricardo_borges_alves.jpg"
      },
      {
        name: "Patricia Mendes",
        rating: 5,
        text: "Que alívio encontrar um lugar confiável! Estava com medo de ser enganada, mas o Paulo é muito honesto. Meu carro veio com tudo certinho e ainda ganhei um kit de limpeza. Adorei!",
        date: this.generateCoherentDate(2020),
        avatar: "./assets/Atores/Mulheres/patricia_campos_nunes.png"
      },
      {
        name: "Marcos Ferreira",
        rating: 5,
        text: "Já trouxe 3 amigos aqui e todos compraram! O Paulo é o cara mesmo. Sempre tem carros bons e os preços são justos. Meu pai também comprou um carro aqui ano passado.",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/marcos_silva_santos.png"
      },
      {
        name: "Luciana Rocha",
        rating: 5,
        text: "Meu Siena é perfeito para a família! Espaçoso, econômico e confiável. O Paulo me ajudou a escolher o carro ideal para mim e meus filhos. Estou muito feliz com a compra!",
        date: this.generateCoherentDate(2019),
        avatar: "./assets/Atores/Mulheres/luana_rocha_ferreira.jpg"
      },
      {
        name: "Diego Martins",
        rating: 5,
        text: "Sempre quis um Honda Civic e finalmente consegui! O Paulo me deu um preço ótimo e ainda conseguiu financiamento com juros baixos. Meu sonho realizado!",
        date: this.generateCoherentDate(2021),
        avatar: "./assets/Atores/Homens/diego_costa_nunes.png"
      },
      {
        name: "Camila Santos",
        rating: 5,
        text: "Estava com pressa para comprar um carro e o Paulo resolveu tudo rapidinho! Meu carro veio com tudo certinho, nem precisei me preocupar com nada. Muito obrigada!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/camila_ferreira_lopes.jpg"
      },
      {
        name: "Rafael Silva",
        rating: 5,
        text: "Cara, que atendimento top! O Paulo me tratou como se fosse da família. Meu carro tá rodando perfeitamente e ainda ganhei uma revisão grátis. Valeu demais!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Homens/rafael_lima_fonseca.jpg"
      },
      {
        name: "Juliana Costa",
        rating: 5,
        text: "Primeira vez comprando carro e estava super perdida. O Paulo me guiou em tudo, desde a escolha até o financiamento. Meu carro tá lindo e eu estou amando!",
        date: this.generateRandomDate(),
        avatar: "./assets/Atores/Mulheres/juliana_correia_silva.jpg"
      },
      {
        name: "André Oliveira",
        rating: 5,
        text: "Atendimento excepcional! Comprei meu Fox 2019 e estou muito satisfeito. Carro revisado, documentação ok e preço justo. Paulo é muito confiável!",
        date: this.generateCoherentDate(2019),
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
        date: this.generateCoherentDate(2018),
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
        date: this.generateCoherentDate(2020),
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
        date: this.generateCoherentDate(2020),
        avatar: "./assets/Atores/Mulheres/renata_ribeiro_machado.png"
      },
      {
        name: "Leonardo Silva",
        rating: 5,
        text: "Paulo Veículos é sinônimo de qualidade! Comprei meu Siena 2019 e foi tudo perfeito. Carro revisado, preço honesto e atendimento nota 10!",
        date: this.generateCoherentDate(2019),
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
        date: this.generateCoherentDate(2019),
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
        date: this.generateCoherentDate(2018),
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
        date: this.generateCoherentDate(2020),
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
        date: this.generateCoherentDate(2020),
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
        date: this.generateCoherentDate(2019),
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
        date: this.generateCoherentDate(2018),
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
        date: this.generateCoherentDate(2020),
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
        date: this.generateCoherentDate(2020),
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
        date: this.generateCoherentDate(2019),
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
        date: this.generateCoherentDate(2018),
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
        date: this.generateCoherentDate(2020),
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
        date: this.generateCoherentDate(2020),
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
      
      // Try multiple selectors to find the carousel
      this.carousel = getElement(SELECTORS.testimonialsCarousel) || 
                     document.querySelector('#testimonials-carousel') ||
                     document.querySelector('.testimonials__carousel');
      
      if (!this.carousel) {
        console.error('Carousel de depoimentos não encontrado. Tentando novamente...');
        // Try again after a short delay
        await wait(500);
        this.carousel = getElement(SELECTORS.testimonialsCarousel) || 
                       document.querySelector('#testimonials-carousel') ||
                       document.querySelector('.testimonials__carousel');
        
        if (!this.carousel) {
          console.error('Carousel de depoimentos ainda não encontrado após retry');
          return;
        }
      }

      log('Carousel encontrado, carregando depoimentos...');
      await this.loadReviews();
      await wait(200); // Wait for DOM update
      
      this.setupEventListeners();
      this.setupTouchEvents();
      this.startAutoPlay();
      
      this.isInitialized = true;
      log('Módulo de depoimentos inicializado com sucesso');
      
    } catch (error) {
      console.error('Erro ao inicializar depoimentos:', error);
      // Force fallback content
      this.forceFallbackContent();
    }
  }

  forceFallbackContent() {
    const carousel = document.querySelector('#testimonials-carousel') || 
                    document.querySelector('.testimonials__carousel');
    
    if (carousel) {
      carousel.innerHTML = `
        <div class="testimonial__card active">
          <div class="testimonial__rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="testimonial__text">"Excelente atendimento! Comprei meu carro aqui e foi uma experiência incrível. Recomendo de olhos fechados!"</p>
          <div class="testimonial__author">
            <img src="./assets/Atores/Mulheres/maria_fernandes_lima.jpg" alt="Cliente" class="testimonial__avatar" loading="lazy">
            <div class="testimonial__info">
              <h4 class="testimonial__name">Maria Silva</h4>
              <span class="testimonial__date">15 de Novembro, 2024</span>
            </div>
          </div>
        </div>
      `;
      log('Conteúdo de fallback dos depoimentos carregado');
    }
  }

  async loadReviews() {
    try {
      log('Carregando depoimentos...');
      
      if (!this.carousel) {
        console.error('Carousel não encontrado para carregar depoimentos');
        return;
      }
      
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
        
        // Indicador de posição removido conforme solicitado
        
        // Initialize first testimonial
        if (this.cards.length > 0) {
          this.show(0);
        } else {
          console.error('Nenhum depoimento foi carregado');
        }
      }, 50);
      
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
      // Show fallback content
      if (this.carousel) {
        this.carousel.innerHTML = `
          <div class="testimonial__card active">
            <div class="testimonial__rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p class="testimonial__text">"Excelente atendimento! Comprei meu carro aqui e foi uma experiência incrível. Recomendo de olhos fechados!"</p>
            <div class="testimonial__author">
              <img src="./assets/Atores/Mulheres/maria_fernandes_lima.jpg" alt="Cliente" class="testimonial__avatar" loading="lazy">
              <div class="testimonial__info">
                <h4 class="testimonial__name">Maria Silva</h4>
                <span class="testimonial__date">15 de Novembro, 2024</span>
              </div>
            </div>
          </div>
        `;
      }
    }
  }

  setupEventListeners() {
    // Try multiple selectors for buttons
    const prevBtn = getElement(SELECTORS.testimonialsPrev) || 
                   document.querySelector('#testimonials-prev') ||
                   document.querySelector('.testimonials__prev');
    const nextBtn = getElement(SELECTORS.testimonialsNext) || 
                   document.querySelector('#testimonials-next') ||
                   document.querySelector('.testimonials__next');
    
    log('Configurando botões de navegação:', { prevBtn, nextBtn });
    
    if (prevBtn) {
      addEventListenerSafe(prevBtn, 'click', (e) => {
        e.preventDefault();
        this.prev();
        log('Botão anterior clicado');
      });
    } else {
      console.error('Botão anterior não encontrado');
    }
    
    if (nextBtn) {
      addEventListenerSafe(nextBtn, 'click', (e) => {
        e.preventDefault();
        this.next();
        log('Botão próximo clicado');
      });
    } else {
      console.error('Botão próximo não encontrado');
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
    
    // Log detalhado do depoimento atual
    const currentReview = this.reviews[index];
    if (currentReview) {
      log(`Mostrando depoimento ${index + 1} de ${this.cards.length}: ${currentReview.name} (${currentReview.avatar})`);
    } else {
      log(`Mostrando depoimento ${index + 1} de ${this.cards.length}`);
    }
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


  show(index) {
    if (!this.cards.length || index < 0 || index >= this.cards.length) return;
    
    // Remove active class from all cards
    removeClassFromAll(this.cards, CLASSES.active);
    
    // Add active class to current card
    addClassSafe(this.cards[index], CLASSES.active);
    
    this.currentIndex = index;
    
    // Log detalhado do depoimento atual
    const currentReview = this.reviews[index];
    if (currentReview) {
      log(`Mostrando depoimento ${index + 1} de ${this.cards.length}: ${currentReview.name} (${currentReview.avatar})`);
    } else {
      log(`Mostrando depoimento ${index + 1} de ${this.cards.length}`);
    }
  }

  destroy() {
    this.stopAutoPlay();
    this.isInitialized = false;
    log('Módulo de depoimentos destruído');
  }
}

// Export singleton instance
export default new TestimonialsManager();
