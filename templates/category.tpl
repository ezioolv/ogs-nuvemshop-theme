<section class="ogs-category-page">
  <div class="ogs-category-header">
    <div class="ogs-category-title-wrap">
      <h1 class="ogs-category-title">{{ category.name }}</h1>
    </div>
    
    <div class="ogs-filter-bar">
      <div class="ogs-filter-bar__left">
        <!-- FILTERS_START -->
        {% if category.filters %}
          {% for filter in category.filters %}
            <div class="ogs-filter-dropdown-wrapper" style="position: relative; display: inline-block;">
              <button class="ogs-filter-btn js-filter-toggle" type="button">
                {{ filter.name | upper }} 
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div class="ogs-filter-dropdown js-filter-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: var(--ogs-bg); border: 1px solid var(--ogs-line); z-index: 100; min-width: 150px; padding: 10px;">
                <ul class="ogs-filter-list" style="list-style: none; margin: 0; padding: 0;">
                  {% for value in filter.values %}
                    <li style="margin-bottom: 6px;">
                      <a href="{{ value.selected ? value.url_to_remove : value.url_to_add }}"
                         class="ogs-filter-link{% if value.selected %} ogs-filter-link--active{% endif %}">
                        {{ value.name }} ({{ value.products_count }})
                      </a>
                    </li>
                  {% endfor %}
                </ul>
              </div>
            </div>
          {% endfor %}
        {% else %}
          <!-- MOCK FALLBACK (Caso a API não retorne category.filters ou seja teste local) -->
          <div class="ogs-filter-dropdown-wrapper" style="position: relative; display: inline-block;">
            <button class="ogs-filter-btn js-filter-toggle" type="button">CATEGORIA <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <div class="ogs-filter-dropdown js-filter-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: var(--ogs-bg); border: 1px solid var(--ogs-line); z-index: 100; min-width: 150px; padding: 10px;">
              <ul class="ogs-filter-list" style="list-style: none; margin: 0; padding: 0;">
                <li style="margin-bottom: 6px;"><a href="?categoria=camisetas" class="ogs-filter-link" style="text-decoration: none; color: var(--ogs-muted);">Camisetas (12)</a></li>
                <li style="margin-bottom: 6px;"><a href="?categoria=moletons" class="ogs-filter-link" style="text-decoration: none; color: var(--ogs-muted);">Moletons (8)</a></li>
              </ul>
            </div>
          </div>
          <div class="ogs-filter-dropdown-wrapper" style="position: relative; display: inline-block; margin-left: 12px;">
            <button class="ogs-filter-btn js-filter-toggle" type="button">TAMANHO <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <div class="ogs-filter-dropdown js-filter-dropdown" style="display: none; position: absolute; top: 100%; left: 0; background: var(--ogs-bg); border: 1px solid var(--ogs-line); z-index: 100; min-width: 150px; padding: 10px;">
              <ul class="ogs-filter-list" style="list-style: none; margin: 0; padding: 0;">
                <li style="margin-bottom: 6px;"><a href="?tamanho=p" class="ogs-filter-link" style="text-decoration: none; color: var(--ogs-muted);">P (5)</a></li>
                <li style="margin-bottom: 6px;"><a href="?tamanho=m" class="ogs-filter-link" style="text-decoration: none; color: var(--ogs-muted);">M (9)</a></li>
                <li style="margin-bottom: 6px;"><a href="?tamanho=g" class="ogs-filter-link" style="text-decoration: none; color: var(--ogs-muted);">G (2)</a></li>
              </ul>
            </div>
          </div>
        {% endif %}
        <!-- FILTERS_END -->
      </div>
      <div class="ogs-filter-bar__right">
        <span class="ogs-filter-count">
          {% if category.products_count %}
            {{ category.products_count }}
          {% else %}
            0
          {% endif %}
          ITENS
        </span>
        <button class="ogs-filter-btn" type="button">CLASSIFICAR <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="ogs-filter-views">
          <button class="ogs-view-btn active" aria-label="Grid 2x2" type="button">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect width="6" height="6"/><rect x="8" width="6" height="6"/><rect y="8" width="6" height="6"/><rect x="8" y="8" width="6" height="6"/></svg>
          </button>
          <button class="ogs-view-btn" aria-label="Compact Grid" type="button">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect width="3" height="3"/><rect x="5" width="3" height="3"/><rect x="10" width="3" height="3"/><rect y="5" width="3" height="3"/><rect x="5" y="5" width="3" height="3"/><rect x="10" y="5" width="3" height="3"/><rect y="10" width="3" height="3"/><rect x="5" y="10" width="3" height="3"/><rect x="10" y="10" width="3" height="3"/></svg>
          </button>
        </div>
      </div>
    </div>
    
  </div>

  {% if products %}
    <div class="ogs-grid-wrap">
      <ul class="ogs-grid ogs-grid--borderless">
        {% for product in products %}
          {% include 'snipplets/product-card.tpl' %}
        {% endfor %}
      </ul>
    </div>
    {% include 'snipplets/pagination.tpl' %}
  {% else %}
    <div class="ogs-empty-state">
      <p>Nenhum produto cadastrado nesta categoria no momento.</p>
      <a href="{{ store.products_url }}" class="ogs-btn ogs-btn--outline">Ver todas as peças</a>
    </div>
  {% endif %}
</section>
