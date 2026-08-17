const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || process.env.DEV_PORT || 3000;
const BASE = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.json': 'application/json'
};

// Mock data
var MOCK_STORE = {
  url: '/', name: 'NOVOS CAMINHOS, NEW MOVES', products_url: '#produtos',
  search_url: '#busca', customer_home_url: '#conta', cart_url: '#carrinho',
  newsletter_url: '#newsletter'
};
var MOCK_CART = { items_count: 2 };
var MOCK_NAV = [
  { name: 'NOVIDADES', url: '#novidades', current: false },
  { name: 'COLEÇÃO', url: '#colecao', current: false },
  { name: 'CAMISETAS', url: '#camisetas', current: false },
  { name: 'MOLETONS', url: '#moletons', current: false },
  { name: 'SHORTS & CALÇAS', url: '#calcas', current: false },
  { name: 'SALE', url: '#sale', current: false }
];
var MOCK_CATEGORIES = [
  { name: 'Camisetas', url: '#camisetas' },
  { name: 'Moletons', url: '#moletons' },
  { name: 'Shorts & Calças', url: '#shorts' },
  { name: 'Regatas & Acessórios', url: '#regatas' }
];
var MOCK_PRODUCTS = [
  { id: 1, name: 'HOODIE OGS OVERSIZED HEAVY', price: 498.00, compare: 598.00, img: 'cat-moletons.jpg', images: ['cat-moletons.jpg', 'promo.jpg'], url: '#produto-1' },
  { id: 2, name: 'TEE OGS STREETWEAR BLACK BOX', price: 198.00, compare: 248.00, img: 'cat-camisetas.jpg', images: ['cat-camisetas.jpg', 'cat-shorts.jpg'], url: '#produto-2' },
  { id: 3, name: 'CALÇA CARGO OGS TACTICAL', price: 389.00, compare: 0, img: 'cat-shorts.jpg', images: ['cat-shorts.jpg', 'cat-moletons.jpg'], url: '#produto-3' },
  { id: 4, name: 'REGATA OGS RAW CUT GREY', price: 149.00, compare: 189.00, img: 'cat-regatas.jpg', images: ['cat-regatas.jpg'], url: '#produto-4' },
  { id: 5, name: 'MOLETON OGS ZIP-UP ACID WASH', price: 468.00, compare: 528.00, img: 'cat-moletons.jpg', images: ['cat-moletons.jpg', 'promo.jpg'], url: '#produto-5' },
  { id: 6, name: 'TEE OGS OFF-WHITE OVERSIZED', price: 219.00, compare: 0, img: 'cat-camisetas.jpg', images: ['cat-camisetas.jpg'], url: '#produto-6' },
  { id: 7, name: 'SHORT OGS HEAVY SWEATSHIRT', price: 249.00, compare: 299.00, img: 'cat-shorts.jpg', images: ['cat-shorts.jpg'], url: '#produto-7' },
  { id: 8, name: 'JAQUETA OGS PUFFER MATELASSÊ', price: 699.00, compare: 799.00, img: 'promo.jpg', images: ['promo.jpg', 'cat-regatas.jpg'], url: '#produto-8' }
];

function money(v) { return 'R$ ' + v.toFixed(2).replace('.', ','); }

function navHtml(items) {
  return items.map(function (item) {
    return '<li class="ogs-nav__item"><a class="ogs-nav__link' + (item.current ? ' ogs-nav__link--active' : '') + '" href="' + item.url + '">' + item.name + '</a></li>';
  }).join('');
}

function mobileNavHtml(items) {
  return items.map(function (item) {
    return '<li><a href="' + item.url + '">' + item.name + '</a></li>';
  }).join('');
}

function renderTopbar() {
  return [
    '<div class="ogs-topbar" id="ogs-topbar">',
    '  <div class="ogs-topbar__inner">',
    '    <button class="ogs-topbar__arrow ogs-topbar__arrow--prev" aria-label="Mensagem anterior">&#8249;</button>',
    '    <p class="ogs-topbar__text">FRETE GR&#193;TIS ACIMA DE R$ 299 &bull; AT&#201; 6X SEM JUROS &bull; NOVOS CAMINHOS, NEW MOVES</p>',
    '    <button class="ogs-topbar__arrow ogs-topbar__arrow--next" aria-label="Pr&#243;xima mensagem">&#8250;</button>',
    '  </div>',
    '</div>'
  ].join('\n');
}

