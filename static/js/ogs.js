(function () {
  'use strict';

  /* =============================================
     1. TEMA CLARO / ESCURO (toggle + persistência)
     ============================================= */
  var html = document.documentElement;
  var toggleBtn = document.getElementById('ogs-theme-toggle');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem('ogs-theme', theme); } catch (e) {}
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      setTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  }

  /* =============================================
     2. SMART STICKY HEADER (Estilo The Saint)
     Lógica:
     - No banner inicial (scrollY <= heroHeight) → absoluto (não acompanha a página, transparente)
     - Fora do banner inicial (scrollY > heroHeight):
       - Rolando para baixo → oculto (--hidden)
       - Rolando para cima → fixado no topo (--fixed)
     ============================================= */
  var header = document.querySelector('.ogs-header[data-header-smart="true"]');
  var hero = document.getElementById('ogs-hero');

  if (header && hero) {
    var lastScrollY = window.scrollY;
    var heroHeight = 0;
    var ticking = false;
    var SCROLL_TOLERANCE = 5; // tolerância em pixels

    function updateHeroHeight() {
      heroHeight = hero.offsetHeight;
    }
    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight, { passive: true });

    function applyHeaderState() {
      var currentY = window.scrollY;
      var delta = currentY - lastScrollY;

      if (currentY <= heroHeight) {
        // Dentro do banner inicial: absoluto, transparente, move junto com a página
        header.classList.remove('ogs-header--fixed', 'ogs-header--hidden');
      } else {
        // Passou do banner inicial: comportamento fixo inteligente
        header.classList.add('ogs-header--fixed');

        if (delta > SCROLL_TOLERANCE) {
          // Rolando para baixo → Esconde
          header.classList.add('ogs-header--hidden');
        } else if (delta < -SCROLL_TOLERANCE) {
          // Rolando para cima → Mostra fixado sólido
          header.classList.remove('ogs-header--hidden');
        }
      }

      lastScrollY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(applyHeaderState);
        ticking = true;
      }
    }, { passive: true });

    // Estado inicial
    applyHeaderState();
  }

  /* =============================================
     2.1 HERO BANNER SLIDER (8s Timer + Setas + Dots)
     ============================================= */
  var slides = document.querySelectorAll('.ogs-hero__slide');
  var prevBtn = document.getElementById('ogs-hero-prev');
  var nextBtn = document.getElementById('ogs-hero-next');
  var dotsContainer = document.getElementById('ogs-hero-dots');

  if (slides.length > 0) {
    var currentSlide = 0;
    var slideInterval = null;
    var TIMER_MS = 15000; // 15 segundos

    function goToSlide(n) {
      slides[currentSlide].classList.remove('ogs-hero__slide--active');
      var oldVideo = slides[currentSlide].querySelector('video');
      if (oldVideo) { try { oldVideo.pause(); } catch (e) {} }

      if (dotsContainer) {
        var activeDot = dotsContainer.querySelector('.ogs-hero__dot--active');
        if (activeDot) activeDot.classList.remove('ogs-hero__dot--active');
      }

      currentSlide = (n + slides.length) % slides.length;

      slides[currentSlide].classList.add('ogs-hero__slide--active');
      var newVideo = slides[currentSlide].querySelector('video');
      if (newVideo) {
        try {
          newVideo.currentTime = 0;
          newVideo.play();
        } catch (e) {}
      }

      if (dotsContainer) {
        var newActiveDot = dotsContainer.querySelector('[data-slide="' + currentSlide + '"]');
        if (newActiveDot) newActiveDot.classList.add('ogs-hero__dot--active');
      }
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      slideInterval = setInterval(nextSlide, TIMER_MS);
    }

    function stopAutoplay() {
      if (slideInterval) clearInterval(slideInterval);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        startAutoplay();
      });
    }

    if (dotsContainer) {
      dotsContainer.addEventListener('click', function (e) {
        var dot = e.target.closest('.ogs-hero__dot');
        if (dot) {
          var index = parseInt(dot.getAttribute('data-slide'), 10);
          if (!isNaN(index)) {
            goToSlide(index);
            startAutoplay();
          }
        }
      });
    }

    // Inicia a rotação de 8s
    startAutoplay();
  }



  /* =============================================
     3. FECHAR MENU MOBILE AO CLICAR EM LINK
     ============================================= */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.ogs-mobilemenu a')) {
      var toggle = document.getElementById('ogs-nav-toggle');
      if (toggle) toggle.checked = false;
    }
  });

  /* =============================================
     4. ANIMAÇÕES DE REVEAL (Intersection Observer)
     Elementos com data-reveal="up" | "hero" etc.
     entram com fade + slide ao ficarem visíveis
     ============================================= */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ogs-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px'
    });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: mostrar tudo sem animação
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('ogs-revealed');
    });
  }

  /* =============================================
     5. BUMP ANIMADO NO CARRINHO
     Adiciona classe de animação ao badge do
     carrinho ao clicar em "Ver produto" / "Comprar"
     ============================================= */
  var cartCount = document.getElementById('ogs-cart-count');

  function bumpCart() {
    if (!cartCount) return;
    cartCount.classList.remove('ogs-cart__count--bump');
    // Force reflow
    void cartCount.offsetWidth;
    cartCount.classList.add('ogs-cart__count--bump');
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.js-addtocart') || e.target.closest('.ogs-btn--buy') || e.target.closest('.ogs-product__quick-buy')) {
      bumpCart();
    }
  });

  /* =============================================
     6. TOPBAR — rotação de mensagens
     ============================================= */
  var topbar = document.getElementById('ogs-topbar');
  if (topbar) {
    var messages = [
      'FRETE GRÁTIS ACIMA DE R$ 299 • ATÉ 6X SEM JUROS • OGS WORLD',
      'PIX COM 5% DE DESCONTO • PAGAMENTO SEGURO',
      'TROCA FÁCIL • ENVIO PARA TODO O BRASIL'
    ];
    var currentMsg = 0;
    var textEl = topbar.querySelector('.ogs-topbar__text');
    var prevBtn = topbar.querySelector('.ogs-topbar__arrow--prev');
    var nextBtn = topbar.querySelector('.ogs-topbar__arrow--next');

    function showMessage(idx) {
      if (!textEl) return;
      currentMsg = (idx + messages.length) % messages.length;
      textEl.style.opacity = '0';
      setTimeout(function () {
        textEl.textContent = messages[currentMsg];
        textEl.style.opacity = '1';
      }, 200);
    }

    if (textEl) {
      textEl.style.transition = 'opacity 200ms ease';
      if (prevBtn) prevBtn.addEventListener('click', function () { showMessage(currentMsg - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { showMessage(currentMsg + 1); });
      // Auto-rotate a cada 5s
      setInterval(function () { showMessage(currentMsg + 1); }, 5000);
    }
  }

  /* =============================================
     SETA FLUTUANTE DO CARROSSEL DE PRODUTOS
     ============================================= */
  var carouselNextBtn = document.getElementById('ogs-carousel-next');
  var carouselPrevBtn = document.getElementById('ogs-carousel-prev');
  var grid = document.getElementById('ogs-product-grid');
  if (grid) {
    if (carouselNextBtn) {
      carouselNextBtn.addEventListener('click', function () {
        var itemWidth = grid.querySelector('.ogs-product') ? grid.querySelector('.ogs-product').offsetWidth : 300;
        grid.scrollBy({ left: itemWidth * 2, behavior: 'smooth' });
      });
    }
    if (carouselPrevBtn) {
      carouselPrevBtn.addEventListener('click', function () {
        var itemWidth = grid.querySelector('.ogs-product') ? grid.querySelector('.ogs-product').offsetWidth : 300;
        grid.scrollBy({ left: -(itemWidth * 2), behavior: 'smooth' });
      });
    }
  }

  /* =============================================
     PRODUCT CARD IMAGE NAV
     ============================================= */
  document.addEventListener('click', function(e) {
    var arrowPrev = e.target.closest('.ogs-product__arrow--prev');
    var arrowNext = e.target.closest('.ogs-product__arrow--next');
    if (arrowPrev || arrowNext) {
      e.preventDefault();
      var slider = (arrowPrev || arrowNext).parentElement.querySelector('.ogs-product__image-slider');
      if (slider) {
        var images = slider.querySelectorAll('.ogs-product__image');
        if (images.length > 1) {
          var activeIndex = -1;
          for (var i = 0; i < images.length; i++) {
            if (images[i].classList.contains('active')) {
              activeIndex = i;
              images[i].classList.remove('active');
              break;
            }
          }
          if (activeIndex === -1) activeIndex = 0;
          
          if (arrowNext) {
            activeIndex = (activeIndex + 1) % images.length;
          } else {
            activeIndex = (activeIndex - 1 + images.length) % images.length;
          }
          images[activeIndex].classList.add('active');
        }
      }
    }
  });

  /* =============================================
     PDP VARIATION BUTTONS & FORM INTEGRATION
     ============================================= */
  document.addEventListener('click', function (e) {
    var variantBtn = e.target.closest('.ogs-variant-btn');
    if (variantBtn) {
      e.preventDefault();
      var group = variantBtn.closest('.ogs-variant-group');
      if (group) {
        var siblings = group.querySelectorAll('.ogs-variant-btn');
        siblings.forEach(function (btn) { btn.classList.remove('active'); });
        variantBtn.classList.add('active');
        
        var optionId = variantBtn.getAttribute('data-option-id');
        var hiddenSelect = group.querySelector('.ogs-variant-select-hidden');
        if (hiddenSelect && optionId) {
          hiddenSelect.value = optionId;
          var changeEvent = new Event('change', { bubbles: true });
          hiddenSelect.dispatchEvent(changeEvent);
        }
      }
    }
  });

  /* =============================================
     PDP ADD TO CART FEEDBACK
     ============================================= */
  var pdpForm = document.getElementById('product_form');
  if (pdpForm) {
    pdpForm.addEventListener('submit', function () {
      var btnText = pdpForm.querySelector('.js-addtocart-text');
      if (btnText) {
        var originalText = btnText.textContent;
        btnText.textContent = 'ADICIONADO';
        setTimeout(function () {
          btnText.textContent = originalText;
        }, 2500);
      }
    });
  }

  /* =============================================
     PDP LIGHTBOX FULLSCREEN
     ============================================= */
  var galleryItems = document.querySelectorAll('.ogs-product-gallery__item');
  var lightbox = document.getElementById('ogs-lightbox');
  var lightboxImg = document.getElementById('ogs-lightbox-img');
  var lightboxCounter = document.getElementById('ogs-lightbox-counter');
  var lightboxClose = document.querySelector('.ogs-lightbox__close');

  if (galleryItems.length > 0 && lightbox && lightboxImg) {
    var totalImages = galleryItems.length;

    galleryItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          if (lightboxCounter) {
            lightboxCounter.textContent = (index + 1) + ' / ' + totalImages;
          }
          lightbox.setAttribute('aria-hidden', 'false');
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        lightbox.setAttribute('aria-hidden', 'true');
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }

})();

