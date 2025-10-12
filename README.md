# Paulo Veículos - Landing Page

Landing page moderna e responsiva para concessionária de veículos em Vila Velha, ES.

## Características

- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **PWA Completo**: Service Worker, manifest.json, cache offline
- **SEO Otimizado**: Meta tags, structured data, sitemap.xml
- **Performance**: CSS/JS minificados, lazy loading, preload
- **Acessibilidade**: ARIA labels, contraste WCAG AA
- **Carrosséis**: Hero automático, depoimentos, Instagram
- **Interatividade**: Contadores animados, countdown, smooth scroll

## Estrutura do Projeto

```
Landing_page/
├── assets/
│   ├── css/           # CSS minificado
│   ├── js/            # JavaScript modular
│   └── Atores/        # Imagens de avatares
├── Imagens/           # Imagens otimizadas
├── index.html         # Página principal
├── sw.js             # Service Worker
├── manifest.json     # PWA manifest
├── sitemap.xml       # SEO sitemap
└── robots.txt        # SEO robots
```

## Tecnologias

- **HTML5**: Semântico e acessível
- **CSS3**: Variáveis, Grid, Flexbox, animações
- **JavaScript ES6+**: Módulos, async/await, classes
- **PWA**: Service Worker, manifest, cache
- **SEO**: Meta tags, JSON-LD, sitemap

## Instalação

1. Clone o repositório
2. Abra `index.html` no navegador
3. Para desenvolvimento local, use um servidor HTTP

## Funcionalidades

### Hero Section
- Carrossel automático com 3 slides
- Botões CTA: "Ver Ofertas" e "Simular Financiamento"
- Indicadores de navegação
- Suporte a touch/swipe

### Sobre Nós
- Estatísticas animadas (12+ anos, 500+ carros, 98% satisfação)
- Texto institucional otimizado
- Ícones e métricas visuais

### Carros em Destaque
- Grid responsivo (3 colunas desktop, 2 tablet, 1 mobile)
- Simulação de posts do Instagram
- Botão "Ver mais no Instagram"
- Hover effects e transições

### Ofertas Especiais
- Cards com countdown timer
- Preços destacados
- CTAs para WhatsApp
- Design com gradiente escuro

### Depoimentos
- Carrossel com 50+ depoimentos
- Avatares reais de clientes
- Datas aleatórias (2015-2025)
- Auto-play e navegação manual

### Como Funciona
- Timeline horizontal (desktop) e vertical (mobile)
- 3 passos do processo de compra
- Ícones ilustrativos
- CTA final

### Footer
- Mapa do Google integrado
- Informações de contato
- Redes sociais (Instagram, WhatsApp)
- CTA final para conversão

## Performance

- **CSS Minificado**: 4 arquivos otimizados
- **Lazy Loading**: Imagens carregadas sob demanda
- **Preload**: Recursos críticos carregados primeiro
- **Cache**: Service Worker para cache offline
- **WebP**: Imagens otimizadas

## SEO

- **Meta Tags**: Title, description, keywords otimizados
- **Open Graph**: Facebook e Twitter cards
- **JSON-LD**: Structured data para AutoDealer
- **Sitemap**: Todas as seções mapeadas
- **Robots**: Configuração para crawlers

## Acessibilidade

- **ARIA Labels**: Navegação e carrosséis.
- **Contraste**: WCAG AA compliant
- **Semântica**: HTML5 semântico
- **Navegação**: Teclado e screen readers

## Responsividade

- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: 374px, 767px, 1023px, 1024px+
- **Touch**: Gestos de swipe e toque
- **Flexbox/Grid**: Layouts responsivos

## PWA

- **Service Worker**: Cache offline
- **Manifest**: Instalação como app
- **Icons**: Ícones para diferentes tamanhos
- **Offline**: Funcionamento sem internet

## Desenvolvimento

### Estrutura Modular
- **CSS**: 4 arquivos especializados
- **JS**: 10 módulos + utils
- **Imagens**: Organizadas por categoria

### Debug
- Logs detalhados em console
- Métodos de teste em cada módulo
- Error handling completo

## Deploy

1. Upload dos arquivos para servidor
2. Configurar HTTPS (obrigatório para PWA)
3. Verificar Service Worker
4. Testar em diferentes dispositivos

## Suporte

- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet, mobile
- **Resoluções**: 320px a 1920px+

## Licença

Projeto proprietário - Paulo Veículos