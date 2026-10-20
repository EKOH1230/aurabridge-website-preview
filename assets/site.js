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

const quoteForm = document.querySelector('[data-quote-form]');
if (quoteForm) {
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
  const thumbs = gallery.querySelectorAll('[data-gallery-thumb]');
  if (!main || !thumbs.length) return;

  thumbs.forEach((button) => {
    button.addEventListener('click', () => {
      main.src = button.dataset.src;
      main.alt = button.dataset.alt;
      thumbs.forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
    });
  });
});
