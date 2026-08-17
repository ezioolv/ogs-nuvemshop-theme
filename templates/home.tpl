{# ===================================================
   OGS — HOME PAGE
   Seções:
   1. Hero Banner (responsivo Desktop 16:9 / Mobile 9:16)
   2. Selos de benefícios (4 colunas)
   3. Grid de Categorias
   4. Pill-Bar de filtro + Vitrine de Produtos
   5. Banner Promo Split (imagem + texto)
   6. Newsletter
   =================================================== #}

{# 1. HERO BANNER SLIDER (4 MODELOS COM TIMER E NAVEGAÇÃO) #}
<section class="ogs-hero" id="ogs-hero" aria-label="Campanha principal">
  <div class="ogs-hero__slider" id="ogs-hero-slider">
    <!-- Slide 1 (Vídeo Desktop + Vídeo Mobile ou Imagem) -->
    <div class="ogs-hero__slide ogs-hero__slide--active">
      <a class="ogs-hero__link" href="{{ store.products_url }}" aria-label="Ver Coleção OGS 1">
        <div class="ogs-hero__media">
          <!-- Desktop video (≥768px) -->
          <video class="ogs-hero__video ogs-hero__video--desktop" autoplay muted loop playsinline poster="{{ 'images/banner-desktop-1.png' | static_url }}">
            <source src="{{ 'images/banner-video.mp4' | static_url }}" type="video/mp4">
            <picture>
              <source media="(min-width: 768px)" srcset="{{ 'images/banner-desktop-1.png' | static_url }}">
              <img src="{{ 'images/banner-mobile-1.png' | static_url }}" alt="Campanha OGS 1" loading="eager">
            </picture>
          </video>
          <!-- Mobile video (<768px) -->
          <video class="ogs-hero__video ogs-hero__video--mobile" autoplay muted loop playsinline poster="{{ 'images/banner-mobile-1.png' | static_url }}">
            <source src="{{ 'images/banner-video-mobile.mp4' | static_url }}" type="video/mp4">
            <img src="{{ 'images/banner-mobile-1.png' | static_url }}" alt="Campanha OGS 1" loading="eager">
          </video>
        </div>
      </a>
    </div>
    <!-- Slide 2 -->
    <div class="ogs-hero__slide">
      <a class="ogs-hero__link" href="{{ store.products_url }}" aria-label="Ver Coleção OGS 2">
        <picture class="ogs-hero__media">
          <source media="(min-width: 768px)" srcset="{{ 'images/banner-desktop-2.png' | static_url }}">
          <img src="{{ 'images/banner-mobile-2.png' | static_url }}" alt="Campanha OGS 2" loading="lazy">
        </picture>
      </a>
    </div>
    <!-- Slide 3 -->
    <div class="ogs-hero__slide">
      <a class="ogs-hero__link" href="{{ store.products_url }}" aria-label="Ver Coleção OGS 3">
        <picture class="ogs-hero__media">
          <source media="(min-width: 768px)" srcset="{{ 'images/banner-desktop-3.png' | static_url }}">
          <img src="{{ 'images/banner-mobile-3.png' | static_url }}" alt="Campanha OGS 3" loading="lazy">
        </picture>
      </a>
    </div>
    <!-- Slide 4 -->
    <div class="ogs-hero__slide">
      <a class="ogs-hero__link" href="{{ store.products_url }}" aria-label="Ver Coleção OGS 4">
        <picture class="ogs-hero__media">
          <source media="(min-width: 768px)" srcset="{{ 'images/banner-desktop-4.png' | static_url }}">
          <img src="{{ 'images/banner-mobile-4.png' | static_url }}" alt="Campanha OGS 4" loading="lazy">
        </picture>
      </a>
    </div>
  </div>

  <!-- Setas laterais centralizadas -->
  <button class="ogs-hero__arrow ogs-hero__arrow--prev" id="ogs-hero-prev" aria-label="Banner anterior">‹</button>
  <button class="ogs-hero__arrow ogs-hero__arrow--next" id="ogs-hero-next" aria-label="Próximo banner">›</button>

  <!-- Indicadores de banner -->
  <div class="ogs-hero__dots" id="ogs-hero-dots">
    <button class="ogs-hero__dot ogs-hero__dot--active" data-slide="0" aria-label="Ir para o slide 1"></button>
    <button class="ogs-hero__dot" data-slide="1" aria-label="Ir para o slide 2"></button>
    <button class="ogs-hero__dot" data-slide="2" aria-label="Ir para o slide 3"></button>
    <button class="ogs-hero__dot" data-slide="3" aria-label="Ir para o slide 4"></button>
  </div>
</section>

{# 2. ETIQUETAS DE COLEÇÃO + CARROSSEL DE PRODUTOS #}
<section class="ogs-section ogs-catalog-section" id="produtos" data-reveal="up">
  <div class="ogs-benefits__list ogs-catalog-buttons">
    <a href="{{ store.products_url }}?cat=rotas" class="ogs-benefits__item">
      <div class="ogs-benefits__title-wrap">
        <strong>ROTAS</strong>
      </div>
    </a>
    <a href="{{ store.products_url }}?cat=essentials" class="ogs-benefits__item">
      <div class="ogs-benefits__title-wrap">
        <strong>ESSENTIALS</strong>
      </div>
    </a>
    <a href="{{ store.products_url }}?cat=woman" class="ogs-benefits__item">
      <div class="ogs-benefits__title-wrap">
        <strong>WOMAN</strong>
      </div>
    </a>
    <a href="{{ store.products_url }}?cat=sale" class="ogs-benefits__item">
      <div class="ogs-benefits__title-wrap">
        <strong>SALE</strong>
      </div>
    </a>
    <a href="{{ store.products_url }}?cat=inverno26" class="ogs-benefits__item">
      <div class="ogs-benefits__title-wrap">
        <strong>INVERNO26</strong>
      </div>
    </a>
    <a href="{{ store.products_url }}?cat=community" class="ogs-benefits__item">
      <div class="ogs-benefits__title-wrap">
        <strong>COMMUNITY</strong>
      </div>
    </a>
  </div>

  <div class="ogs-grid-wrap">
    <button class="ogs-carousel__prev" id="ogs-carousel-prev" aria-label="Peças anteriores">‹</button>
    <ul class="ogs-grid ogs-grid--borderless" id="ogs-product-grid">
      {% set catalog_products = sections.primary.products %}
      {% for product in catalog_products | slice(0, 9) %}
        {% include 'snipplets/product-card.tpl' %}
      {% endfor %}
    </ul>
    <button class="ogs-carousel__next" id="ogs-carousel-next" aria-label="Próximas peças">›</button>
  </div>
</section>

