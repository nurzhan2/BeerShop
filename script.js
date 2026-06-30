// ============ ХМЕЛЬНАЯ МАНУФАКТУРА — общий скрипт ============

document.addEventListener('DOMContentLoaded', () => {

  /* header on scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* reveal on scroll */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
    // safety net: ensure nothing stays invisible if the observer misbehaves
    window.setTimeout(() => {
      revealEls.forEach(el => el.classList.add('in'));
    }, 2500);
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* catalog filter (index page + catalog page) */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const beerCards = document.querySelectorAll('.beer-card');
  if (filterBtns.length && beerCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        beerCards.forEach(card => {
          const match = filter === 'all' || card.dataset.type === filter;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* generic contact / partner form handling (no backend yet) */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const requiredOk = [...form.querySelectorAll('[required]')].every(f => f.value.trim().length > 0);
      if (!requiredOk) {
        if (status) {
          status.textContent = 'Заполните, пожалуйста, обязательные поля.';
          status.className = 'form-status err';
        }
        return;
      }
      if (status) {
        status.textContent = 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.';
        status.className = 'form-status ok';
      }
      form.reset();
    });
  });

});
