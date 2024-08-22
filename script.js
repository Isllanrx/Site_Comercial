document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o carrossel, se existir
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    new bootstrap.Carousel(carousel);
  }
  // Gerencia o menu lateral responsivo
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('-translate-x-full');
    });

    // Adiciona um ouvinte de evento de clique no documento
    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        mobileMenu.classList.add('-translate-x-full');
      }
    });
  } else {
    console.error("Erro: Elementos do menu não encontrados.");
  }
});