function renderHeader(isHome) {
  var headerTpl = fs.readFileSync(path.join(BASE, 'snipplets/header.tpl'), 'utf8')
    // Process template logic manually for preview
    .replace(/\{%\s*if template == 'home'\s*%\}ogs-header--transparent\{%\s*else\s*%\}ogs-header--solid\{%\s*endif\s*%\}/g, isHome ? 'ogs-header--transparent' : 'ogs-header--solid')
    .replace(/\{%\s*if template == 'home'\s*%\}true\{%\s*else\s*%\}false\{%\s*endif\s*%\}/g, isHome ? 'true' : 'false')
    // Remove topbar block do tpl (já renderizamos separado para evitar duplicata)
    .replace(/<div class="ogs-topbar"[\s\S]*?<\/div>\s*<\/div>\s*\n/g, '')
    .replace(/\\{\\{[^}]*settings\\.topbar_text[^}]*\\}\\}/g, 'FRETE GRÁTIS ACIMA DE R$ 299 • ATÉ 6X SEM JUROS • NOVOS CAMINHOS, NEW MOVES')
    .replace(/\{\{\s*'([^']+)'\s*\|\s*static_url\s*\}\}/g, '/static/$1')
    .replace(/\{\{\s*store\.url\s*\}\}/g, MOCK_STORE.url)
    .replace(/\{\{\s*store\.name\s*\}\}/g, MOCK_STORE.name)
    .replace(/\{\{\s*store\.search_url\s*\}\}/g, MOCK_STORE.search_url)
    .replace(/\{\{\s*store\.customer_home_url\s*\}\}/g, MOCK_STORE.customer_home_url)
    .replace(/\{\{\s*store\.cart_url\s*\}\}/g, MOCK_STORE.cart_url)
    .replace(/\{\{\s*cart\.items_count\s*\}\}/g, String(MOCK_CART.items_count))
    // nav desktop
    .replace(/\{%\s*for item in navigation\s*%\}[\s\S]*?\{%\s*endfor\s*%\}/g, function (m) {
      if (m.includes('ogs-nav__item')) return navHtml(MOCK_NAV);
      return mobileNavHtml(MOCK_NAV);
    })
    // fallback — remover qualquer tag Twig residual
    .replace(/\{%[^%]*%\}/g, '')
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/\{#[\s\S]*?#\}/g, '');
  return renderTopbar() + '\n' + headerTpl;
}

function renderFooter() {
  var suporteLinks = [
    '<li><a href="#">Central de Ajuda</a></li>',
    '<li><a href="#">Meus Pedidos</a></li>',
    '<li><a href="#">Solicitar Troca ou Devolução</a></li>',
    '<li><a href="#">Política de Privacidade</a></li>',
    '<li><a href="#">Política de Frete</a></li>',
    '<li><a href="#">Termos de Serviço</a></li>'
  ].join('');
  var institucionalLinks = [
    '<li><a href="#">Quem Somos</a></li>',
    '<li><a href="#">Políticas de Troca</a></li>',
    '<li><a href="#">Contato</a></li>'
  ].join('');
  return fs.readFileSync(path.join(BASE, 'snipplets/footer.tpl'), 'utf8')
    .replace(/\{\{\s*store\.name\s*\}\}/g, MOCK_STORE.name)
    .replace(/\{%\s*for item in navigation\s*%\}[\s\S]*?\{%\s*endfor\s*%\}/g, suporteLinks)
    .replace(/\{%\s*for page in pages\s*%\}[\s\S]*?\{%\s*endfor\s*%\}/g, institucionalLinks)
    .replace(/\{\{[^}]*'now'[^}]*\}\}/g, '2026')
    .replace(/\{\{\s*powered_by_link\s*\}\}/g, 'Plataforma Nuvemshop')
    .replace(/\{%[^%]*%\}/g, '')
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/\{#[\s\S]*?#\}/g, '');
}

