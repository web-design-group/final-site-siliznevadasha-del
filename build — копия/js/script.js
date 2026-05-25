;(function () {
  var STORAGE_CART = 'flowers-static-cart'
  var STORAGE_FAV = 'flowers-static-favorites'

  var IMG = 'assets/images/all-products.png'  // картинка по умолчанию (если у товара нет своей)
  var ICON_NEW = 'assets/images/seedling.svg'
  var ICON_SALE = 'assets/images/award.svg'

  var PRODUCTS = [
    {
      id: 'mini-1',
      name: 'Минибукет',
      price: 1600,
      composition: 'Роза - 3 шт. (50 см.), Хризантема кустовая - 4 шт., Лилия Азиатика - 1 шт.',
      badge: 'new',
      img: 'assets/images/mini-1.jpg'
    },
    {
      id: 'nobilis-1',
      name: 'Нобилис',
      price: 99,
      composition: 'Декоративная зелень нобилис, упаковка, лента.',
      img: 'assets/images/nobilis.jpg'
    },
    {
      id: 'freedom-1',
      name: 'Роза Freedom 51 шт.',
      price: 5900,
      oldPrice: 6500,
      composition: 'Роза Freedom - 51 шт., упаковка премиум.',
      badge: 'sale',
      img: 'assets/images/freedom-rose.jpg'
    },
    {
      id: 'mini-2',
      name: 'Минибукет',
      price: 1200,
      composition: 'Роза кустовая, альстромерия, декоративная зелень.',
      img: 'assets/images/mini-2.jpg'
    },
    {
      id: 'mini-3',
      name: 'Минибукет',
      price: 1250,
      composition: 'Роза, диантус, хризантема, эвкалипт.',
      badge: 'new',
      img: 'assets/images/mini-3.jpg'
    },
    {
      id: 'pink-rose-1',
      name: 'Роза Пинк 51 шт.',
      price: 1500,
      oldPrice: 1750,
      composition: 'Роза Пинк - 51 шт., упаковка, атласная лента.',
      badge: 'sale',
      img: 'assets/images/pink-rose.jpg'
    },
    {
      id: 'mini-4',
      name: 'Минибукет',
      price: 1400,
      oldPrice: 1600,
      composition: 'Гербера, хризантема, зелень, дизайнерская упаковка.',
      badge: 'sale',
      img: 'assets/images/mini-4.jpg'
    },
    {
      id: 'mini-5',
      name: 'Минибукет',
      price: 1600,
      composition: 'Роза, эустома, маттиола, эвкалипт.',
      img: 'assets/images/mini-5.jpg'
    },
    {
      id: 'barhatny-sezon',
      name: 'Бархатный сезон',
      price: 1300,
      composition: 'Гвоздика - 7 шт., хризантема - 3 шт., эвкалипт, упаковка.',
      badge: 'new',
      img: 'assets/images/barhatny-sezon.jpg'
    },
    {
      id: 'first-kiss',
      name: 'Первый поцелуй',
      price: 1436,
      oldPrice: 1600,
      composition: 'Гербера - 5 шт., хризантема - 3 шт., статица, зелень.',
      img: 'assets/images/first-kiss.jpg'
    },
    {
      id: 'esmira',
      name: 'Эсмирда',
      price: 1500,
      oldPrice: 1800,
      composition: 'Гербера микс, хризантема кустовая, декоративная зелень.',
      badge: 'sale',
      img: 'assets/images/esmira.jpg'
    },
    {
      id: 'mini-8',
      name: 'Минибукет',
      price: 1600,
      oldPrice: 1700,
      composition: 'Гербера, роза, альстромерия, зелень.',
      badge: 'sale',
      img: 'assets/images/mini-8.jpg'
    }
  ]

  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_CART)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  }

  function setCart(items) {
    localStorage.setItem(STORAGE_CART, JSON.stringify(items))
  }

  function getFavorites() {
    try {
      var raw = localStorage.getItem(STORAGE_FAV)
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  }

  function setFavorites(ids) {
    localStorage.setItem(STORAGE_FAV, JSON.stringify(ids))
  }

  function findProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i]
    }
    return null
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('ru-RU').format(value) + ' \u20bd'
  }

  function cartTotalQty(items) {
    var t = 0
    for (var i = 0; i < items.length; i++) t += items[i].quantity
    return t
  }

  function updateHeaderCounters() {
    var cart = getCart()
    var favs = getFavorites()
    var cq = document.getElementById('header-cart-count')
    var fq = document.getElementById('header-fav-count')
    var total = cartTotalQty(cart)
    if (cq) {
      cq.textContent = String(total)
      cq.hidden = total === 0
    }
    if (fq) {
      fq.textContent = String(favs.length)
      fq.hidden = favs.length === 0
    }
  }

  function toggleFavorite(productId) {
    var favs = getFavorites()
    var idx = favs.indexOf(productId)
    if (idx >= 0) favs.splice(idx, 1)
    else favs.push(productId)
    setFavorites(favs)
    updateHeaderCounters()
  }

  function isFavorite(productId) {
    return getFavorites().indexOf(productId) >= 0
  }

  function addToCart(productId, qty) {
    qty = qty || 1
    var cart = getCart()
    var found = false
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId) {
        cart[i].quantity += qty
        found = true
        break
      }
    }
    if (!found) cart.push({ productId: productId, quantity: qty })
    setCart(cart)
    updateHeaderCounters()
  }

  function setLineQty(productId, quantity) {
    var cart = getCart()
    var next = []
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId) {
        if (quantity > 0) next.push({ productId: productId, quantity: quantity })
      } else next.push(cart[i])
    }
    setCart(next)
    updateHeaderCounters()
  }

  function removeLine(productId) {
    setLineQty(productId, 0)
  }

  function clearCart() {
    setCart([])
    updateHeaderCounters()
  }

  function heartSvg() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.7 4.55 13.9a4.94 4.94 0 0 1-.4-6.97 4.89 4.89 0 0 1 7.03-.31L12 7.43l.82-.81a4.89 4.89 0 0 1 7.03.31 4.94 4.94 0 0 1-.4 6.97L12 20.7Z"/></svg>'
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  // ★★★ ГЛАВНОЕ ИЗМЕНЕНИЕ — функция рендера карточки с ПОДДЕРЖКОЙ СВОИХ КАРТИНОК ★★★
  function renderProductCard(p, options) {
    options = options || {}
    var showActions = options.showActions !== false
    var favOn = isFavorite(p.id)
    var favClass = favOn ? ' is-active' : ''
    var articleClass = 'product-card' + (favOn ? ' is-favorite' : '')
    var badgeHtml = ''
    if (p.badge === 'new') {
      badgeHtml = '<span class="product-card__badge product-card__badge--new"><img src="' + ICON_NEW + '" alt="" class="product-card__badge-icon" aria-hidden="true">Новинка</span>'
    } else if (p.badge === 'sale') {
      badgeHtml = '<span class="product-card__badge product-card__badge--sale"><img src="' + ICON_SALE + '" alt="" class="product-card__badge-icon" aria-hidden="true">Акция</span>'
    }
    var oldHtml = p.oldPrice ? '<p class="product-card__old-price">' + formatPrice(p.oldPrice) + '</p>' : ''
    var detailsHtml = showActions ? '<div class="product-card__details"><p>' + escapeHtml(p.composition) + '</p><div class="product-card__actions" data-product-id="' + p.id + '"><div class="product-card__qty"><button type="button" data-qty="-1" aria-label="Уменьшить количество">-</button><span class="product-card__qty-val">1</span><button type="button" data-qty="1" aria-label="Увеличить количество">+</button></div><button type="button" class="product-card__add-button" data-add>В корзину</button></div></div>' : ''
    
    // ★★★ ЗДЕСЬ ИСПОЛЬЗУЕТСЯ КАРТИНКА ИЗ ТОВАРА (p.img) ★★★
    var productImage = p.img || IMG
    
    return (
      '<article class="' + articleClass + '" data-id="' + p.id + '">' +
      '<button type="button" class="product-card__favorite' + favClass + '" data-fav aria-label="Избранное">' + heartSvg() + '</button>' +
      '<div class="product-card__image-wrapper">' +
      '<img class="product-card__image" src="' + productImage + '" alt="' + escapeHtml(p.name) + '">' +
      badgeHtml +
      '</div>' +
      '<div class="product-card__price-row">' +
      '<p class="product-card__price">' + formatPrice(p.price) + '</p>' + oldHtml +
      '</div>' +
      '<h3 class="product-card__title">' + escapeHtml(p.name) + '</h3>' +
      detailsHtml +
      '</article>'
    )
  }

  function delegateProductCardClicks(root) {
    if (!root) return
    root.onclick = function (e) {
      var card = e.target.closest('.product-card')
      if (!card || !root.contains(card)) return
      var id = card.getAttribute('data-id')
      if (e.target.closest('[data-fav]')) {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(id)
        var on = isFavorite(id)
        var btn = card.querySelector('.product-card__favorite')
        if (btn) btn.classList.toggle('is-active', on)
        card.classList.toggle('is-favorite', on)
        if (document.body.getAttribute('data-page') === 'favorites') {
          renderFavorites()
        }
        return
      }
      if (e.target.closest('[data-add]')) {
        e.preventDefault()
        var valEl = card.querySelector('.product-card__qty-val')
        var q = valEl ? parseInt(valEl.textContent, 10) || 1 : 1
        addToCart(id, q)
        return
      }
      var qtyBtn = e.target.closest('[data-qty]')
      if (qtyBtn && card.querySelector('.product-card__qty-val')) {
        e.preventDefault()
        var delta = parseInt(qtyBtn.getAttribute('data-qty'), 10)
        var el = card.querySelector('.product-card__qty-val')
        var n = parseInt(el.textContent, 10) || 1
        n = Math.max(1, n + delta)
        el.textContent = String(n)
      }
    }
  }

  function initSlider() {
    var track = document.querySelector('.home-slider__track')
    var dots = document.querySelectorAll('.home-slider__dot')
    if (!track || !dots.length) return
    var slides = track.querySelectorAll('.home-slider__slide')
    var n = slides.length
    var i = 0
    function go(to) {
      i = ((to % n) + n) % n
      track.style.transform = 'translateX(-' + i * 100 + '%)'
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle('is-active', d === i)
      }
    }
    setInterval(function () {
      go(i + 1)
    }, 5000)
    for (var d = 0; d < dots.length; d++) {
      ;(function (idx) {
        dots[idx].addEventListener('click', function () {
          go(idx)
        })
      })(d)
    }
  }

  function renderHomeSections() {
    var mount = document.getElementById('catalog-sections')
    if (!mount) return
    var sections = [
      { title: 'Сезонное предложение', items: PRODUCTS.slice(0, 6) },
      { title: 'Хит продаж', items: PRODUCTS.slice(6, 12) },
      { title: 'Со скидкой', items: PRODUCTS.filter(function (p) { return p.badge === 'sale' }).slice(0, 6) },
      { title: 'Розы', items: PRODUCTS.filter(function (p) { return p.name.indexOf('Роза') >= 0 }).slice(0, 6) }
    ]
    var html = ''
    for (var s = 0; s < sections.length; s++) {
      var sec = sections[s]
      html += '<section class="home-section">'
      html += '<h2>' + escapeHtml(sec.title) + '</h2>'
      html += '<div class="product-grid">'
      for (var j = 0; j < sec.items.length; j++) {
        html += renderProductCard(sec.items[j])
      }
      html += '</div>'
      html += '<button type="button" class="btn-show-all">Смотреть все</button>'
      html += '</section>'
    }
    mount.innerHTML = html
    delegateProductCardClicks(mount)
  }

  function renderCart() {
    var listEl = document.getElementById('cart-lines')
    var totalEl = document.getElementById('cart-total-sum')
    var emptyEl = document.getElementById('cart-empty')
    var panelEl = document.querySelector('.cart-panel')
    if (!listEl) return
    var cart = getCart()
    if (!cart.length) {
      listEl.innerHTML = ''
      if (emptyEl) emptyEl.hidden = false
      if (panelEl) panelEl.hidden = true
      if (totalEl) totalEl.textContent = formatPrice(0)
      return
    }
    if (emptyEl) emptyEl.hidden = true
    if (panelEl) panelEl.hidden = false
    var html = ''
    var sum = 0
    for (var i = 0; i < cart.length; i++) {
      var line = cart[i]
      var p = findProduct(line.productId)
      if (!p) continue
      var lineTotal = p.price * line.quantity
      sum += lineTotal
      var oldLine = p.oldPrice != null ? '<p class="cart-line__old">' + formatPrice(p.oldPrice * line.quantity) + '</p>' : ''
      html += '<div class="cart-line" data-id="' + p.id + '">' +
        '<img src="' + (p.img || IMG) + '" alt="">' +
        '<div class="cart-line__info"><h2>' + escapeHtml(p.name) + '</h2><p class="cart-line__composition">' + escapeHtml(p.composition) + '</p></div>' +
        '<div class="cart-line__right">' +
        '<p class="cart-line__price">' + formatPrice(lineTotal) + '</p>' + oldLine +
        '<div class="cart-line__qty">' +
        '<button type="button" data-dec>-</button>' +
        '<span>' + line.quantity + '</span>' +
        '<button type="button" data-inc>+</button>' +
        '</div></div>' +
        '<button type="button" class="cart-line__remove" data-remove>&times;</button>' +
        '</div>'
    }
    listEl.innerHTML = html
    if (totalEl) totalEl.textContent = formatPrice(sum)

    listEl.onclick = function (e) {
      var line = e.target.closest('.cart-line')
      if (!line) return
      var id = line.getAttribute('data-id')
      if (e.target.closest('[data-remove]')) {
        removeLine(id)
        renderCart()
        renderRecommendations()
        return
      }
      if (e.target.closest('[data-dec]')) {
        var cart2 = getCart()
        for (var k = 0; k < cart2.length; k++) {
          if (cart2[k].productId === id) {
            setLineQty(id, cart2[k].quantity - 1)
            break
          }
        }
        renderCart()
        updateHeaderCounters()
        return
      }
      if (e.target.closest('[data-inc]')) {
        var cart3 = getCart()
        for (var m = 0; m < cart3.length; m++) {
          if (cart3[m].productId === id) {
            setLineQty(id, cart3[m].quantity + 1)
            break
          }
        }
        renderCart()
        updateHeaderCounters()
      }
    }

    var clearBtn = document.getElementById('cart-clear')
    if (clearBtn) {
      clearBtn.onclick = function () {
        clearCart()
        renderCart()
        renderRecommendations()
      }
    }
  }

  function renderRecommendations() {
    var grid = document.getElementById('recommend-grid')
    if (!grid) return
    var html = ''
    for (var i = 0; i < Math.min(4, PRODUCTS.length); i++) {
      html += renderProductCard(PRODUCTS[i], { showActions: false })
    }
    grid.innerHTML = html
    delegateProductCardClicks(grid)
  }

  function renderFavorites() {
    var mount = document.getElementById('favorites-grid')
    var empty = document.getElementById('favorites-empty')
    if (!mount) return
    var ids = getFavorites()
    if (!ids.length) {
      mount.innerHTML = ''
      if (empty) empty.hidden = false
      return
    }
    if (empty) empty.hidden = true
    var html = ''
    for (var i = 0; i < ids.length; i++) {
      var p = findProduct(ids[i])
      if (p) html += renderProductCard(p)
    }
    mount.innerHTML = '<div class="product-grid">' + html + '</div>'
    delegateProductCardClicks(mount)
  }

  function setActiveNav() {
    var page = document.body.getAttribute('data-page')
    var links = document.querySelectorAll('.header__routes a[data-nav]')
    for (var i = 0; i < links.length; i++) {
      var l = links[i]
      l.classList.toggle('active', l.getAttribute('data-nav') === page)
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateHeaderCounters()
    setActiveNav()
    var page = document.body.getAttribute('data-page')
    if (page === 'home') {
      initSlider()
      renderHomeSections()
    } else if (page === 'cart') {
      renderCart()
      renderRecommendations()
    } else if (page === 'favorites') {
      renderFavorites()
    }
  })
})()