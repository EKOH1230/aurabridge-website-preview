const menuButton = document.querySelector('[data-menu-button]');
const siteNav = document.querySelector('[data-site-nav]');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    }
  });
}

const backToTop = document.querySelector('[data-back-to-top]');
if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.hidden = window.scrollY < 480;
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  backToTop.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}

const applyQuoteIntent = (form, product, intent) => {
  if (!form) return;
  if (product && form.elements.product) form.elements.product.value = product;
  if (intent === 'sample' && form.elements.message && !form.elements.message.value.trim()) {
    form.elements.message.value = 'I would like to request a sample.';
  }
};

document.querySelectorAll('[data-quote-open]').forEach((link) => {
  link.addEventListener('click', () => {
    applyQuoteIntent(
      document.querySelector('[data-quote-form]'),
      link.dataset.product || '',
      link.dataset.quoteIntent || ''
    );
  });
});

const quoteForm = document.querySelector('[data-quote-form]');
if (quoteForm) {
  const quoteIntent = new URLSearchParams(window.location.search).get('intent');
  if (quoteIntent) applyQuoteIntent(quoteForm, document.body.dataset.product || '', quoteIntent);
  const quoteFields = ['name', 'email', 'product', 'message'].map((name) => quoteForm.elements[name]);

  const setQuoteError = (field, message) => {
    const error = quoteForm.querySelector(`[data-error-for="${field.name}"]`);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (error) error.textContent = message;
  };

  const quoteEmailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  quoteForm.addEventListener('input', (event) => {
    const field = event.target;
    if (field instanceof HTMLElement && field.getAttribute('aria-invalid') === 'true') setQuoteError(field, '');
  });

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = quoteForm.elements.name.value.trim();
    const email = quoteForm.elements.email.value.trim();
    const company = quoteForm.elements.company.value.trim();
    const product = quoteForm.elements.product.value;
    const message = quoteForm.elements.message.value.trim();
    let valid = true;

    if (!name) { setQuoteError(quoteForm.elements.name, 'Enter your name.'); valid = false; }
    else setQuoteError(quoteForm.elements.name, '');

    if (!email) { setQuoteError(quoteForm.elements.email, 'Enter your email address.'); valid = false; }
    else if (!quoteEmailOk(email)) { setQuoteError(quoteForm.elements.email, 'Enter a valid email address.'); valid = false; }
    else setQuoteError(quoteForm.elements.email, '');

    if (!product) { setQuoteError(quoteForm.elements.product, 'Choose a product.'); valid = false; }
    else setQuoteError(quoteForm.elements.product, '');

    if (!message) { setQuoteError(quoteForm.elements.message, 'Enter a message.'); valid = false; }
    else setQuoteError(quoteForm.elements.message, '');

    if (!valid) {
      quoteFields.find((field) => field.getAttribute('aria-invalid') === 'true')?.focus();
      return;
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || '—'}`,
      `Product of interest: ${product}`,
      '',
      message
    ];
    const href = `mailto:ohashi@brightbridgegroup.com?cc=${encodeURIComponent('ikkei@brightbridgegroup.com')}&subject=${encodeURIComponent(`Quote request - ${product}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    if (typeof window.openQuoteMail === 'function') window.openQuoteMail(href);
    else window.location.href = href;
  });
}

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const main = gallery.querySelector('[data-gallery-main]');
  const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
  if (!main || !thumbs.length) return;

  const show = (index) => {
    const button = thumbs[(index % thumbs.length + thumbs.length) % thumbs.length];
    main.src = button.dataset.src;
    main.alt = button.dataset.alt || '';
    if (button.dataset.srcset) main.srcset = button.dataset.srcset;
    else main.removeAttribute('srcset');
    thumbs.forEach((item) => item.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
  };

  thumbs.forEach((button, index) => {
    button.addEventListener('click', () => show(index));
  });

  const prev = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  if (thumbs.length < 2) {
    prev?.setAttribute('hidden', '');
    next?.setAttribute('hidden', '');
    return;
  }

  const currentIndex = () => {
    const index = thumbs.findIndex((item) => item.getAttribute('aria-pressed') === 'true');
    return index < 0 ? 0 : index;
  };

  prev?.addEventListener('click', () => show(currentIndex() - 1));
  next?.addEventListener('click', () => show(currentIndex() + 1));

  gallery.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(currentIndex() + (event.key === 'ArrowRight' ? 1 : -1));
  });

  const stage = gallery.querySelector('.detail-gallery__stage');
  if (!stage) return;
  stage.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    stage.focus({ preventScroll: true });
  });

  let startX = 0;
  let startY = 0;
  let tracking = false;
  stage.addEventListener('touchstart', (event) => {
    if (event.target.closest('button')) {
      tracking = false;
      return;
    }
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    tracking = true;
  }, { passive: true });
  stage.addEventListener('touchend', (event) => {
    if (!tracking) return;
    tracking = false;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    show(currentIndex() + (dx < 0 ? 1 : -1));
  }, { passive: true });
});