function renderCategoryCards() {
  var fallback = ['cat-camisetas.jpg', 'cat-moletons.jpg', 'cat-shorts.jpg', 'cat-regatas.jpg'];
  return MOCK_CATEGORIES.map(function (cat, i) {
    return [
      '<li class="ogs-cat" data-reveal="up" style="--reveal-delay:' + (i * 80) + 'ms">',
      '  <a class="ogs-cat__link" href="' + cat.url + '">',
      '    <div class="ogs-cat__media">',
      '      <img class="ogs-cat__img" src="/static/images/' + fallback[i] + '" alt="' + cat.name + '" loading="lazy">',
      '      <div class="ogs-cat__overlay" aria-hidden="true"></div>',
      '    </div>',
      '    <span class="ogs-cat__name">' + cat.name + '</span>',
      '  </a>',
      '</li>'
    ].join('\n');
  }).join('\n');
}

function renderProductCards(products) {
  var list = products || MOCK_PRODUCTS;
  if (list.length === 0) {
    return '<li style="padding:40px;color:var(--ogs-muted);font-family:Inter,sans-serif;font-size:14px;">Nenhum produto encontrado com os filtros selecionados.</li>';
  }
  return list.map(function (p) {
    var installmentVal = money(p.price / 10);
    var discountHTML = '';
    if (p.compare > p.price) {
      var pct = Math.round(((p.compare - p.price) / p.compare) * 100);
      discountHTML = '<div class="ogs-product__badge-sale">-' + pct + '%</div>';
    }
    
    var imagesHTML = '';
    if (p.images && p.images.length > 1) {
      imagesHTML = '<div class="ogs-product__image-slider">';
      p.images.slice(0, 4).forEach(function(img, idx) {
        imagesHTML += '<img class="ogs-product__image' + (idx === 0 ? ' active' : '') + '" src="/static/images/' + img + '" alt="' + p.name + '">';
      });
      imagesHTML += '</div>';
      imagesHTML += '<button class="ogs-product__arrow ogs-product__arrow--prev" aria-label="Imagem anterior" type="button"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
      imagesHTML += '<button class="ogs-product__arrow ogs-product__arrow--next" aria-label="Próxima imagem" type="button"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
    } else {
      imagesHTML = '<img class="ogs-product__image active" src="/static/images/' + p.img + '" alt="' + p.name + '">';
    }

    var compareHTML = '';
    if (p.compare > p.price) {
      compareHTML = '<span class="ogs-product__price-compare">' + money(p.compare) + '</span>';
    }

    return [
      '<li class="ogs-product" data-store="product-item-' + p.id + '">',
      '  <div class="ogs-product__img-wrap">',
      '    ' + discountHTML,
      '    <a class="ogs-product__img-link" href="' + p.url + '">',
      '      ' + imagesHTML,
      '    </a>',
      '  </div>',
      '  <div class="ogs-product__info">',
      '    <h3 class="ogs-product__name"><a href="' + p.url + '">' + p.name + '</a></h3>',
      '    <div class="ogs-product__pricing">',
      '      ' + compareHTML,
      '      <strong class="ogs-product__price-current">' + money(p.price) + '</strong>',
      '      <p class="ogs-product__installments">ou <strong>10x de ' + installmentVal + '</strong> sem juros</p>',
      '    </div>',
      '  </div>',
      '</li>'
    ].join('\n');
  }).join('\n');
}

