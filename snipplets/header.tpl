<div class="ogs-topbar" id="ogs-topbar">
  <div class="ogs-topbar__inner">
    <button class="ogs-topbar__arrow ogs-topbar__arrow--prev" aria-label="Mensagem anterior">‹</button>
    <p class="ogs-topbar__text">FRETE GRÁTIS ACIMA DE R$ 299 • ATÉ 6X SEM JUROS • NOVOS CAMINHOS, NEW MOVES</p>
    <button class="ogs-topbar__arrow ogs-topbar__arrow--next" aria-label="Próxima mensagem">›</button>
  </div>
</div>

<header class="ogs-header {% if template == 'home' %}ogs-header--transparent{% else %}ogs-header--solid{% endif %}" id="topo" data-header-smart="{% if template == 'home' %}true{% else %}false{% endif %}">
  <div class="ogs-header__inner">
    <input type="checkbox" id="ogs-nav-toggle" class="ogs-nav-toggle" hidden>
    <label for="ogs-nav-toggle" class="ogs-burger" aria-label="Abrir menu">
      <span></span><span></span><span></span>
    </label>
    <a href="{{ store.url }}" class="ogs-logo" aria-label="{{ store.name }}">
      <img src="{{ 'images/logo-light.svg' | static_url }}" class="ogs-logo__img ogs-logo__img--dark-bg" alt="{{ store.name }}">
      <img src="{{ 'images/logo-dark.svg' | static_url }}" class="ogs-logo__img ogs-logo__img--light-bg" alt="{{ store.name }}">
    </a>
    <nav class="ogs-nav" aria-label="Menu principal">
      <ul class="ogs-nav__list">
        <li class="ogs-nav__item">
          <a class="ogs-nav__link" href="/categoria/new-in">NEW IN</a>
        </li>
        <li class="ogs-nav__item">
          <a class="ogs-nav__link" href="/categoria/collections">COLLECTIONS</a>
        </li>
        <li class="ogs-nav__item ogs-nav__item--mega">
          <a class="ogs-nav__link" href="/produtos" aria-haspopup="true">SHOP</a>
          <div class="ogs-megamenu" role="region" aria-label="Menu Shop">
            <div class="ogs-megamenu__inner">
              <!-- Coluna ROTAS -->
              <div class="ogs-megamenu__col">
                <a class="ogs-megamenu__heading" href="/categoria/rotas">ROTAS</a>
                <ul class="ogs-megamenu__list">
                  <li><a href="/categoria/t-shirts">T-SHIRTS</a></li>
                  <li><a href="/categoria/moletons">MOLETONS</a></li>
                </ul>
              </div>
              <!-- Coluna ESSENTIALS -->
              <div class="ogs-megamenu__col">
                <a class="ogs-megamenu__heading" href="/categoria/essentials">ESSENTIALS</a>
                <ul class="ogs-megamenu__list">
                  <li><a href="/categoria/t-shirts-e-regatas">T-SHIRTS E REGATAS</a></li>
                  <li><a href="/categoria/jaquetas-e-moletons">JAQUETAS E MOLETONS</a></li>
                  <li><a href="/categoria/shorts-e-bermudas">SHORTS E BERMUDAS</a></li>
                  <li><a href="/categoria/calcas">CALÇAS</a></li>
                  <li><a href="/categoria/bones">BONÉS</a></li>
                  <li><a href="/categoria/acessorios">ACESSÓRIOS</a></li>
                </ul>
              </div>
              <!-- Coluna WOMAN -->
              <div class="ogs-megamenu__col">
                <a class="ogs-megamenu__heading" href="/categoria/woman">WOMAN</a>
                <ul class="ogs-megamenu__list">
                  <li class="ogs-megamenu__disabled"><span>EM BREVE...</span></li>
                </ul>
              </div>
              <!-- Coluna COLLAB -->
              <div class="ogs-megamenu__col">
                <a class="ogs-megamenu__heading" href="/categoria/collab">COLLAB</a>
                <ul class="ogs-megamenu__list">
                  <li class="ogs-megamenu__disabled"><span>EM BREVE...</span></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="ogs-nav__item">
          <a class="ogs-nav__link" href="/community">COMMUNITY</a>
        </li>

      </ul>
    </nav>
    <div class="ogs-header__actions">
      <form class="ogs-search" action="{{ store.search_url }}" method="get" role="search">
        <label class="ogs-search__label" for="ogs-search-input">Buscar</label>
        <input class="ogs-search__input" id="ogs-search-input" name="q" type="search" placeholder="Buscar produtos">
        <button class="ogs-search__btn" type="submit" aria-label="Buscar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
        </button>
      </form>
      <a class="ogs-iconbtn ogs-account" href="{{ store.customer_home_url }}" aria-label="Minha conta">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"></path></svg>
      </a>
      <button class="ogs-iconbtn ogs-themetoggle" type="button" id="ogs-theme-toggle" aria-label="Alternar tema">
        <svg class="ogs-themetoggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.5"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"></path></svg>
        <svg class="ogs-themetoggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"></path></svg>
      </button>
      <a class="ogs-iconbtn ogs-cart" href="{{ store.cart_url }}" aria-label="Carrinho">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16l-1.5 11H5.5L4 6Z"></path><path d="M9 6a3 3 0 0 1 6 0"></path></svg>
        <span class="ogs-cart__count" id="ogs-cart-count">{{ cart.items_count }}</span>
      </a>
    </div>
  </div>
  <div class="ogs-mobilemenu">
    <ul class="ogs-mobilemenu__list">
      {% for item in navigation %}
        <li><a href="{{ item.url }}">{{ item.name }}</a></li>
      {% endfor %}
    </ul>
    <form class="ogs-mobilemenu__search" action="{{ store.search_url }}" method="get">
      <input name="q" type="search" placeholder="Buscar produtos">
      <button type="submit">Buscar</button>
    </form>
  </div>
</header>


