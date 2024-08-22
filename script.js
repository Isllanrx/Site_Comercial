// Script para inicializar o carrossel (se presente) e gerenciar o menu lateral responsivo
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa o carrossel, se existir
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    new bootstrap.Carousel(carousel);
  }

  // Código para o menu lateral (apenas uma vez)
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    // Adiciona um ouvinte de evento de clique no documento
    document.addEventListener('click', (event) => {
      // Verifica se o clique foi feito dentro do menu lateral
      if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        // Se o clique foi feito fora do menu, fecha o menu
        mobileMenu.classList.add('-translate-x-full');
      }
    });

    // Adiciona um ouvinte de evento de clique ao botão do menu
    menuButton.addEventListener('click', () => {
      // Abre ou fecha o menu
      mobileMenu.classList.toggle('-translate-x-full');
    });
  } else {
    console.error("Erro: Elementos do menu não encontrados.");
  }
});