function renderHome() {
  var categoriesSection = [
    '<section class="ogs-section" id="categorias" data-reveal="up">',
    '  <header class="ogs-section__head">',
    '    <h2 class="ogs-section__title">Categorias</h2>',
    '    <a class="ogs-section__link" href="#">Ver todas <span aria-hidden="true">→</span></a>',
    '  </header>',
    '  <ul class="ogs-cats">' + renderCategoryCards() + '</ul>',
    '</section>'
  ].join('\n');

  var productsSection = [
    '<section class="ogs-section" id="produtos" data-reveal="up">',
    '  <header class="ogs-section__head">',
    '    <h2 class="ogs-section__title">Destaques</h2>',
    '    <a class="ogs-section__link" href="#">Ver todos <span aria-hidden="true">→</span></a>',
    '  </header>',
    '  <ul class="ogs-grid" id="ogs-product-grid">' + renderProductCards() + '</ul>',
    '  <div class="ogs-section__cta"><a class="ogs-btn ogs-btn--outline" href="#">Ver todos os produtos</a></div>',
    '</section>'
  ].join('\n');

  return [
    // Hero Banner Slider (4 modelos intercaláveis com suporte a Vídeo e Imagem)
    '<section class="ogs-hero" id="ogs-hero" aria-label="Campanha principal">',
    '  <div class="ogs-hero__slider" id="ogs-hero-slider">',
    '    <div class="ogs-hero__slide ogs-hero__slide--active"><a class="ogs-hero__link" href="#produtos"><div class="ogs-hero__media"><video autoplay muted loop playsinline poster="/static/images/banner-desktop-1.png"><source src="/static/images/banner-video.mp4" type="video/mp4"><picture class="ogs-hero__media"><source media="(min-width: 768px)" srcset="/static/images/banner-desktop-1.png"><img src="/static/images/banner-mobile-1.png" alt="Campanha OGS 1" loading="eager"></picture></video></div></a></div>',
    '    <div class="ogs-hero__slide"><a class="ogs-hero__link" href="#produtos"><picture class="ogs-hero__media"><source media="(min-width: 768px)" srcset="/static/images/banner-desktop-2.png"><img src="/static/images/banner-mobile-2.png" alt="Campanha OGS 2" loading="lazy"></picture></a></div>',
    '    <div class="ogs-hero__slide"><a class="ogs-hero__link" href="#produtos"><picture class="ogs-hero__media"><source media="(min-width: 768px)" srcset="/static/images/banner-desktop-3.png"><img src="/static/images/banner-mobile-3.png" alt="Campanha OGS 3" loading="lazy"></picture></a></div>',
    '    <div class="ogs-hero__slide"><a class="ogs-hero__link" href="#produtos"><picture class="ogs-hero__media"><source media="(min-width: 768px)" srcset="/static/images/banner-desktop-4.png"><img src="/static/images/banner-mobile-4.png" alt="Campanha OGS 4" loading="lazy"></picture></a></div>',
    '  </div>',
    '  <button class="ogs-hero__arrow ogs-hero__arrow--prev" id="ogs-hero-prev" aria-label="Banner anterior">&#8249;</button>',
    '  <button class="ogs-hero__arrow ogs-hero__arrow--next" id="ogs-hero-next" aria-label="Pr&#243;ximo banner">&#8250;</button>',
    '  <div class="ogs-hero__dots" id="ogs-hero-dots">',
    '    <button class="ogs-hero__dot ogs-hero__dot--active" data-slide="0" aria-label="Slide 1"></button>',
    '    <button class="ogs-hero__dot" data-slide="1" aria-label="Slide 2"></button>',
    '    <button class="ogs-hero__dot" data-slide="2" aria-label="Slide 3"></button>',
    '    <button class="ogs-hero__dot" data-slide="3" aria-label="Slide 4"></button>',
    '  </div>',
    '</section>',
    // Botões de Coleção + Grade Carrossel de Produtos
    '<section class="ogs-section ogs-catalog-section" id="produtos" data-reveal="up">',
    '  <div class="ogs-benefits__list ogs-catalog-buttons">',
    '    <a href="#produtos" class="ogs-benefits__item"><div class="ogs-benefits__title-wrap"><strong>ROTAS</strong></div></a>',
    '    <a href="#produtos" class="ogs-benefits__item"><div class="ogs-benefits__title-wrap"><strong>ESSENTIALS</strong></div></a>',
    '    <a href="#produtos" class="ogs-benefits__item"><div class="ogs-benefits__title-wrap"><strong>WOMAN</strong></div></a>',
    '    <a href="#produtos" class="ogs-benefits__item"><div class="ogs-benefits__title-wrap"><strong>SALE</strong></div></a>',
    '    <a href="#produtos" class="ogs-benefits__item"><div class="ogs-benefits__title-wrap"><strong>INVERNO26</strong></div></a>',
    '    <a href="#produtos" class="ogs-benefits__item"><div class="ogs-benefits__title-wrap"><strong>COMMUNITY</strong></div></a>',
    '  </div>',
    '  <div class="ogs-grid-wrap">',
    '    <button class="ogs-carousel__prev" id="ogs-carousel-prev" aria-label="Peças anteriores">‹</button>',
    '    <ul class="ogs-grid ogs-grid--borderless" id="ogs-product-grid">' + renderProductCards() + '</ul>',
    '    <button class="ogs-carousel__next" id="ogs-carousel-next" aria-label="Próximas peças">&#8250;</button>',
    '  </div>',
    '</section>',
  ].join('\n');
}

