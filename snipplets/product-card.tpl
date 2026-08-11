<li class="ogs-product" data-store="product-item-{{ product.id }}">
  <div class="ogs-product__img-wrap">
    {% if product.compare_at_price > product.price %}
      <div class="ogs-product__badge-sale">
        -{{ ((product.compare_at_price - product.price) / product.compare_at_price * 100) | round }}%
      </div>
    {% endif %}
    
    <a href="{{ product.url }}" class="ogs-product__img-link">
      {% if product.images and product.images | length > 1 %}
        <div class="ogs-product__image-slider">
          {% for image in product.images | slice(0, 4) %}
            {{ image | product_image_url('large') | img_tag(product.name, {class: 'ogs-product__image' ~ (loop.first ? ' active' : '')}) }}
          {% endfor %}
        </div>
        <button class="ogs-product__arrow ogs-product__arrow--prev" aria-label="Imagem anterior" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="ogs-product__arrow ogs-product__arrow--next" aria-label="Próxima imagem" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      {% elseif product.featured_image %}
        {{ product.featured_image | product_image_url('large') | img_tag(product.name, {class: 'ogs-product__image active'}) }}
      {% endif %}
    </a>
  </div>
  <div class="ogs-product__info">
    <h3 class="ogs-product__name"><a href="{{ product.url }}">{{ product.name }}</a></h3>
    {% if product.display_price %}
      <div class="ogs-product__pricing">
        {% if product.compare_at_price > product.price %}
          <span class="ogs-product__price-compare">{{ product.compare_at_price | money }}</span>
        {% endif %}
        <strong class="ogs-product__price-current">{{ product.price | money }}</strong>
        <p class="ogs-product__installments">ou <strong>10x de {{ (product.price / 10) | money }}</strong> sem juros</p>
      </div>
    {% endif %}
  </div>
</li>

