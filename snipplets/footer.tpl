<footer class="ogs-footer" id="contato">
  <div class="ogs-footer__newsletter">
    <div class="ogs-footer__newsletter-inner">
      <div class="ogs-footer__newsletter-text">
        <h2 class="ogs-footer__newsletter-title">FIQUE POR DENTRO</h2>
        <p>Novidades, drops exclusivos e ofertas direto no seu e-mail.</p>
      </div>
      {% if store.newsletter_url %}
      <form class="ogs-footer__newsletter-form" action="{{ store.newsletter_url }}" method="post">
        <input class="ogs-footer__newsletter-input" type="email" name="email" placeholder="Seu e-mail" required aria-label="Endereço de e-mail">
        <button class="ogs-footer__newsletter-btn ogs-btn ogs-btn--primary" type="submit">CADASTRAR</button>
      </form>
      {% endif %}
    </div>
  </div>

  <div class="ogs-footer__inner">
    <div class="ogs-footer__col ogs-footer__col--brand">
      <img src="{{ 'images/logo-light.svg' | static_url }}" class="ogs-footer__logo" alt="{{ store.name }}">
      <p class="ogs-footer__slogan">NOVOS CAMINHOS, NEW MOVES</p>
    </div>
    
    <div class="ogs-footer__col">
      <h3 class="ogs-footer__heading">INSTITUCIONAL</h3>
      <ul class="ogs-footer__links">
        {% for page in pages %}
          <li><a href="{{ page.url }}">{{ page.name }}</a></li>
        {% endfor %}
      </ul>
    </div>
    
    <div class="ogs-footer__col">
      <h3 class="ogs-footer__heading">SUPORTE</h3>
      <ul class="ogs-footer__links">
        {% for item in navigation %}
          <li><a href="{{ item.url }}">{{ item.name }}</a></li>
        {% endfor %}
      </ul>
    </div>
  </div>

  <div class="ogs-footer__bottom">
    <span>© {{ 'now' | date('Y') }} {{ store.name }}</span>
    <span>{{ powered_by_link }}</span>
  </div>
</footer>