function renderPage(isHome) {
  var layout = fs.readFileSync(path.join(BASE, 'layouts/layout.tpl'), 'utf8');
  var header = renderHeader(isHome); // já inclui topbar
  var footer = renderFooter();
  var home = renderHome();

  return layout
    .replace(/\{\{\s*page_title\s*\}\}/g, 'OGS — Original Gângster Style | Homepage')
    .replace(/\{%\s*if page_description\s*%\}[\s\S]*?\{%\s*endif\s*%\}/g,
      '<meta name="description" content="Moda urbana streetwear. Peças oversized, corte boxy e atitude.">')
    .replace(/\{\{\s*'css\/ogs\.css'[^}]*\}\}/g, '<link rel="stylesheet" href="/static/css/ogs.css">')
    .replace(/\{\{\s*'js\/ogs\.js'[^}]*\}\}/g, '<script src="/static/js/ogs.js"><\/script>')
    .replace(/\{\{\s*back_to_admin\s*\}\}/g, '')
    .replace(/\{%\s*include 'snipplets\/header\.tpl'\s*%\}/g, header)
    .replace(/\{%\s*template_content\s*%\}/g, home)
    .replace(/\{%\s*include 'snipplets\/footer\.tpl'\s*%\}/g, footer)
    .replace(/\{%[^%]*%\}/g, '')
    .replace(/\{\{[^}]*\}\}/g, '');
}

