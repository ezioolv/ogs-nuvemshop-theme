{# Página de Produto #}
<section class="ogs-product-page" id="single-product">
  <div class="ogs-product-detail">
    
    {# Galeria de Imagens em Grid Vertical de 2 colunas #}
    <div class="ogs-product-gallery">
      {% for image in product.images %}
        <div class="ogs-product-gallery__item" data-image-index="{{ loop.index0 }}">
          {{ image | product_image_url('huge') | img_tag(product.name, {class: 'ogs-product-gallery__img'}) }}
        </div>
      {% endfor %}
    </div>
    
    {# Informações do Produto (Painel Sticky) #}
    <div class="ogs-product-summary">
      {% if product.sku %}
        <p class="ogs-product-sku">SKU: {{ product.sku }}</p>
      {% endif %}
      
      <div class="ogs-product-title-row">
        <h1 class="ogs-product-title">{{ product.name }}</h1>
        <button class="ogs-wishlist-btn" type="button" aria-label="Adicionar aos favoritos">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>
      
      {% if product.display_price %}
        <div class="ogs-product-detail__price">
          <strong class="ogs-product-detail__price-current">{{ product.price | money }}</strong>
          {% if product.compare_at_price > product.price %}
            <span class="ogs-product-detail__price-old">{{ product.compare_at_price | money }}</span>
          {% endif %}
          <p class="ogs-product-detail__installments">ou <strong>10x</strong> de {{ (product.price / 10) | money }} sem juros</p>
        </div>
      {% endif %}
      
      {% if not store.is_catalog %}
        <form id="product_form" class="js-product-form ogs-product-form" method="post" action="{{ store.cart_url }}">
          <input type="hidden" name="add_to_cart" value="{{ product.id }}">
          
          {% if product.variations %}
            <div class="ogs-variants-custom">
              {% for variation in product.variations %}
                <div class="ogs-variant-group">
                  <span class="ogs-variant-label">{{ variation.name }}</span>
                  <div class="ogs-variant-options">
                    {% for option in variation.options %}
                      <button type="button" class="ogs-variant-btn{% if loop.first %} active{% endif %}" data-option-id="{{ option.id }}">
                        {{ option.name }}
                      </button>
                    {% endfor %}
                  </div>
                  <select name="variation[{{ variation.id }}]" class="ogs-variant-select-hidden" style="display:none;">
                    {% for option in variation.options %}
                      <option value="{{ option.id }}"{% if loop.first %} selected{% endif %}>{{ option.name }}</option>
                    {% endfor %}
                  </select>
                </div>
              {% endfor %}
            </div>
          {% endif %}
          
          <input type="hidden" name="quantity" value="1">
          
          <button type="submit" class="ogs-btn ogs-btn--cart-submit js-addtocart js-prod-submit-form"{% if not product.available %} disabled{% endif %}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span class="js-addtocart-text">{% if product.available %}ADICIONAR AO CARRINHO{% else %}SEMESTOQUE{% endif %}</span>
          </button>
        </form>
      {% endif %}
      
      {# Bloco de Benefícios da PDP #}
      <div class="ogs-pdp-benefits">
        <div class="ogs-pdp-benefit-col">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <strong>PRIMEIRA TROCA GRÁTIS</strong>
          <a href="#" class="ogs-pdp-benefit-link">(SAIBA MAIS)</a>
        </div>
        <div class="ogs-pdp-benefit-col">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          <strong>FRETE GRÁTIS</strong>
          <span class="ogs-pdp-benefit-sub">ACIMA DE R$499</span>
        </div>
      </div>
      
      {# Accordion de Descrição #}
      {% if product.description %}
        <div class="ogs-accordion">
          <details class="ogs-accordion__item" open>
            <summary class="ogs-accordion__title">
              <span>DESCRIÇÃO DO PRODUTO</span>
              <span class="ogs-accordion__icon">−</span>
            </summary>
            <div class="ogs-accordion__content">
              {{ product.description }}
            </div>
          </details>
        </div>
      {% endif %}
      
    </div>
  </div>

  {# Seção de Produtos Relacionados #}
  <div class="ogs-related-products">
    <div class="ogs-section__head">
      <h2 class="ogs-section__title">PRODUTOS RELACIONADOS</h2>
    </div>
    <div class="ogs-grid-wrap">
      <ul class="ogs-grid ogs-grid--borderless">
        {% set related_products = sections.primary.products %}
        {% for product in related_products | slice(0, 4) %}
          {% include 'snipplets/product-card.tpl' %}
        {% endfor %}
      </ul>
    </div>
  </div>
</section>

{# Lightbox Fullscreen JS & Event Handlers #}
<div id="ogs-lightbox" class="ogs-lightbox" aria-hidden="true">
  <button class="ogs-lightbox__close" aria-label="Fechar">&times;</button>
  <div class="ogs-lightbox__content">
    <img id="ogs-lightbox-img" src="" alt="Imagem ampliada do produto">
  </div>
  <div id="ogs-lightbox-counter" class="ogs-lightbox__counter">1 / 1</div>
</div>

