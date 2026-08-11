{# Página de Produto #}
<section class="ogs-product-page" id="single-product">
  <div class="ogs-product-detail">
    
    {# Galeria de Imagens #}
    <div class="ogs-product-gallery">
      {% for image in product.images %}
        <div class="ogs-product-gallery__item">
          {{ image | product_image_url('huge') | img_tag(product.name) }}
        </div>
      {% endfor %}
    </div>
    
    {# Informações do Produto #}
    <div class="ogs-product-summary">
      <p class="ogs-hero__eyebrow">OGS WORLD</p>
      <h1 class="ogs-category-title">{{ product.name }}</h1>
      
      {% if product.display_price %}
        <div class="ogs-product-detail__price">
          {% if product.compare_at_price > product.price %}
            <span class="ogs-product__price-old">{{ product.compare_at_price | money }}</span>
          {% endif %}
          <strong>{{ product.price | money }}</strong>
        </div>
      {% endif %}
      
      {% if not store.is_catalog %}
        <form id="product_form" class="js-product-form ogs-product-form" method="post" action="{{ store.cart_url }}">
          <input type="hidden" name="add_to_cart" value="{{ product.id }}">
          
          {% if product.variations %}
            <div class="ogs-variants">
              {% for variation in product.variations %}
                <label>
                  {{ variation.name }}
                  <select name="variation[{{ variation.id }}]">
                    {% for option in variation.options %}
                      <option value="{{ option.id }}">{{ option.name }}</option>
                    {% endfor %}
                  </select>
                </label>
              {% endfor %}
            </div>
          {% endif %}
          
          <label class="ogs-qty">
            Quantidade
            <input type="number" name="quantity" min="1" value="1">
          </label>
          
          <input type="submit" class="ogs-btn ogs-btn--primary js-addtocart js-prod-submit-form" value="{% if product.available %}Adicionar ao carrinho{% else %}Sem estoque{% endif %}"{% if not product.available %} disabled{% endif %}>
        </form>
      {% endif %}
      
      {% if product.description %}
        <div class="ogs-product-description">
          {{ product.description }}
        </div>
      {% endif %}
      
    </div>
  </div>
</section>