/* Parseia query string simples: ?categoria=camisetas&tamanho=m */
function parseQuery(rawUrl) {
  var parts = rawUrl.split('?');
  var q = {};
  if (parts.length < 2) return q;
  parts[1].split('&').forEach(function(pair) {
    var kv = pair.split('=');
    if (kv[0]) q[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
  });
  return q;
}

/* Filtra os produtos mockados por query params */
function filterProducts(query) {
  var CATEGORIES = {
    'camisetas': ['camiseta', 'tee', 'regata'],
    'moletons': ['moleton', 'hoodie', 'zip'],
    'shorts': ['short', 'calca', 'cargo'],
    'regatas': ['regata']
  };
  var SIZE_MAP = { 'p': 'P', 'm': 'M', 'g': 'G', 'gg': 'GG' };

  var products = MOCK_PRODUCTS;

  if (query['categoria']) {
    var cat = query['categoria'].toLowerCase();
    var keywords = CATEGORIES[cat] || [cat];
    products = products.filter(function(p) {
      return keywords.some(function(kw) {
        return p.name.toLowerCase().indexOf(kw) !== -1;
      });
    });
  }

  // Simulação de filtro por tamanho (tags no nome)
  if (query['tamanho']) {
    var sz = SIZE_MAP[query['tamanho'].toLowerCase()] || query['tamanho'].toUpperCase();
    // No mock, mostra produtos ímpares para P/G e pares para M/GG como simulação
    var odd = (sz === 'P' || sz === 'G');
    products = products.filter(function(p, i) { return odd ? i % 2 === 0 : i % 2 === 1; });
  }

  return products;
}

var server = http.createServer(function (req, res) {
  var rawUrl = req.url;
  var url = rawUrl.split('?')[0];
  var query = parseQuery(rawUrl);

  if (url === '/' || url === '/index.html' || url.startsWith('/categoria/') || url === '/sobre' || url === '/community' || url === '/produtos' || url.startsWith('/produto/')) {
    try {
      var html;
      var catName = '';
      if (url.startsWith('/categoria/')) {
        catName = decodeURIComponent(url.replace('/categoria/', '')).toUpperCase();
      } else if (url === '/sobre') {
        catName = 'SOBRE A OGS';
      } else if (url === '/community') {
        catName = 'COMMUNITY';
      } else if (url === '/produtos') {
        catName = 'TODAS AS PEÇAS';
      }

      if (url.startsWith('/produto/')) {
        var prodTpl = fs.readFileSync(path.join(BASE, 'templates/product.tpl'), 'utf8')
          .replace(/\{\{\s*product\.name\s*\}\}/g, 'HOODIE OGS OVERSIZED HEAVY')
          .replace(/\{\{\s*product\.price\s*\|\s*money\s*\}\}/g, 'R$ 498,00')
          .replace(/\{\{\s*product\.compare_at_price\s*\|\s*money\s*\}\}/g, 'R$ 598,00')
          .replace(/\{%\s*if product\.display_price\s*%\}[\s\S]*?\{%\s*endif\s*%\}/g, '<div class="ogs-product-detail__price"><span class="ogs-product__price-old">R$ 598,00</span><strong>R$ 498,00</strong></div>')
          .replace(/\{%\s*if product\.compare_at_price > product\.price\s*%\}/g, '')
          .replace(/\{%\s*for image in product\.images\s*%\}[\s\S]*?\{%\s*endfor\s*%\}/g, '<div class="ogs-product-gallery__item"><img src="/static/images/cat-moletons.jpg" alt="Produto"></div>')
          .replace(/\{%\s*if not store\.is_catalog\s*%\}/g, '')
          .replace(/\{%\s*if product\.variations\s*%\}/g, '')
          .replace(/\{%\s*for variation in product\.variations\s*%\}[\s\S]*?\{%\s*endfor\s*%\}/g, '<label>Tamanho<select><option>P</option><option>M</option><option>G</option><option>GG</option></select></label>')
          .replace(/\{%\s*if product\.description\s*%\}[\s\S]*?\{%\s*endif\s*%\}/g, '<div class="ogs-product-description"><p>O Hoodie definitivo para o seu streetwear. Modelagem boxy oversized com moletom premium de 400gsm. Construído para durar.</p></div>')
          .replace(/\{%\s*if not product\.available\s*%\}[\s\S]*?disabled\{%\s*endif\s*%\}/g, '')
          .replace(/\{%\s*if product\.available\s*%\}ADICIONAR AO CARRINHO\{%\s*else\s*%\}SEM ESTOQUE\{%\s*endif\s*%\}/g, 'ADICIONAR AO CARRINHO')
          .replace(/\{%\s*set related_products\s*=\s*sections\.primary\.products\s*%\}/g, '')
          .replace(/\{%\s*for product in related_products\s*\|\s*slice\(0,\s*4\)\s*%\}[\s\S]*?\{%\s*endfor\s*%\}/g, renderProductCards(MOCK_PRODUCTS.slice(0, 4)))
          .replace(/\{%[^%]*%\}/g, '')
          .replace(/\{\{[^}]*\}\}/g, '')
          .replace(/\{#[\s\S]*?#\}/g, '');
          
        html = renderPage(false).replace(/<main>[\s\S]*?<\/main>/, '<main>' + prodTpl + '<\/main>');
      } else if (catName) {
        var filteredProducts = filterProducts(query);
        var layoutTpl = renderPage(false).replace(/<main>[\s\S]*?<\/main>/, '<main>{% template_content %}<\/main>');

        // Gerar HTML de filtros simulados — usa classes CSS, sem style inline conflitante
        function makeFilterLink(href, label, selected) {
          return '<li><a href="' + href + '" class="ogs-filter-link' + (selected ? ' ogs-filter-link--active' : '') + '">' + label + '</a></li>';
        }

        var catLinks = ['camisetas','moletons','shorts','regatas'].map(function(cat) {
          var sel = query['categoria'] === cat;
          var href = sel ? url : url + '?categoria=' + cat;
          var count = MOCK_PRODUCTS.filter(function(p){ return p.name.toLowerCase().indexOf(cat.replace(/s$/,'')) !== -1; }).length;
          return makeFilterLink(href, cat.charAt(0).toUpperCase() + cat.slice(1) + ' (' + count + ')', sel);
        }).join('');

        var szLinks = ['p','m','g','gg'].map(function(sz) {
          var sel = query['tamanho'] === sz;
          var existingQ = query['categoria'] ? '?categoria=' + query['categoria'] + '&tamanho=' + sz : '?tamanho=' + sz;
          var href = sel ? (query['categoria'] ? url + '?categoria=' + query['categoria'] : url) : url + existingQ;
          var counts = {p:4, m:4, g:3, gg:2};
          return makeFilterLink(href, sz.toUpperCase() + ' (' + counts[sz] + ')', sel);
        }).join('');

        var arrow = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        var filterDropdownsHtml = [
          '<div class="ogs-filter-dropdown-wrapper">',
          '  <button class="ogs-filter-btn js-filter-toggle" type="button">CATEGORIA ' + arrow + '</button>',
          '  <div class="ogs-filter-dropdown js-filter-dropdown">',
          '    <ul class="ogs-filter-list">' + catLinks + '</ul>',
          '  </div>',
          '</div>',
          '<div class="ogs-filter-dropdown-wrapper">',
          '  <button class="ogs-filter-btn js-filter-toggle" type="button">TAMANHO ' + arrow + '</button>',
          '  <div class="ogs-filter-dropdown js-filter-dropdown">',
          '    <ul class="ogs-filter-list">' + szLinks + '</ul>',
          '  </div>',
          '</div>'
        ].join('\n');

        // Indicador de filtro ativo
        var activeFilters = [];
        if (query['categoria']) activeFilters.push('CATEGORIA: ' + query['categoria'].toUpperCase());
        if (query['tamanho']) activeFilters.push('TAMANHO: ' + query['tamanho'].toUpperCase());
        var activeTag = activeFilters.length > 0
          ? '<span class="ogs-filter-active-tag" style="font-size:11px;color:var(--ogs-muted);letter-spacing:0.06em;">' + activeFilters.join(' · ') + ' <a href="' + url + '" class="ogs-filter-link" title="Limpar filtros" style="display:inline;padding:0;">✕</a></span>'
          : '';

        var catTpl = fs.readFileSync(path.join(BASE, 'templates/category.tpl'), 'utf8')
          .replace(/\{\{\s*category\.name\s*\}\}/g, catName)
          .replace(/\{%\s*if category\.description\s*%\}[\s\S]*?\{%\s*endif\s*%\}/g, '')
          // Substituir o bloco de filtros usando marcadores fixos (evita problema de regex com {% endif %} aninhados)
          .replace(/<!--\s*FILTERS_START\s*-->[\s\S]*?<!--\s*FILTERS_END\s*-->/, function() { return filterDropdownsHtml + activeTag; })
          .replace(/\{%\s*if products\s*%\}/g, '')
          .replace(/\{%\s*else\s*%\}[\s\S]*?\{%\s*endif\s*%\}/g, '')
          .replace(/\{%\s*for product in products\s*%\}[\s\S]*?\{%\s*endfor\s*%\}/g, renderProductCards(filteredProducts))
          .replace(/\{%\s*include 'snipplets\/pagination\.tpl'\s*%\}/g, '')
          // Simula products_count
          .replace(/\{%\s*if category\.products_count\s*%\}[\s\S]*?\{%\s*else\s*%\}[\s\S]*?\{%\s*endif\s*%\}/g, String(filteredProducts.length))
          .replace(/\{%[^%]*%\}/g, '')
          .replace(/\{\{[^}]*\}\}/g, '')
          .replace(/\{#[\s\S]*?#\}/g, '');
        html = layoutTpl.replace('{% template_content %}', catTpl);

      } else {
        html = renderPage(true);
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (err) {
      console.error('Render error:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Erro ao renderizar: ' + err.message + '\n' + err.stack);
    }
    return;
  }

  var filePath = path.join(BASE, url);
  if (!filePath.startsWith(BASE)) {
    res.writeHead(403); res.end(); return;
  }

  fs.stat(filePath, function (err, stats) {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + url); return;
    }
    var ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.on('error', function(err) {
  if (err.code === 'EADDRINUSE') {
    var fallback = PORT + 1;
    console.error('\n❌ Porta ' + PORT + ' já está em uso.');
    console.log('   Tentando porta ' + fallback + ' como alternativa...\n');
    server.listen(fallback, function() {
      console.log('\n🚀 OGS Preview Server rodando!');
      console.log('👉  http://localhost:' + fallback);
      console.log('\nPressione Ctrl+C para parar.\n');
    });
  } else {
    throw err;
  }
});

server.listen(PORT, function () {
  console.log('\n🚀 OGS Preview Server rodando!');
  console.log('👉  http://localhost:' + PORT);
  console.log('\nPressione Ctrl+C para parar.\n');
});
